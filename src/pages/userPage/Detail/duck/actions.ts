import Swal from "sweetalert2"
import { manageCommentsService } from "../../../../services/ManageCommentsService"
import { manageRoomService } from "../../../../services/ManageRoomService"
import { Action, BookingRoomForm, CommentFormat } from "../../../../types"
import { addNewComment, bookingRoom, fetchDataFail, fetchDataRequest, fetchDataSuccess, getListComment } from "./types"
import { number } from "yup"
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
            let result = await manageRoomService.getRoomDetailById(id);
            dispatch(fetchDataRequestSuccessAction(result.data.content))
        } 
        catch (error:any) {
            dispatch(fetchDataRequestFailAction(error.response.data))
        }
    }
}

export const getListCommentAction = (id:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await manageCommentsService.getCommentByRoomId(id);
            dispatch({
                type:getListComment,
                payload:result.data.content
            })
        } 
        catch (error:any) {
            console.log(error.response.data);
            
        }
    }
}

export const bookingRoomAction = (model:BookingRoomForm,closeModal:any):any => {
    return async (dispatch:any) => {
        try {
            let result = await manageCommentsService.bookingRoom(model);
            if(result.status === 200 || result.status === 201) {
                await dispatch({
                    type:bookingRoom,
                })
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã đặt phòng thành công !',
                })
                await closeModal();
            }
        } 
        catch (error:any) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...!',
                text:error.response.data.content,
            })
        }
    }
}

export const addNewCommentAction = (comment:CommentFormat,id:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await manageCommentsService.addNewComment(comment);
            if(result.status === 200 || result.status === 201) {
                await dispatch({
                    type:addNewComment,
                    payload:result.data.content
                })
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Thêm đánh giá thành công !',
                })
                await dispatch(getListCommentAction(id))
            }
        } 
        catch (error:any) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...!',
                text:error.response.data.content,
            })
        }
    }
}


export const deleteCommentAction = (id:number,roomId:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await manageCommentsService.deleteComment(id);
            if(result.status === 200 || result.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Xóa đánh giá thành công !',
                })
                await dispatch(getListCommentAction(roomId))
            }
        } 
        catch (error:any) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...!',
                text:error.response.data.content,
            })
        }
    }
}