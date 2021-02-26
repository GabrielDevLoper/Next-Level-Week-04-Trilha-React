import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {
    const { level } = useContext(ChallengesContexts);
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/gabrieldevloper.png" alt="gabriel"/>
            <div>
                <strong>Gabriel Barreto</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}