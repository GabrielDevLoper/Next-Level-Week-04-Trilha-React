import styles from '../styles/components/ChallengeBox.module.css';
import { ChallengesContexts} from '../contexts/ChallengesContexts';
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

export default function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContexts);
    const { resetCountdown} = useContext(CountdownContext);

    function handleChallengeSucceeded() {
        resetCountdown();
        completeChallenge();
    }

    function handleChallengeFailed() {
        resetChallenge();
    }

    return(
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
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
                        className={styles.challengeSucceedButton}
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
                        <img src="icons/level-up.svg" alt=""/>
                        Avance de level completando desafios
                    </p>
                </div>
            ) }
        </div>
    );
}