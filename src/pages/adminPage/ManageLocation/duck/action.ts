import Swal from "sweetalert2"
import { Action, LocationFormat, RegisterFormat} from "../../../../types"
import {fetchDataFail, fetchDataRequest, fetchDataSuccess} from "./types"
import { adminManageUserService } from "../../../../services/ManageUserService"
import { locationService } from "../../../../services/LocationService"
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
            let result = await locationService.getLocationFidingPagination(keyword,page);
            dispatch(fetchDataRequestSuccessAction(result.data.content))
        } 
        catch (error:any) {
            dispatch(fetchDataRequestFailAction(error.response.data))
        }
    }
}

export const deleteLocationAction = (id:number,page:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await locationService.deleteLocation(id);
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

export const addNewLocationAction = (model:LocationFormat,page:number,resetForm:any,closeModal:any):any => {
    return async (dispatch:any) => {
        try {
            let result = await locationService.addNewLocation(model);
            if(result.status === 200 || result.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã thêm vị trí thành công !',
                })
                await resetForm();
                await closeModal();
                await dispatch(fetchData('',page))
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

export const uploadAvatarAction = (id:number,model:any,closeModal:any,resetForm:any,page:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await locationService.uploadLocationAvatar(id,model);
            if(result.status === 200 || result.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã cập nhật thành công !',
                })
                await resetForm();
                await closeModal();
                await dispatch(fetchData('',page))
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


export const updateLocationInfomationAction = (model:LocationFormat,id:number,closeModal:any,page:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await locationService.updateLocationInfo(model,id);
            if(result.status === 200 || result.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã cập nhật thành công !',
                })
                await closeModal();
                await dispatch(fetchData('',page))
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
