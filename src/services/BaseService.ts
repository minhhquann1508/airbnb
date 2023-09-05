import axios from "axios"
import { DOMAIN, TOKEN, USER_LOGIN } from "../util/constants"
const storedValue = localStorage.getItem(USER_LOGIN);
let accessToken:string = '';
if (storedValue !== null) {
    accessToken = JSON.parse(storedValue).token;
}
export class BaseService {
    constructor() {}
    get = (url:string) => {
        return axios({
            method:'GET',
            url:`${DOMAIN}/${url}`,
            headers:{
                TokenCybersoft:TOKEN,
                token:accessToken
            }
        })
    }
    post = (url:string,model:any) => {
        return axios({
            method:'POST',
            url:`${DOMAIN}/${url}`,
            data:model,
            headers:{
                TokenCybersoft:TOKEN,
                token:accessToken,
            }
        })
    }
    put = (url:string,model:any) => {
        return axios({
            method:'PUT',
            url:`${DOMAIN}/${url}`,
            data:model,
            headers:{
                TokenCybersoft:TOKEN,
                token:accessToken,
            }
        })
    }
    delete = (url:string) => {
        return axios({
            method:'DELETE',
            url:`${DOMAIN}/${url}`,
            headers:{
                TokenCybersoft:TOKEN,
                token:accessToken,
            }
        })
    }
}