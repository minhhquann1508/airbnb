import { RegisterFormat, UserFormat } from "../types";
import { BaseService } from "./BaseService";
class AdminManageUserService extends BaseService {
    constructor() {
        super()
    }
    getLstUserPagination = (keyword:string,page:number) => {
        if(keyword === '') {
            return this.get(`api/users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=20`)
        }
        else {
            return this.get(`api/users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=20&keyword=${keyword}`)
        }
    }
    deleteUser = (id:number) => {
        return this.delete(`api/users?id=${id}`)
    }
    addNewUser = (model:RegisterFormat) => {
        return this.post('api/users',model);
    }  
    updateUser = (model:UserFormat,id:number) => {
        return this.put(`api/users/${id}`,model);
    } 
}

export const adminManageUserService = new AdminManageUserService();