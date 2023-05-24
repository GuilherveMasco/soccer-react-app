import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import BadRequest from '../../components/BadRequest';

interface Country {
    code: number;
    name: string;
}

interface League {
    league: {
        id: number;
        name: string;
    }
}

interface Team {
    team: {
        id: number;
        name: string;
    }
}

const SearchPage = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [leagues, setLeagues] = useState<League[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedLeague, setSelectedLeague] = useState<number | null>(null);

    const token = localStorage.getItem('token');

    if (!token) {
        return (
            <BadRequest />
        )
    }

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/countries', {
                    headers: {
                        'X-RapidAPI-Key': token,
                    }
                });
                const data = await response.json();
                setCountries(data.response);
            } catch (error) {
                console.error('Erro ao obter a lista de países:', error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchLeagues = async () => {
            if (selectedCountry) {
                try {
                    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues?country=${selectedCountry}`, {
                        headers: {
                            'X-RapidAPI-Key': token,
                        }
                    });
                    const data = await response.json();
                    setLeagues(data.response);
                } catch (error) {
                    console.error('Erro ao obter a lista de ligas:', error);
                }
            }
        };

        fetchLeagues();
    }, [selectedCountry]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const fetchTeams = async () => {
            if (selectedLeague) {
                try {
                    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?league=${selectedLeague}&season=${currentYear}`, {
                        headers: {
                            'X-RapidAPI-Key': token,
                        }
                    });
                    const data = await response.json();
                    setTeams(data.response);
                } catch (error) {
                    console.error('Erro ao obter a lista de times:', error);
                }
            }
        };

        fetchTeams();
    }, [selectedLeague]);

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountryName = event.target.value;
        setSelectedCountry(selectedCountryName);
        setSelectedLeague(null);
    };

    const handleLeagueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLeagueId = parseInt(event.target.value, 10);
        setSelectedLeague(selectedLeagueId);
    };

    return (
        <div>
          <h2>Seleção de País, Liga e Time</h2>
          <select value={selectedCountry || ''} onChange={handleCountryChange}>
            <option value="">Selecione um país</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
      
          {selectedCountry && (
            <select value={selectedLeague || ''} onChange={handleLeagueChange}>
              <option value="">Selecione uma liga</option>
              {leagues.map((league) => (
                <option key={league.league.id} value={league.league.id}>
                  {league.league.name}
                </option>
              ))}
            </select>
          )}
      
          {selectedLeague && (
            <select>
              <option value="">Selecione um time</option>
              {teams.map((team) => (
                <option key={team.team.id} value={team.team.id}>
                  {team.team.name}
                </option>
              ))}
            </select>
          )}
        </div>
    );
};

export default SearchPage