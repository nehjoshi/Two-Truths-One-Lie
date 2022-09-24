import Layout from "../../components/Layout";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../../utils/endpoints";
import { requestHeaderConfig } from "../../utils/requestHeader";
import { useState } from "react";
import styles from "../../sass/findGame.module.scss";
import { useNavigate } from "react-router-dom";

export default function Search({ socket }) {

    const [roomId, setRoomId] = useState(null);
    const [destinationId, setDestinationId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(socket.id)
        axios.post(ENDPOINTS.NEW_GAME, {
            name: "New Game",
            socketId: socket.id
        }, requestHeaderConfig(sessionStorage.getItem("token")))
            .then(res => {
                setRoomId(res.data.roomId)
            })
            .catch(err => {
                console.log(err)
            })
    }, [socket.id])

    const handleRoomEnter = () => {
        socket.emit("join-room", destinationId, sessionStorage.getItem("_id"));
        navigate(`/lobby?room=${destinationId}`);
    }

    return (
        <Layout center={true}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <h1 style={{ color: "#fff" }}>Share your room ID: <span style={{ color: "#0077AA" }}>{roomId !== null ? roomId : "Loading..."}</span></h1>
                </div>
                <div className={styles.center}>
                    <h1>OR</h1>
                </div>
                <div className={styles.right}>
                    <h1 style={{ color: "#fff" }}>Join a Room</h1><br />
                    <TextField className={styles.input} onChange={e => setDestinationId(e.target.value)} variant="standard" type="text" size="large" placeholder="Room ID here" /><br />
                    <Button variant="contained" onClick={handleRoomEnter}>Start</Button>
                </div>
                <CircularProgress size="large" style={{ margin: '20px auto' }} />
            </div>
        </Layout>
    )
}   