import Swal from "sweetalert2"
import { Action, JourneyItem} from "../../../../types"
import {fetchDataFail, fetchDataRequest, fetchDataSuccess} from "./types"
import { manageOrderService } from "../../../../services/ManageOrderService"
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
            let result = await manageOrderService.getLstOrder();
            dispatch(fetchDataRequestSuccessAction(result.data.content))
        } 
        catch (error:any) {
            dispatch(fetchDataRequestFailAction(error.response.data))
        }
    }
}

export const deleteOrderAction = (id:number):any => {
    return async (dispatch:any) => {
        try {
            let result = await manageOrderService.deleteOrder(id);
            if(result.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã xóa thành công !',
                })
            }
            dispatch(fetchData())
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

export const updateOrderAction = (id:number,model:JourneyItem,closeModal:any):any => {
    return async (dispatch:any) => {
        try {
            let result = await manageOrderService.updateOrder(id,model);
            if(result.status === 200 || result.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã chỉnh sửa thành công !',
                })
            }
            await closeModal()
            dispatch(fetchData())
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