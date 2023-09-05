import Swal from "sweetalert2";
import { userService } from "../../../../services/UserService"
import { UPDATE_USER, UPLOAD_AVATAR, fetchDataFail } from "./types";
import { fetchDataRequest, fetchDataSuccess } from "./types"
import { Action } from "../../../../types";
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
            let result = await userService.getUserInfo(id);
            dispatch(fetchDataRequestSuccessAction(result.data.content))
        } 
        catch (error:any) {
            dispatch(fetchDataRequestFailAction(error.response.data))
        }
    }
}
export const updateInfoAction = (id:number,data:any,closeModal:any):any => {
    return async (dispatch:any) => {
        try {
            let result = await userService.updateInfo(id,data);
            if(result.status === 200) {
                await dispatch({
                    type:UPDATE_USER,
                    payload:result.data.content
                })
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Chỉnh sửa thông tin thành công !',
                })
                await dispatch(fetchData(id));
                await closeModal();
            }
        } 
        catch (error:any) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops..!',
                text: error.response.data.content,
            })
        }
    }
}

export const uploadAvatar = (avatar:any,closeModal:any,resetForm:any):any => {
    return async (dispatch:any) => {
        try {
            let result = await userService.uploadAvatar(avatar);
            if(result.status === 200) {
                await dispatch({
                    type:UPLOAD_AVATAR,
                    payload:result.data.content
                })
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Cập nhật ảnh đại diện thành công !',
                })
                await resetForm();
                await closeModal();
            }
        } 
        catch (error:any) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops..!',
                text: error.response.data.content,
            })
        }
    }
}