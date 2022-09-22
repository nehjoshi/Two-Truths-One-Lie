import { ENDPOINTS } from "../../utils/endpoints";
import { requestHeaderConfig } from "../../utils/requestHeader";
import axios from 'axios';

export const getTruthsAndLies = async () => {
    return await axios.get(ENDPOINTS.GET_TRUTHS_AND_LIES, requestHeaderConfig(sessionStorage.getItem('token')));
}