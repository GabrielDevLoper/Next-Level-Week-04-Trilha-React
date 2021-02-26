import { useState, useEffect, useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import { CountdownContext } from '../contexts/CountdownContext';


export default function Countdown() {
    const { 
        minutos, 
        segundos, 
        hasFinished, 
        isActive, 
        resetCountdown, 
        startCountdown 
    } = useContext(CountdownContext);

    const [minutoEsquerda, minutoDireita] = String(minutos).padStart(2, '0').split('');
    const [segundoEsquerda, segundoDireita] = String(segundos).padStart(2, '0').split('');

    return(
        <>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minutoEsquerda}</span>
                    <span>{minutoDireita}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{segundoEsquerda}</span>
                    <span>{segundoDireita}</span>
                </div>
            </div>

            { hasFinished ? (
               <button
               disabled
               className={styles.countdownButton}
               >
                   Ciclo encerrado
               </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                        type="button" 
                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                        onClick={resetCountdown}
                        >
                            Abandonar ciclo
                        </button>
                    ): (
                        <button 
                        type="button" 
                        className={styles.countdownButton}
                        onClick={startCountdown}
                        >
                            Iniciar um ciclo
                    </button>
                    )}
                </>
            )}

        </>
    );
}