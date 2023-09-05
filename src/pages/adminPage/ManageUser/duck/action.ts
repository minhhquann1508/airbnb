import Swal from "sweetalert2"
import { Action, RegisterFormat} from "../../../../types"
import {fetchDataFail, fetchDataRequest, fetchDataSuccess} from "./types"
import { adminManageUserService } from "../../../../services/ManageUserService"
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

export const fetchData = (keyword:string,page:number):any => {
    return async (dispatch:any) => {
        dispatch(fetchDataRequestAction());
        try {
            let result = await adminManageUserService.getLstUserPagination(keyword,page);
            dispatch(fetchDataRequestSuccessAction(result.data.content))
        } 
        catch (error:any) {
            dispatch(fetchDataRequestFailAction(error.response.data))
        }
    }
}

export const deleteUserAction = (id:number,page:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await adminManageUserService.deleteUser(id);
            if(result.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã xóa thành công !',
                })
                dispatch(fetchData('',page))
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

export const addNewUserAction = (model:RegisterFormat,resetForm:any,closeModal:any,page:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await adminManageUserService.addNewUser(model);
            if(result.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã thêm người dùng thành công !',
                })
                await dispatch(fetchData('',page));
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