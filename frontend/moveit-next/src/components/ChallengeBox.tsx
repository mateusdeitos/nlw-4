import {  useState } from 'react';
import styles from '../styles/components/ChallengeBox.module.css';

export const ChallengeBox = () => {
    const [hasActiveChallenge, setHasActiveChallenge] = useState(false);
    return (
        <div className={styles.challengeBoxContainer}>
            {hasActiveChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe 400xp</header>
                    <main>
                        <img src="icons/body.svg" alt=""/>
                        <strong>Novo desafio</strong>
                        <p>Levante e faça uma caminhada de 3 minutos.</p>
                    </main>
                    <footer>
                        <button 
                            type="button"
                            className={styles.challengeFailedButton}
                            >
                            Falhei
                        </button>
                        <button 
                            type="button"
                            className={styles.challengeSucceededButton}
                            >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                            Avance de level fazendo desafios.
                        </p>
                    </div>
                )}
        </div>
    )
}