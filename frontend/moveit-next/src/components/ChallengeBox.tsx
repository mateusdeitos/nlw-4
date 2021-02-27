import {  useChallenges } from '../contexts/ChallengesContext';
import {  useCountdown } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export const ChallengeBox = () => {
    const { completeChallenge, activeChallenge, resetChallenge } = useChallenges();
    const { resetCountDown } = useCountdown();

    const handleChallengeSucceeded = () => {
        completeChallenge();
        resetCountDown();
    }
    const handleChallengeFailed = () => {
        resetChallenge();
        resetCountDown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="" />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                            onClick={handleChallengeSucceeded}
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