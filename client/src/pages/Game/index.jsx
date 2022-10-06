import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import styles from "../../sass/game.module.scss";
import { GetLobbyInfo } from "./handler";

export default function Game({ socket }) {
    const { search } = useLocation();
    const roomId = new URLSearchParams(search).get("room");
    const [players, setPlayers] = useState([]);
    // const [_id, setId] = useState(sessionStorage.getItem("_id"));
    const [turn, setTurn] = useState(sessionStorage.getItem("turn"));

    useEffect(() => {
        GetLobbyInfo(roomId)
            .then(res => {
                console.log(res.data);
                setPlayers(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [socket, roomId])

    return (
        <Layout>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>New Game</h1>
                <span className={styles.roomId}>Room ID: {roomId}</span>
                <div className={styles.row}>
                    <div className={`${styles.userBox} ${turn === players[0]?.playerId ? styles.userHighlighted : null}`}>
                        <h3 className={styles.playerName}>{players[0]?.name}</h3>
                        <h3 className={styles.playerScore}>Score: {players[0]?.score}</h3>
                    </div>
                </div>
                <div className={`${styles.row} ${styles.rowEven}`}>
                    <div className={`${styles.userBox} ${turn === players[1]?.playerId ? styles.userHighlighted : null}`}>
                        <h3 className={styles.playerName}>{players[1]?.name}</h3>
                        <h3 className={styles.playerScore}>Score: {players[1]?.score}</h3>
                    </div>
                    <div className={styles.hero}>
                        <span className={styles.truthOrLie}>Truth or Lie?</span>
                        <h4 className={styles.question}>I have never consumed alcohol.</h4>
                        <div className={styles.buttonWrapper}>
                            <button className={styles.truthButton}>TRUTH</button>
                            <button className={styles.lieButton}>LIE</button>
                        </div>
                    </div>
                    <div className={`${styles.userBox} ${turn === players[2]?.playerId ? styles.userHighlighted : null}`}>
                        <h3 className={styles.playerName}>{players[2]?.name}</h3>
                        <h3 className={styles.playerScore}>Score: {players[2]?.score}</h3>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={`${styles.userBox} ${turn === players[3]?.playerId ? styles.userHighlighted : null}`}>
                        <h3 className={styles.playerName}>{players[3]?.name}</h3>
                        <h3 className={styles.playerScore}>Score: {players[3]?.score}</h3>
                    </div>
                </div>
            </div>
        </Layout>
    )
}