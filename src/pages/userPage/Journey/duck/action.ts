import Swal from "sweetalert2"
import { Action } from "../../../../types"
import { deleteJourney, fetchDataFail, fetchDataRequest, fetchDataSuccess } from "./types"
import { userService } from "../../../../services/UserService"
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

export const fetchData = (id:number):any => {
    return async (dispatch:any) => {
        dispatch(fetchDataRequestAction());
        try {
            let result = await userService.getLstRoomBooked(id);
            dispatch(fetchDataRequestSuccessAction(result.data.content))
        } 
        catch (error:any) {
            dispatch(fetchDataRequestFailAction(error.response.data))
        }
    }
}

export const deleteJourneyAction = (maPhong:number,id:number):any => {
    return async (dispatch:any) => {
        dispatch(fetchDataRequestAction());
        try {
            let result = await userService.deleteJourney(maPhong);
            if(result.status === 200) {
                await dispatch({
                    type:deleteJourney
                })
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Xóa chuyến đi thành công',
                })
                await dispatch(fetchData(id))
            }
        } 
        catch (error:any) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...!',
                text: error.response.data.content,
            })
        }
    }
} 