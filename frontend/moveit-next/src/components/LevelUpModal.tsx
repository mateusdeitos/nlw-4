import { useChallenges } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export const LevelUpModal = () => {
    const { level, closeModal } = useChallenges();
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button type="button" onClick={closeModal}>
                    <img src="icons/close.svg" alt="Fechar modal" />
                </button>
            </div>
        </div>
    )
}