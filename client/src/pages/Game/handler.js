import axios from "axios";
import { ENDPOINTS } from "../../utils/endpoints";
import { requestHeaderConfig } from "../../utils/requestHeader";

export const GetLobbyInfo = async (roomId) => {
    return await axios.get(ENDPOINTS.GET_LOBBY_INFO + `/${roomId}`, 
    requestHeaderConfig(sessionStorage.getItem('token')
    ));
}

export const GetTruthsAndLies = async () => {
    return await axios.get(ENDPOINTS.GET_TRUTHS_AND_LIES, requestHeaderConfig(sessionStorage.getItem('token')));
}