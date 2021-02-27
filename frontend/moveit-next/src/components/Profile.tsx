import {  useChallenges } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export const Profile = () => {
    const { level } = useChallenges();
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/mateusdeitos.png" alt="Mateus Deitos" />
            <div>
                <strong>Mateus Deitos</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}