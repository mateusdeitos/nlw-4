import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

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
    closeModal: () => void;
    experienceToNextLevel: number;
}

interface HomeProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData);

export const ChallengesProvider: React.FC<HomeProps> = ({ children, ...rest }) => {
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [level, setLevel] = useState(rest.level || 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted || 0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    useEffect(() => {
        try {
            Notification.requestPermission();            
        } catch (error) {            
        }
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])

    const experienceToNextLevel = useMemo(() => {
        return Math.pow((level + 1) * 4, 2);
    }, [level])

    const levelUp = useCallback(() => {
        setLevel(level => level + 1);
        setIsLevelUpModalOpen(true);
    }, [level])

    const closeModal = useCallback(() => {
        setIsLevelUpModalOpen(false);
    }, [])

    const startNewChallenge = useCallback(() => {
        const randomChallengeIndex = Math.floor(Math.random() * (challenges.length - 1));
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);


        try {
            if (Notification.permission === 'granted') {
                new Notification('Novo desafio!', {
                    body: `Valendo ${challenge.amount}xp`,
                    silent: true,
                })
                new Audio('/notification.mp3').play();
            }            
        } catch (error) {
            
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
            resetChallenge,
            closeModal
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>)
}

export const useChallenges = () => {
    return useContext(ChallengesContext);
}