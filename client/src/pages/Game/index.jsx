import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";


export default function Game({ socket }) {
    const { search } = useLocation();
    const roomId = new URLSearchParams(search).get("room");
    return (
        <Layout>
            <h1>Welcome to the game with roomId: {roomId}</h1>
        </Layout>
    )
}