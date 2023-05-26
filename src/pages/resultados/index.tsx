import React, { useState, useEffect } from 'react';

interface Team {
    team: {
        name: string;
        logo: string;
    };
}

interface PlayerData {
    player: {
        id: number;
        name: string;
        age: number;
        nationality: string;
        photo: string;
    };
}

interface Lineups {
    lineups: {
        formation: string;
        played: number;
    };
}

const teamDetails = () => {
    const [teamId, setTeamId] = useState<number | null>(null);
    const [leagueId, setleagueId] = useState<number | null>(null);
    const [token, setToken] = useState('');
    const currentYear = new Date().getFullYear();
    const [dataTeam, setDataTeam] = useState<Team[]>([]);
    const [dataPlayers, setDataPlayers] = useState<PlayerData[]>([]);
    const [dataLineups, setDataLineups] = useState<Lineups[]>([]);
    const [teamName, setTeamName] = useState('');
    const [mainLineup, setMainLineup] = useState('Sem informações');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const teamId = searchParams.get('teamId');
        const leagueId = searchParams.get('leagueId');

        if (teamId && leagueId) {
            setTeamId(Number(teamId));
            setleagueId(Number(leagueId));
        } else {
            window.location.href = '/';
        }
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token') || '';
        if (storedToken) {
            setToken(storedToken);
        } else {
            window.location.href = '/';
        }
    }, []);

    const fetchTeamDetails = async () => {
        try {
            const response = await fetch(
                `https://v3.football.api-sports.io/teams/statistics?team=${teamId}&season=${currentYear}&league=${leagueId}`, {
                headers: {
                    'X-RapidAPI-Key': token,
                }
            });
            const data = await response.json();
            setDataTeam(data.response.team);
            setDataLineups(data.response.lineups);

            setTeamName(data.response.team.name);
            setMainLineup(data.response.lineups[0].formation);
        } catch (error) {
            console.error('Erro ao obter os detalhes do time:', error);
        }
    };
    
    const fetchTeamPlayers = async () => {
        try {
            const response = await fetch(`https://v3.football.api-sports.io/players?team=${teamId}&season=${currentYear}`, {
                headers: {
                    'X-RapidAPI-Key': token,
                }
            });
            const data = await response.json();
            setDataPlayers(data.response);
        } catch (error) {
            console.error('Erro ao obter os jogadores do time:', error);
        }
    };
    
    useEffect(() => {
        if (token && teamId) {
            fetchTeamDetails();
            fetchTeamPlayers();
        }
    }, [token, teamId]);

    return (
        <div>
            <div>
                <h2>Informações sobre {teamName}</h2>
            </div>
            <div>
                <h2>Jogadores</h2>
                <ul>
                    {dataPlayers.map((player) => (
                        <li key={player.player.id}>
                            <div>
                                <img src={player.player.photo} alt={player.player.name} />

                                <div>
                                    <h3>{player.player.name}</h3>
                                    <p>Idade: {player.player.age}</p>
                                    <p>Nacionalidade: {player.player.nationality}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <h2>Formação favorita</h2>
                <p>{mainLineup}</p>
            </div>
        </div>
    );
};

export default teamDetails;