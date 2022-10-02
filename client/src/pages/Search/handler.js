import axios from "axios";
import { ENDPOINTS } from "../../utils/endpoints";
import { requestHeaderConfig } from "../../utils/requestHeader";

export const GetLobbyInfo = async (roomId) => {
    return await axios.get(ENDPOINTS.GET_LOBBY_INFO + `/${roomId}`, 
    requestHeaderConfig(sessionStorage.getItem('token')
    ));
}
export const NewGame = async (socketId) => {
    return await axios.post(
        ENDPOINTS.NEW_GAME, {
            name: "New Game",
            socketId: socketId
        }, requestHeaderConfig(sessionStorage.getItem('token'))
    )
}