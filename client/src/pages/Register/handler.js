import { ENDPOINTS } from "../../utils/endpoints";
import axios from "axios";
export const PostData = async (email, password, name) => {
    return await axios.post(ENDPOINTS.REGISTER, {
        email, password, name
    })
}