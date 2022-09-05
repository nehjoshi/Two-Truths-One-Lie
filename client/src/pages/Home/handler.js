//Helper functions go here
import { ENDPOINTS } from "../../utils/endpoints";
import axios from 'axios';

export const PostData = async (email, password) => {
    return await axios.post(ENDPOINTS.REGISTER, {
        email, password
    })
}