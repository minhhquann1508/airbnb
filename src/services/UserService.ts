import { BaseService } from "./BaseService";
class UserService extends BaseService {
    constructor() {
        super()
    }
    login = (data:any) => {
        return this.post('api/auth/signin',data);
    }
    register = (data:any) => {
        return this.post('api/auth/signup',data);
    }
    getUserInfo = (id:number) => {
        return this.get(`api/users/${id}`);
    }
    updateInfo = (id:number,data:any) => {
        return this.put(`api/users/${id}`,data);
    }
    uploadAvatar = (avatar:File) => {
        return this.post('api/users/upload-avatar',avatar);
    }
    getLstRoomBooked = (id:number) => {
        return this.get(`api/dat-phong/lay-theo-nguoi-dung/${id}`);
    }
    deleteJourney = (id:number) => {
        return this.delete(`api/dat-phong/${id}`);
    }
}

export const userService = new UserService();