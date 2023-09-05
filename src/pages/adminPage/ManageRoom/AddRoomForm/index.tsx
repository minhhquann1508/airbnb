import { InputNumber, Select, Switch } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect } from "react";
import { addNewRoom, getListAllLocation } from "../duck/action";
import { LocationFormat, RoomFormat } from "../../../../types";
import { roomSchema } from "../../../../util/schema";

export default function AddRoomForm(props:any) {
    const dispacth = useDispatch();
    const {closeModal,activePage} = props;
    const {lstLocation} = useSelector((state:RootState) => state.manageRoomAdminReducer);
    useEffect(() => {
        dispacth(getListAllLocation())
    },[])
    const formik = useFormik({
        initialValues:{
            id: 0,
            tenPhong: '',
            khach: 1,
            phongNgu: 1,
            giuong: 1,
            phongTam: 1,
            moTa: '',
            giaTien: 10,
            mayGiat: false,
            banLa: false,
            tivi: false,
            dieuHoa: false,
            wifi: false,
            bep: false,
            doXe: false,
            hoBoi: false,
            banUi: false,
            maViTri: 1,
            hinhAnh: ''
        },
        validationSchema:roomSchema,
        onSubmit:(values:RoomFormat) => {
            dispacth(addNewRoom(values,resetForm,closeModal,activePage));
        }
    })

    const resetForm = () => {
        let value = formik.values;
        for(let key in value) {
            if(key === 'tenPhong' || key === 'moTa' || key === 'hinhAnh') {
                formik.setFieldValue(key,'');
            }
            if(key === 'khach' || key === 'phongNgu' || key === 'giuong' || key == 'phongTam' || key == 'maViTri') {
                formik.setFieldValue(key,1);
            }
            if(key === 'giaTien') {
                formik.setFieldValue('giaTien',10);
            }
            else {
                formik.setFieldValue(key,false);
            }
        }
    }

    const handleChangeInput = (checked: boolean | number,name:string) => {
        formik.setFieldValue(name,checked);
    };

    const handleChangeSelectInput = (value:string) => {
        formik.setFieldValue('maViTri',value);
    }

    return (
        <form onSubmit={formik.handleSubmit} className="pt-3">
            <div className="grid grid-cols-2 gap-3">
                <div className="col-span-full">
                    <label className="block mb-2 font-medium">Tên phòng</label>
                    <input type="text" name="tenPhong" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tenPhong} className="p-2 border w-full rounded-md" />
                    {formik.touched.tenPhong && formik.errors.tenPhong ? <p className="text-red-600">{formik.errors.tenPhong}</p> : ''}
                </div>
                <div className="col-span-full">
                    <label className="block mb-2 font-medium">Mô tả</label>
                    <input type="text" name="moTa" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.moTa} className="p-2 border w-full rounded-md" />
                    {formik.touched.moTa && formik.errors.moTa ? <p className="text-red-600">{formik.errors.moTa}</p> : ''}
                </div>
                <div className="col-span-full">
                    <label className="block mb-2 font-medium">Vị trí</label>
                    <Select
                        defaultValue="Quận 1"
                        style={{ width: '100%' }}
                        onChange={handleChangeSelectInput}
                        size="large"
                        options={lstLocation?.map((item:LocationFormat) => ({value:item.id,label:item.tenViTri}))}
                    />
                </div>
                <div className="col-span-full mb-3">
                    <label className="font-medium">Tiện ích</label>
                    <ul className="grid grid-cols-4 gap-5 mt-3">
                        <li>
                            <label className="block mb-1">Máy giặt</label>
                            <Switch style={{border:'1px solid #ccc'}} checked={formik.values.mayGiat} onChange={(value) => handleChangeInput(value,'mayGiat')} />
                        </li>
                        <li>
                            <label className="block mb-1">Bàn là</label>
                            <Switch style={{border:'1px solid #ccc'}} checked={formik.values.banLa} onChange={(value) => handleChangeInput(value,'banLa')} />
                        </li>
                        <li>
                            <label className="block mb-1">TV</label>
                            <Switch style={{border:'1px solid #ccc'}} checked={formik.values.tivi} onChange={(value) => handleChangeInput(value,'tivi')} />
                        </li>
                        <li>
                            <label className="block mb-1">Điều hòa</label>
                            <Switch style={{border:'1px solid #ccc'}} checked={formik.values.dieuHoa} onChange={(value) => handleChangeInput(value,'dieuHoa')} />
                        </li>
                        <li>
                            <label className="block mb-1">Wifi</label>
                            <Switch style={{border:'1px solid #ccc'}} checked={formik.values.wifi} onChange={(value) => handleChangeInput(value,'wifi')} />
                        </li>
                        <li>
                            <label className="block mb-1">Bếp</label>
                            <Switch style={{border:'1px solid #ccc'}} checked={formik.values.bep} onChange={(value) => handleChangeInput(value,'bep')} />
                        </li>
                        <li>
                            <label className="block mb-1">Bãi đỗ xe</label>
                            <Switch style={{border:'1px solid #ccc'}} checked={formik.values.doXe} onChange={(value) => handleChangeInput(value,'doXe')} />
                        </li>
                        <li>
                            <label className="block mb-1">Hồ bơi</label>
                            <Switch style={{border:'1px solid #ccc'}} checked={formik.values.hoBoi} onChange={(value) => handleChangeInput(value,'hoBoi')} />
                        </li>
                    </ul>
                </div>
                <div className="col-span-full">
                    <label className="mr-2 font-medium">Số khách tối đa:</label>
                    <InputNumber min={1} max={10} defaultValue={1} value={formik.values.khach} onChange={(value) => handleChangeInput(Number(value),'khach')}/>
                </div>
                <div className="col-span-full">
                    <label className="mr-2 font-medium">Số phòng ngủ:</label>
                    <InputNumber min={1} max={10} defaultValue={1} value={formik.values.phongNgu} onChange={(value) => handleChangeInput(Number(value),'phongNgu')}/>
                </div>
                <div className="col-span-full">
                    <label className="mr-2 font-medium">Số giường:</label>
                    <InputNumber min={1} max={10} defaultValue={1} value={formik.values.giuong} onChange={(value) => handleChangeInput(Number(value),'giuong')}/>
                </div>
                <div className="col-span-full">
                    <label className="mr-2 font-medium">Số phòng tắm:</label>
                    <InputNumber min={1} max={10} defaultValue={1} value={formik.values.phongTam} onChange={(value) => handleChangeInput(Number(value),'phongTam')}/>
                </div>
                <div className="col-span-full">
                    <label className="mr-2 font-medium">Giá tiền một đêm:</label>
                    <InputNumber min={10} max={1000} defaultValue={10} value={formik.values.giaTien} onChange={(value) => handleChangeInput(Number(value),'giaTien')}/>
                </div>
            </div>
            <div className="text-right">
                <button type="submit" className="bg-pink-600 hover:bg-pink-700 duration-300 p-2 text-white font-medium rounded-md">Thêm</button>
            </div>
        </form>
    )
}
