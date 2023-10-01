import { API_URL } from "@env";
import axios from "axios";

export const getUserActivities = async (user_id:string, token:string) => {
    return axios.get(API_URL +'/activity/' + user_id, {
        headers: {
            Authorization:token
        }
    } )
}

export const updateFieldApi = async (_id:string, body:any, token:string) => {

    return axios.put(API_URL + '/activity/' + _id, body, {
        headers: {
            "Authorization": token
        }
    })

}