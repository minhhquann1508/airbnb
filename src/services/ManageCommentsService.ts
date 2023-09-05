import { BookingRoomForm, CommentFormat } from "../types";
import { BaseService } from "./BaseService";
class ManageCommentsService extends BaseService {
    constructor() {
        super()
    }
    getCommentByRoomId = (id:number) => {
        return this.get(`api/binh-luan/lay-binh-luan-theo-phong/${id}`)
    }
    bookingRoom = (model:BookingRoomForm) => {
        return this.post('api/dat-phong',model);
    }
    addNewComment = (comment:CommentFormat) => {
        return this.post('api/binh-luan',comment);
    }
    deleteComment = (id:number) => {
        return this.delete(`api/binh-luan/${id}`)
    }
}

export const manageCommentsService = new ManageCommentsService();