import { boolean } from "yup"

export interface Action {
    type:string,
    payload?:any,
}
export interface State {
    loading:boolean,
    data:any,
    error:any,
    [key:string]:any
}

export interface Room {
    id: number,
    tenPhong: string,
    khach: number,
    phongNgu: number,
    giuong: number,
    phongTam: number,
    moTa: string,
    giaTien: number,
    mayGiat: boolean,
    banLa: boolean,
    tivi: boolean,
    dieuHoa: boolean,
    wifi: boolean,
    bep: boolean,
    doXe: boolean,
    hoBoi: boolean,
    banUi: boolean,
    maViTri: number,
    hinhAnh: string
}

export interface UserComment {
    id: number,
    ngayBinhLuan: string,
    noiDung: string,
    saoBinhLuan: number,
    tenNguoiBinhLuan: string,
    avatar: string
}

export interface RegisterFormat {
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    birthday: string,
    gender: boolean,
    role: string
}

export interface BookingRoomForm {
    id: number,
    maPhong: number,
    ngayDen: any,
    ngayDi: any,
    soLuongKhach: number,
    maNguoiDung: number
}

export interface JourneyItem {
    id: number,
    maPhong: number,
    ngayDen: string,
    ngayDi: string,
    soLuongKhach: number,
    maNguoiDung: number
}

export interface CommentFormat {
    id: number,
    maPhong: number,
    maNguoiBinhLuan: number,
    ngayBinhLuan: string,
    noiDung: string,
    saoBinhLuan: number
}

export interface LocationFormat {
    id: number,
    tenViTri: string,
    tinhThanh: string,
    quocGia: string,
    hinhAnh: string
}

export interface RoomFormat {
    id: number,
    tenPhong: string,
    khach: number,
    phongNgu: number,
    giuong: number,
    phongTam: number,
    moTa: string,
    giaTien: number,
    mayGiat: boolean,
    banLa: boolean,
    tivi: boolean,
    dieuHoa: boolean,
    wifi: boolean,
    bep: boolean,
    doXe: boolean,
    hoBoi: boolean,
    banUi: boolean,
    maViTri: number,
    hinhAnh: string
}

export interface UserFormat {
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    birthday: string,
    avatar: string,
    gender: boolean,
    role: string
}