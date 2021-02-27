import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useChallenges } from "./ChallengesContext";

interface CountdownContextData {
    time: number;
    isActive: boolean;
    hasFinished: boolean;
    startCountDown: () => void,
    resetCountDown: () => void,
}



export const CountdownContext = createContext<CountdownContextData>({} as CountdownContextData);

export const CountdownProvider: React.FC = ({ children }) => {
    const [initialTime] = useState(.05);
    const [time, setTime] = useState(initialTime * 60);
    const [hasFinished, setHasFinished] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { startNewChallenge, activeChallenge  } = useChallenges();
    
    useEffect(() => {
        let myTimeOut: NodeJS.Timeout;
        if (isActive && time > 0) {
            myTimeOut = (
                setTimeout(() => {
                    setTime(time - 1);
                }, 1000)
            );
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }

        return () => clearTimeout(myTimeOut);
    }, [isActive, time, startNewChallenge])

    const resetCountDown = useCallback(() => {
        setIsActive(false);
        setTime(initialTime * 60);
        setHasFinished(false);
    }, [initialTime])

    const startCountDown = useCallback(() => {
        setIsActive(true)
    }, [])

    return (
        <CountdownContext.Provider value={{
            time,
            isActive,
            startCountDown,
            resetCountDown,
            hasFinished
        }}>
            {children}
        </CountdownContext.Provider>
    )
}


export const useCountdown = () => {
    return useContext(CountdownContext);
}