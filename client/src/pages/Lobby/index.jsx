import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { GetLobbyInfo } from "./handler";

export default function Lobby({ socket }) {

    const { search } = useLocation();
    const roomId = new URLSearchParams(search).get("room");
    const { isLoading, data, isFetching } = useQuery('fetch-lobby-info', () => GetLobbyInfo(roomId), {
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
    })  

    return (
        <Layout center={true} >
            <h1>Lobby ID: {roomId}</h1>
            <h1>Players in the lobby: </h1>
            {!isLoading && data?.data?.length > 0 && data?.data?.map((player, key) => {
                return <h1>Player {key + 1}: {player.name}</h1>
            })}
            {(isLoading || isFetching) && <CircularProgress size="large" style={{ margin: '20px auto' }} />}
        </Layout>
    )
}