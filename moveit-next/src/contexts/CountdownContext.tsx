import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContexts } from './ChallengesContexts';

type CountdownContextData = {
    isActive: boolean;
    hasFinished: boolean;
    minutos: number;
    segundos: number;
    startCountdown: () => void;
    resetCountdown: () => void;

}

export const CountdownContext  = createContext({} as CountdownContextData);

type CountdownProviderProps = {
    children?: ReactNode;
}

let countdownButtonTimeOut: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContexts);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        setIsActive(false);
        clearTimeout(countdownButtonTimeOut);
        setTime(0.1 * 60);
        setHasFinished(false);
    }


    useEffect(() => {
        if(isActive && time > 0) {
            countdownButtonTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }else if(isActive && time === 0) {
            console.log("Finalizou");
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    },[isActive, time]);


    const minutos = Math.floor(time / 60);
    const segundos = time % 60;

    return(
        <CountdownContext.Provider value={{
            isActive, 
            hasFinished, 
            minutos, 
            segundos, 
            startCountdown, 
            resetCountdown
        }}
            >

            { children }
        </CountdownContext.Provider>
    );
}