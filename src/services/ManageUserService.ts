import { RegisterFormat } from "../types";
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
}

export const adminManageUserService = new AdminManageUserService();