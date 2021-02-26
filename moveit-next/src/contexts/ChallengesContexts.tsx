import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

type Challenge = {
    type: string;
    description: string;
    amount: number;
}

type ChallengesContextsData = {
    level: number;
    currentExperience:number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

type ChallengesProviderProps = {
    children?: ReactNode;
}

export const ChallengesContexts = createContext({} as ChallengesContextsData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallegengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted') {
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallegengesCompleted(challengesCompleted + 1);
    }

    return(
        <ChallengesContexts.Provider 
        value={{ 
            level, 
            currentExperience, 
            challengesCompleted,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge
        }}
        >
            { children }
        </ChallengesContexts.Provider>
    );
}