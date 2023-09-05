import { RoomFormat } from "../types";
import { BaseService } from "./BaseService";
class ManageRoomService extends BaseService {
    constructor() {
        super()
    }
    getListRoom = () => {
        return this.get('api/phong-thue');
    }
    getRoomDetailById = (id:number) => {
        return this.get(`api/phong-thue/${id}`)
    }
    getLstRoomPagination = (keyword:string,page:number) => {
        if(keyword === '' || keyword === 'all') {
            return this.get(`api/phong-thue/phan-trang-tim-kiem?pageIndex=${page}&pageSize=20`);
        }
        else {
            return this.get(`api/phong-thue/phan-trang-tim-kiem?pageIndex=${page}&pageSize=20&keyword=${keyword}`);
        }
    }
    addNewRoom = (model:RoomFormat) => {
        return this.post('api/phong-thue',model);
    }
    deleteRoom = (id:number) => {
        return this.delete(`api/phong-thue/${id}`);
    }
    updateRoom = (model:RoomFormat,id:number) => {
        return this.put(`api/phong-thue/${id}`,model);
    }
    uploadLocationAvatar = (id:number,model:RoomFormat) => {
        return this.post(`api/phong-thue/upload-hinh-phong?maPhong=${id}`,model);
    }
}

export const manageRoomService = new ManageRoomService();