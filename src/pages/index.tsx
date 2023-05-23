import type { NextPage } from 'next'
import Image from 'next/image';
import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';

const Home: NextPage = () => {  
    
    return (
        <div className="global-background w-screen h-screen">
            
            <Flex  justifyContent='center'>
                <div className="mb-8">
                    <VStack spacing='2rem'>

                        <div className="flex flex-col items-center justify-center h-screen">
                            <div>
                                <Image
                                src="https://raw.githubusercontent.com/GuilherveMasco/soccer-react-app/development/src/components/Images/soccer-app-logo.png"
                                width= {200}
                                height= {200}
                                alt="Soccer App Logo"
                                />
                            </div>
                            
                            <form className="flex flex-col w-1/10 bg-[#d3f5ff] shadow-md rounded p-8" id="login"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const tokenInput = document.getElementById('token-input') as HTMLInputElement;
                                    const token = tokenInput.value;
                                    localStorage.setItem('token', token);
                                    window.location.href = '/dashboard';
                                }
                            }
                            >
                                <h1 className="text-2xl font-bold mb-5 flex items-center justify-center">Entre para continuar</h1>
                                <input
                                placeholder="Token da API"
                                id="token-input"
                                className="mb-4 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 required"
                                />

                                <a
                                href="https://www.api-football.com/documentation-v3"
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 hover:text-blue-600 hover:underline mb-6 flex items-center justify-center"
                                >
                                    Não tem um token? Clique aqui
                                </a>

                                <button
                                type="submit"
                                form="login"
                                className="bg-[#31c48d] hover:bg-[#28a074] text-white font-bold py-2 px-4 rounded"
                                >
                                    Login
                                </button>
                            </form>
                        </div>

                    </VStack>
                </div>
            </Flex>     
        </div>
    );
}

export default Home