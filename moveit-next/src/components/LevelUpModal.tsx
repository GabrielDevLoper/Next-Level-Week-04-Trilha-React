import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/LevelUpModal.module.css';


export default function LevelUpModal() {
    const { level, closeModal } = useContext(ChallengesContexts);

    return (
        <div className={styles.overlay}>
            <div className={styles.levelUpModalContainer}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>
                <button type="button" onClick={closeModal}>
                    <img src="/icons/close.svg" alt="fechar"/>
                </button>
            </div>
        </div>
    );
}