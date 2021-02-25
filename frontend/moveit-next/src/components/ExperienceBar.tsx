import { useContext, useMemo } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';
export const ExperienceBar = () => {
    const { experienceToNextLevel, currentExperience } = useContext(ChallengesContext);
    const percentToNextLevel = useMemo(() => {
        return Math.round(currentExperience / experienceToNextLevel * 100);
    }, [])
    return (
        <header className={styles.experienceBar}>
            <span>0xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }}></div>
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentExperience}xp</span>
            </div>
            <span>{experienceToNextLevel}xp</span>
        </header>
    )
}