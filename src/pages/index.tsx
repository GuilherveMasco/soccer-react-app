import type { NextPage } from 'next'
import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';

const Home: NextPage = () => {  
    
    return (
        <div className="bg-BgColor w-screen h-screen">
            
            <Flex  justifyContent='center' >
                <div>
                    <VStack spacing='2rem'>
                        <div>
                            <h2 className="text-4xl	font-bold text-left">Soccer App</h2>
                        </div>

                        <div className="bg-[#e4ffe6] w-1990 h-712 rounded-3xl flex flex-row">
                            <p className="text-2xl p-5">
                                Tela de login do site. 
                            </p>                            
                        </div>                        
                    </VStack>
                </div>
            </Flex>     
        </div>
    );
}
export default Home