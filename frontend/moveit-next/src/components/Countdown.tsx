import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

export const Countdown = () => {
    const [initialTime] = useState(25);
    const [time, setTime] = useState(initialTime * 60);
    const [hasFinished, setHasFinished] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { startNewChallenge } = useContext(ChallengesContext);

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

    const splittedMinutes = useMemo(() => {
        return String(Math.floor(time / 60)).padStart(2, '0').split('');
    }, [time])

    const splittedSeconds = useMemo(() => {
        return String(time % 60).padStart(2, '0').split('');
    }, [time])

    const [minuteLeft, minuteRight] = splittedMinutes;
    const [secondLeft, secondRight] = splittedSeconds;

    const resetCountDown = useCallback(() => {
        setIsActive(false);
        setTime(initialTime * 60);
    }, [])

    const startCountDown = useCallback(() => {
        setIsActive(true)
    }, [isActive, initialTime, time])

    return (
        <div>

            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}>
                    Ciclo encerrado
                </button>) : (
                    <>
                        {isActive ? (
                            <button
                                type="button"
                                onClick={resetCountDown}
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                                Abandonar ciclo
                            </button>
                        ) : (
                                <button
                                    type="button"
                                    onClick={startCountDown}
                                    className={styles.countdownButton}>
                                    Iniciar um ciclo
                                </button>
                            )}
                    </>
                )}

        </div>
    )
}