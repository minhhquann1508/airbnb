import Swal from "sweetalert2"
import { Action, RoomFormat} from "../../../../types"
import {fetchDataFail, fetchDataRequest, fetchDataSuccess, getLstLocation} from "./types"
import { manageRoomService } from "../../../../services/ManageRoomService"
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
            let result = await manageRoomService.getLstRoomPagination(keyword,page);
            dispatch(fetchDataRequestSuccessAction(result.data.content))
        } 
        catch (error:any) {
            dispatch(fetchDataRequestFailAction(error.response.data))
        }
    }
}

export const getListAllLocation = ():any => {
    return async (dispatch:any) => {
        try {
            let result = await locationService.getAllLocation();
            if(result.status === 200) {
                dispatch({
                    type:getLstLocation,
                    payload:result.data.content
                })
            }
        } 
        catch (error:any) {
            console.log(error);
            
        }
    }
}

export const addNewRoom = (model:RoomFormat,resetForm:any,closeModal:any,page:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await manageRoomService.addNewRoom(model);
            if(result.status === 200 || result.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã thêm thành công !',
                });
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

export const deleteRoomAction = (id:number,page:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await manageRoomService.deleteRoom(id);
            if(result.status === 200 || result.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã xóa thành công !',
                });
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


export const updateRoomAction = (id:number,model:RoomFormat,closeModal:any,page:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await manageRoomService.updateRoom(model,id);
            if(result.status === 200 || result.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã cập nhật thành công !',
                });
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
            let result = await manageRoomService.uploadLocationAvatar(id,model);
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