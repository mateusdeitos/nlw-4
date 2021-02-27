import {  useMemo } from 'react';
import {  useCountdown } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export const Countdown = () => {
    const { time, hasFinished, isActive, resetCountDown, startCountDown } = useCountdown();
    
    const splittedMinutes = useMemo(() => {
        return String(Math.floor(time / 60)).padStart(2, '0').split('');
    }, [time])

    const splittedSeconds = useMemo(() => {
        return String(time % 60).padStart(2, '0').split('');
    }, [time])

    const [minuteLeft, minuteRight] = splittedMinutes;
    const [secondLeft, secondRight] = splittedSeconds;


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