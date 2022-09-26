import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { GetLobbyInfo } from "./handler";

export default function Lobby() {

    const { search } = useLocation();
    const roomId = new URLSearchParams(search).get("room");
    const {isLoading, data} = useQuery('fetch-lobby-info', () => GetLobbyInfo(roomId), {
        refetchInterval: 1000,
        refetchIntervalInBackground: true,
    })
    console.log(data);

    return (
        <Layout center={true} >
            <h1>Lobby ID: {roomId}</h1>
            <h1>Players in the lobby: </h1>
            {!isLoading && data?.data?.length > 0 && data?.data?.map(player => {
                return <h1>{player.name}</h1>
            })}
        </Layout>
    )
}