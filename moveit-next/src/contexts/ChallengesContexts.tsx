import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import LevelUpModal from '../components/LevelUpModal';

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
    closeModal: () => void;
}

type ChallengesProviderProps = {
    children?: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContexts = createContext({} as ChallengesContextsData);

export function ChallengesProvider({ children, ...rest  }: ChallengesProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallegengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', level.toString());
        Cookies.set('currentExperience', currentExperience.toString());
        Cookies.set('challengesCompleted', challengesCompleted.toString());
        
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
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

    function closeModal() {
        setIsLevelUpModalOpen(false);
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
            completeChallenge,
            closeModal
            
        }}
        >
            { children }
            {
                isLevelUpModalOpen && (  <LevelUpModal />) 
            }
          
        </ChallengesContexts.Provider>
    );
}