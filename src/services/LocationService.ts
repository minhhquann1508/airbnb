import { LocationFormat } from "../types";
import { BaseService } from "./BaseService";
class LocationService extends BaseService {
    constructor() {
        super()
    }
    getAllLocation = () => {
        return this.get('api/vi-tri');
    }
    getLstFindingLocation = (id:number) => {
        return this.get(`api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`);
    }
    getLocationFidingPagination = (keyword:string,page:number) => {
        if(keyword === '' || keyword === 'all') {
            return this.get(`api/vi-tri/phan-trang-tim-kiem?pageIndex=${page}&pageSize=8`);
        }
        else {
            return this.get(`api/vi-tri/phan-trang-tim-kiem?pageIndex=${page}&pageSize=8&keyword=${keyword}`);
        }
    }
    deleteLocation = (id:number) => {
        return this.delete(`api/vi-tri/${id}`)
    }
    addNewLocation = (model:LocationFormat) => {
        return this.post('api/vi-tri',model);
    }
    uploadLocationAvatar = (id:number,formFile:any) => {
        return this.post(`api/vi-tri/upload-hinh-vitri?maViTri=${id}`,formFile);
    }
    updateLocationInfo = (model:LocationFormat,id:number) => {
        return this.put(`api/vi-tri/${id}`,model);
    }
}

export const locationService = new LocationService();