import { useEffect } from "react";
import { useState } from "react";
import styles from "../sass/global.module.scss";
export default function Timer() {
    const [seconds, setSeconds] = useState(10);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds !== 0) setSeconds(seconds - 1);
        }, 1000);
        return () => {
            clearInterval(myInterval);
        }
    }, [seconds])

    return (
        <div className={styles.timer}>
            <h3>{seconds}</h3>
        </div>
    )
}