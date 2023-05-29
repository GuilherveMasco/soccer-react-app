import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

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

interface Goals {
    goals: {
        t0_15: number;
        t16_30: number;
        t31_45: number;
        t46_60: number;
        t61_75: number;
        t76_90: number;
        t91_105: number;
        t106_120: number;
    }
}

const teamDetails = () => {
    const [teamId, setTeamId] = useState<number | null>(null);
    const [leagueId, setleagueId] = useState<number | null>(null);
    const [token, setToken] = useState('');
    const currentYear = new Date().getFullYear();
    const [dataPlayers, setDataPlayers] = useState<PlayerData[]>([]);
    const [teamName, setTeamName] = useState('');
    const [mainLineup, setMainLineup] = useState('Sem informações');

    const [played, setPlayed] = useState(0);
    const [wins, setWins] = useState(0);
    const [draws, setDraws] = useState(0);
    const [loses, setLoses] = useState(0);

    const [goals, setGoals] = useState<Goals | null>(null);

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

            setTeamName(data.response.team.name);
            setMainLineup(data.response.lineups[0].formation);

            setPlayed(data.response.fixtures.played.total);
            setWins(data.response.fixtures.wins.total);
            setDraws(data.response.fixtures.draws.total);
            setLoses(data.response.fixtures.loses.total);

            const goalsData = data.response.goals.for.minute;

            const goals: Goals = {
                goals: {
                    t0_15: goalsData['0-15'].total || 0,
                    t16_30: goalsData['16-30'].total || 0,
                    t31_45: goalsData['31-45'].total || 0,
                    t46_60: goalsData['46-60'].total || 0,
                    t61_75: goalsData['61-75'].total || 0,
                    t76_90: goalsData['76-90'].total || 0,
                    t91_105: goalsData['91-105'].total || 0,
                    t106_120: goalsData['106-120'].total || 0,
                }
            };

            setGoals(goals);
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

    const data = {
        labels: ['0-15', '16-30', '31-45', '46-60', '61-75', '76-90', '91-105', '106-120'],
        datasets: [
            {
                label: 'Gols',
                data: [
                    goals?.goals.t0_15,
                    goals?.goals.t16_30,
                    goals?.goals.t31_45,
                    goals?.goals.t46_60,
                    goals?.goals.t61_75,
                    goals?.goals.t76_90,
                    goals?.goals.t91_105,
                    goals?.goals.t106_120,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(0, 0, 0)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const goalsChart = (
        <Bar data={data} options={options} />
    );

    return (
        <div className="items-center justify-center h-screen team-details font-color global-background">
            <div className='flex flex-col w-1/10 noise-background shadow-md rounded p-8'>
                <h1 className='text-2xl font-bold flex items-center justify-center font-color'>Informações sobre {teamName}</h1>
            </div>
            <div>
                <h2 className='font-bold flex items-center justify-center font-color mt-5 flex-col w-1/10 noise-background shadow-md rounded p-8'>Jogadores</h2>
                <ul className="player-list font-color">
                    {dataPlayers.map((player) => (
                        <li key={player.player.id} className='player-item font-color'>
                            <div className="player-info font-color">
                                <img className="player-photo" src={player.player.photo} alt={player.player.name} />
                                <div className="player-details font-color">
                                <h3 className='font-bold font-color'>{player.player.name}</h3>
                                <p>Idade: {player.player.age}</p>
                                <p>Nacionalidade: {player.player.nationality}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <h2 className='font-bold flex items-center justify-center global-background font-color mt-5 flex-col w-1/10 noise-background shadow-md rounded p-8'>Formação favorita</h2>
                <p className='flex items-center justify-center global-background font-color mb-5'>{mainLineup}</p>

                <h2 className='font-bold flex items-center justify-center global-background font-color flex-col w-1/10 noise-background shadow-md rounded p-8'>Estatísticas de jogos</h2>
                <table className="game-stats global-background font-color">
                    <thead>
                        <tr>
                        <th>Jogos</th>
                        <th>Vitórias</th>
                        <th>Empates</th>
                        <th>Derrotas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{played}</td>
                        <td>{wins}</td>
                        <td>{draws}</td>
                        <td>{loses}</td>
                        </tr>
                    </tbody>
                </table>

                <h2 className='font-bold flex items-center justify-center global-background font-color mt-5 flex-col w-1/10 noise-background shadow-md rounded p-8'>Gols por tempo de jogo</h2>
                <div className='flex items-center justify-center global-background font-color mb-5'>
                    {goalsChart}
                </div>
            </div>
        </div>
    );
};

export default teamDetails;