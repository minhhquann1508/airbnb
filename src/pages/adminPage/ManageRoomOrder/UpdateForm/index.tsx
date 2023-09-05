import { DatePicker, DatePickerProps, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { JourneyItem } from '../../../../types';
import { useDispatch } from 'react-redux';
import { updateOrderAction } from '../duck/action';
export default function UpdateForm(props:any) {
    const {itemData,closeModal} = props;
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{
            id: itemData.id,
            maPhong: itemData.id,
            ngayDen: itemData.ngayDen,
            ngayDi: itemData.ngayDi,
            soLuongKhach: itemData.soLuongKhach,
            maNguoiDung: itemData.maNguoiDung
        },
        enableReinitialize:true,
        onSubmit:(values:JourneyItem) => {
            dispatch(updateOrderAction(itemData.id,values,closeModal))
        }
    })

    const onChangeDatePickerInput = (date:any,name:string) => {
        if(date) {
            formik.setFieldValue(name,date);
        }
    };

    const handleChangeInput = (checked: boolean | number,name:string) => {
        formik.setFieldValue(name,checked);
    };

    useEffect(() => {
        for(let key in itemData) {
            formik.setFieldValue(key,itemData[key])
        }
    },[itemData])

    return (
        <form onSubmit={formik.handleSubmit} className="pt-5">
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                    <input type="text" disabled={true} name="id" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.id} className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã phòng</label>
                    <input type="text" disabled={true} name="maPhong" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maPhong} className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày đến</label>
                    <DatePicker onChange={(date) => onChangeDatePickerInput(date,'ngayDen')} format="DD/MM/YYYY" size='large' style={{width:'100%'}} value={dayjs(formik.values.ngayDen)}/>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày đi</label>
                    <DatePicker onChange={(date) => onChangeDatePickerInput(date,'ngayDi')} format="DD/MM/YYYY" size='large' style={{width:'100%'}} value={dayjs(formik.values.ngayDi)}/>
                </div>
                <div className="mb-6">
                    <label className="mr-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng khách:</label>
                    <InputNumber min={1} max={10} value={formik.values.soLuongKhach} onChange={(value) => handleChangeInput(Number(value),'soLuongKhach')}/>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã người đặt</label>
                    <input type="text" disabled={true} name="maNguoiDung" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maNguoiDung} className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="text-right">
                    <button type="submit" className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cập nhật</button>
                </div>
            </form>
  )
}
