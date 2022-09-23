import Layout from "../../components/Layout";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../../utils/endpoints";
import { requestHeaderConfig } from "../../utils/requestHeader";
import { useState } from "react";

export default function Search({socket }) {

    const [roomId, setRoomId] = useState(null);

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

    return (
        <Layout center={true}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h1 style={{ color: "#fff" }}>Share your room ID: <span style={{color: "#0077AA"}}>{roomId!==null && roomId}</span></h1>
                <h1 style={{color: "#E04343"}}>OR</h1>
                <h1 style={{color: "#fff"}}>Join a Room</h1>
                <CircularProgress size="large" style={{ margin: '20px auto' }} />
            </div>
        </Layout>
    )
}   