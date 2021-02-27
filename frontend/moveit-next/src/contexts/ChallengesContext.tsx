import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    experienceToNextLevel: number;
}

export const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData);

export const ChallengesProvider: React.FC = ({ children }) => {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    const experienceToNextLevel = useMemo(() => {
        return Math.pow((level + 1) * 4, 2);
    }, [level])

    const levelUp = useCallback(() => {
        setLevel(level => level + 1);
    }, [level])

    const startNewChallenge = useCallback(() => {
        const randomChallengeIndex = Math.floor(Math.random() * (challenges.length - 1));
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);


        if (Notification.permission === 'granted') {
            new Notification('Novo desafio!', {
                body: `Valendo ${challenge.amount}xp`,
                silent: true,
            })
            new Audio('/notification.mp3').play();
        }
    }, [challenges])

    const resetChallenge = useCallback(() => {
        setActiveChallenge(null)
    }, [])
    const completeChallenge = useCallback(() => {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }, [activeChallenge, currentExperience, experienceToNextLevel, challengesCompleted])

    return (
        <ChallengesContext.Provider value={{
            level,
            levelUp,
            currentExperience,
            challengesCompleted,
            startNewChallenge,
            experienceToNextLevel,
            completeChallenge,
            activeChallenge,
            resetChallenge
        }}>
            {children}
        </ChallengesContext.Provider>)
}

export const useChallenges = () => {
    return useContext(ChallengesContext);
}