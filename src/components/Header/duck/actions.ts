import {  fetchDataFail, fetchDataRequest, fetchDataSuccess } from "./types"
import { Action } from "../../../types"
import { locationService } from "../../../services/LocationService"
const fetchDataRequestAction = ():Action => {
    return {
        type:fetchDataRequest
    }
}

const fetchDataRequestSuccessAction = (data:any):Action => {
    return {
        type:fetchDataSuccess,
        payload:data
    }
}

const fetchDataRequestFailAction = (error:any):Action => {
    return {
        type:fetchDataFail,
        payload:error
    }
}

export const fetchData = ():any => {
    return async (dispatch:any) => {
        dispatch(fetchDataRequestAction());
        try {
            let result = await locationService.getAllLocation();
            dispatch(fetchDataRequestSuccessAction(result.data.content))
        } 
        catch (error:any) {
            dispatch(fetchDataRequestFailAction(error.response.data))
        }
    }
}