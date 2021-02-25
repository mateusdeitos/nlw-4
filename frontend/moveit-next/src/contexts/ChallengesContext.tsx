import { createContext, useCallback, useMemo, useState } from 'react';


interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    experienceToNextLevel: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider: React.FC = ({ children }) => {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = useMemo(() => {
        return Math.pow((level + 1) * 4, 2);
    }, [])

    const levelUp = useCallback(() => {
        setLevel(level => level + 1);
    }, [level])

    const startNewChallenge = useCallback(() => {
        console.log('new challenge')
    }, [])

    return (
    <ChallengesContext.Provider value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        experienceToNextLevel
    }}>
        {children}
    </ChallengesContext.Provider>)
}