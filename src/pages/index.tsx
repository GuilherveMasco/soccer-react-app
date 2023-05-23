import type { NextPage } from 'next'
import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';

const Home: NextPage = () => {  
    
    return (
        <div className="global-background w-screen h-screen">
            
            <Flex  justifyContent='center'>
                <div className="mb-8">
                    <VStack spacing='2rem'>
                        <div>
                            <img src="C:\Users\moham\Documents\GitHub\soccer-react-app\src\components\Images\soccer-app-logo.png" alt="Soccer App Logo" />
                        </div>

                        <div className="flex flex-col items-center justify-center h-screen">
                            <form className="flex flex-col w-1/10 bg-[#d3f5ff] shadow-md rounded p-8">
                                <h1 className="text-2xl font-bold mb-5 flex items-center justify-center">Login na API</h1>
                                <input
                                placeholder="Token da API"
                                className="mb-4 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />

                                <button
                                type="submit"
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