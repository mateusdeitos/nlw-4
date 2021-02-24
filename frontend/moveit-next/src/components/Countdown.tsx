import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

export const Countdown = () => {
    const [initialTime] = useState(25);
    const [time, setTime] = useState(initialTime * 60);
    const [active, setActive] = useState(false);
    const [buttonText, setButtonText] = useState('Iniciar um ciclo');

    useEffect(() => {
        let myTimeOut: NodeJS.Timeout;
        if (active && time > 0) {
            myTimeOut = (
                setTimeout(() => {
                    setTime(time - 1);
                }, 1000)
            );
        }

        if (time === 0) {
            setButtonText('Reiniciar Timer');
        }

        return () => clearTimeout(myTimeOut);
    }, [active, time])

    const splittedMinutes = useMemo(() => {
        return String(Math.floor(time / 60)).padStart(2, '0').split('');
    }, [time])

    const splittedSeconds = useMemo(() => {
        return String(time % 60).padStart(2, '0').split('');
    }, [time])

    const [minuteLeft, minuteRight] = splittedMinutes;
    const [secondLeft, secondRight] = splittedSeconds;

    const toggleCountDown = useCallback(() => {
        if (time > 0) {
            if (!active) {
                setButtonText('Pausar ciclo');
            } else if (time < initialTime * 60) {
                setButtonText('Resumir ciclo');
            } else {
                setButtonText('Iniciar um ciclo');
            }
            setActive(prev => !prev);
        } else {
            setTime(initialTime * 60);
            setActive(false);
            setButtonText('Iniciar um ciclo');
        }
    }, [active, initialTime, time])

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
            <button
                type="button"
                onClick={toggleCountDown}
                className={styles.countdownButton}>
                {buttonText}
            </button>
        </div>
    )
}