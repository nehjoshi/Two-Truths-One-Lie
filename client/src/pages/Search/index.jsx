import Layout from "../../components/Layout";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../../sass/findGame.module.scss";
import { useNavigate } from "react-router-dom";
import { GetLobbyInfo, NewGame } from "./handler";
import { useQuery } from "react-query";

export default function Search({ socket }) {

    const [roomId, setRoomId] = useState(null);
    const [destinationId, setDestinationId] = useState(null);
    const navigate = useNavigate();
    const { data, isLoading } = useQuery('fetch-lobby-info', () => GetLobbyInfo(roomId), {
        refetchInterval: 1000,
        refetchIntervalInBackground: true,
    });

    useEffect(() => {
        console.log(socket.id);
        NewGame(socket.id)
            .then(res => {
                setRoomId(res.data.roomId);
            })
            .catch(err => {
                console.log(err);
            })
    }, [socket.id, navigate, socket])

    const handleRoomEnter = () => {
        socket.emit("join-room", destinationId, sessionStorage.getItem("_id"));
        navigate(`/lobby?room=${destinationId}`);
    }

    const handleGameStart = () => {
        socket.emit('host-game-start', roomId);
        navigate(`/game?room=${roomId}`);
    }

    return (
        <Layout center={true}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <h1 style={{ color: "#fff" }}>Share your room ID: <span style={{ color: "#0077AA" }}>{roomId !== null ? roomId : "Loading..."}</span></h1>
                    <h2>Players in your lobby: {!isLoading && data?.data?.length}</h2>
                    <span className={styles.waiting}>Waiting for {4 - data?.data?.length} more player(s)...</span>
                    <div className={styles.playerWrapper}>
                        {!isLoading && data?.data?.length > 0 && data?.data?.map((player, key) => {
                            return <h2>Player {key + 1}: {player.name}</h2>
                        })}</div>
                    {(data?.data?.length !== 4) && <CircularProgress color="info" />}
                    <Button onClick={handleGameStart} variant="contained" color="success" size="large">Start Game</Button>
                </div>
                <div className={styles.center}>
                    <h1>OR</h1>
                </div>
                <div className={styles.right}>
                    <div className={styles.rightBox}>
                        <h1>Join a Room</h1><br />
                        <TextField variant="filled" color="info" onChange={e => setDestinationId(e.target.value)} placeholder="Room ID here" /><br />
                        <Button variant="contained" onClick={handleRoomEnter}>Start</Button>
                    </div>
                </div>
                <CircularProgress size="large" style={{ margin: '20px auto' }} />
            </div>
        </Layout>
    )
}   