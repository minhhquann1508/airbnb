import { BookingRoomForm, CommentFormat, JourneyItem } from "../types";
import { BaseService } from "./BaseService";
class ManageOrderService extends BaseService {
    constructor() {
        super()
    }
    getLstOrder = () => {
        return this.get('api/dat-phong');
    }
    deleteOrder = (id:number) => {
        return this.delete(`api/dat-phong/${id}`);
    }
    updateOrder = (id:number,model:JourneyItem) => {
        return this.put(`api/dat-phong/${id}`,model);
    }
}

export const manageOrderService = new ManageOrderService();