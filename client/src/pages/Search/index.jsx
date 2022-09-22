import Layout from "../../components/Layout";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../../utils/endpoints";
import { requestHeaderConfig } from "../../utils/requestHeader";

export default function Search({socket }) {

    useEffect(() => {
        console.log(socket.id)
        axios.post(ENDPOINTS.NEW_GAME, {
            name: "New Game",
            socketId: socket.id
        }, requestHeaderConfig)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [socket.id])

    return (
        <Layout center={true}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h1 style={{ color: "#fff" }}>Searching for games...</h1>
                <CircularProgress size="large" style={{ margin: '20px auto' }} />
            </div>
        </Layout>
    )
}   