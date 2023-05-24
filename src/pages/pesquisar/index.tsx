import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next'

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

const SearchPage: NextPage = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [leagues, setLeagues] = useState<League[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token') || '';
        if (storedToken) {
            setToken(storedToken);
        } else {
            window.location.href = '/';
        }
    }, []);
    
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

        if (token) {
            fetchCountries();
        }
    }, [token]);

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

        if (token) {
            fetchLeagues();
        }
    }, [selectedCountry, token]);

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

        if (token) {
            fetchTeams();
        }
    }, [selectedLeague, token]);

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountryName = event.target.value;
        setSelectedCountry(selectedCountryName);
        setSelectedLeague(null);
    };

    const handleLeagueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLeagueId = parseInt(event.target.value, 10);
        setSelectedLeague(selectedLeagueId);
    };

    const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTeamId = parseInt(event.target.value, 10);
        setSelectedTeam(selectedTeamId);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form className="flex flex-col w-1/10 noise-background shadow-md rounded p-8" id="search"
                onSubmit={async (e) => {
                    e.preventDefault();
                    // chamada de tela de resultados
                }
            }
            >
                <h1 className="text-2xl font-bold mb-5 flex items-center justify-center font-color">Dados do time</h1>

                <select value={selectedCountry || ''} onChange={handleCountryChange}
                className="mb-4 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 required"
                >
                    <option value="">Selecione um país</option>
                    {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                        {country.name}
                    </option>
                    ))}
                </select>
        
                {!selectedCountry ? (
                    <select disabled
                    className="mb-4 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 required"
                    >
                        <option value="">Selecione uma liga</option>
                    </select>
                ) : (
                    <select value={selectedLeague || ''} onChange={handleLeagueChange}
                    className="mb-4 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 required"
                    >
                    <option value="">Selecione uma liga</option>
                    {leagues.map((league) => (
                        <option key={league.league.id} value={league.league.id}>
                        {league.league.name}
                        </option>
                    ))}
                    </select>
                )}
        
                {!selectedLeague ? (
                    <select disabled
                    className="mb-4 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 required"
                    >
                        <option value="">Selecione um time</option>
                    </select>
                ) : (
                    <select value={selectedTeam || ''} onChange={handleTeamChange}
                    className="mb-4 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 required"
                    >
                    <option value="">Selecione um time</option>
                    {teams.map((team) => (
                        <option key={team.team.id} value={team.team.id}>
                        {team.team.name}
                        </option>
                    ))}
                    </select>
                )}

                <button
                type="submit"
                form="search"
                className="bg-[#31c48d] hover:bg-[#28a074] text-white font-bold py-2 px-4 rounded"
                >
                    Pesquisar
                </button>
            </form>
        </div>
    );
};

export default SearchPage;