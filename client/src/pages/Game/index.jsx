import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import styles from "../../sass/game.module.scss";
import { GetLobbyInfo, GetTruthsAndLies } from "./handler";

export default function Game({ socket }) {
    const { search } = useLocation();
    const roomId = new URLSearchParams(search).get("room");
    const [players, setPlayers] = useState([]);
    // const [_id, setId] = useState(sessionStorage.getItem("_id"));
    const [turn, setTurn] = useState(sessionStorage.getItem("turn"));
    const [turnCount, setTurnCount] = useState(0);
    const [selection, setSelection] = useState(false);
    const [userTruths, setUserTruths] = useState([]);
    const [userLies, setUserLies] = useState([]);
    const [challenge, setChallenge] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        setSelection(false);
        socket.on('next-turn', async (turn) => {
            setTurn(turn);
            setTurnCount(turnCount + 1);
        })
        socket.on('challenge-submitted', (challenge, type) => {
            setChallenge(challenge);
            setType(type);
        })
        GetLobbyInfo(roomId)
            .then(res => {
                setPlayers(res.data);
            })
        GetTruthsAndLies()
            .then(res => {
                setUserTruths(res.data.truths);
                setUserLies(res.data.lies);
            })
        if (turn === sessionStorage.getItem("_id")) {
            setSelection(true);
        }
    }, [socket, roomId, turnCount, turn])

    const NextTurn = () => {
        setChallenge("");
        setType("");
        socket.emit('next-turn-request', roomId, turnCount + 1);
    }
    const SubmitChallenge = (challenge, type) => {
        socket.emit('challenge-submission', roomId, challenge, type);
        setSelection(false);
    }

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
                        <span className={styles.playerQuote}>{players[turnCount]?.name} says...</span>
                        <h4 className={styles.question}>{challenge}</h4>
                        <div className={styles.buttonWrapper}>
                            {turn!== sessionStorage.getItem("_id") &&
                                <>
                                    <button onClick={NextTurn} className={styles.truthButton}>TRUTH</button>
                                    <button className={styles.lieButton}>LIE</button>
                                </>
                            }
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
            {selection && <div className={styles.selectionWrapper}>
                <div className={styles.selectionBox}>
                    <h3>Choose a truth or a lie</h3>
                    <hr />
                    <h4>Your Truths</h4>
                    {userTruths.map((truth, index) => {
                        return (
                            <span onClick={() => SubmitChallenge(truth, "t")} className={styles.truthWrapper} key={index}>{truth}</span>
                        )
                    })}
                    <br />
                    <h4>Your Lies</h4>
                    {userLies.map((lie, index) => {
                        return (
                            <span onClick={() => SubmitChallenge(lie, "l")} className={styles.lieWrapper} key={index}>{lie}</span>
                        )
                    })}
                </div>
            </div>
            }
        </Layout>
    )
}