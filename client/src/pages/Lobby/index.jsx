import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { GetLobbyInfo } from "./handler";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Lobby({ socket }) {

    const { search } = useLocation();
    const roomId = new URLSearchParams(search).get("room");
    const { isLoading, data } = useQuery('fetch-lobby-info', () => GetLobbyInfo(roomId), {
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
    });
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('game-start', async (roomId) => {
            console.log("Host Game Start")
            navigate(`/game?room=${roomId}`);
        })
    }, [socket, navigate])

    return (
        <Layout center={true} >
            <h1>Lobby ID: {roomId}</h1>
            <h1>Players in the lobby: </h1>
            {!isLoading && data?.data?.length > 0 && data?.data?.map((player, key) => {
                return <h1>Player {key + 1}: {player.name}</h1>
            })}
            {(data?.data?.length !==4) && <CircularProgress style={{ margin: '20px auto' }} />}
        </Layout>
    )
}