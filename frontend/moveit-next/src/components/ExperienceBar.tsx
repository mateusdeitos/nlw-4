import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';
export const ExperienceBar = () => {
    const { experienceToNextLevel, currentExperience } = useContext(ChallengesContext);
    const [currentPercentage, setCurrentPercentage] = useState(0);
    const [restOfPercentage, setRestOfPercentage] = useState(0);

    useEffect(() => {
        const newPercentage = Math.round(currentExperience / experienceToNextLevel * 100);
        if (restOfPercentage > 0) {
            setTimeout(() => {
                setCurrentPercentage(restOfPercentage);
                setRestOfPercentage(0);
            }, 1000);
        } else if (currentPercentage > newPercentage) {
            setCurrentPercentage(100);
            setRestOfPercentage(newPercentage);
        } else {
            setCurrentPercentage(newPercentage);
        }
    }, [currentExperience, experienceToNextLevel, restOfPercentage, currentPercentage])

    return (
        <header className={styles.experienceBar}>
            <span>0xp</span>
            <div>
                <div style={{ width: `${currentPercentage}%` }}></div>
                <span className={styles.currentExperience} style={{ left: `${currentPercentage}%` }}>{currentExperience}xp</span>
            </div>
            <span>{experienceToNextLevel}xp</span>
        </header>
    )
}