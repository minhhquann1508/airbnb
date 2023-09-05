import { faCircleMinus, faCirclePlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import {DatePicker } from 'antd';
import { useState } from 'react';
import {useFormik} from 'formik'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { bookingRoomAction } from '../duck/actions';
import { BookingRoomForm } from '../../../../types';
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
export default function BookingForm(props:any):JSX.Element {
    const {data} = props;
    const {id} = useParams();
    const dispatch = useDispatch();
    const [quantity,setQuantity] = useState<number>(1);
    const [range,setRange] = useState<number>(1);
    const {userLogin} = useSelector((state:RootState) => state.loginReducer);
    const formik = useFormik({
        initialValues:{
            id: 0,
            maPhong: Number(id),
            ngayDen: '',
            ngayDi: '',
            soLuongKhach: 1,
            maNguoiDung: userLogin?.user.id || 0,
        },
        onSubmit:(values:BookingRoomForm) => {
            dispatch(bookingRoomAction(values))
        }
    })
    let date = dayjs(new Date().getTime()).format('DD/MM/YYYY');
    let today = dayjs(new Date().getTime());
    const disabledDate = (current: any) => {
        // Không cho phép chọn ngày trước ngày hôm nay
        return current && current < today.startOf('day');
    };
    const renderFooter = ():JSX.Element => {
        return (
            <div className='flex justify-end gap-5 px-5 py-3 items-center'>
                <button className='underline font-medium text-base'>Xóa ngày</button>
                <button className='bg-black py-2 px-5 text-white font-medium text-base rounded-lg'>Đóng</button>
            </div>
        )
    }
    //Hàm tăng giảm số lượng khách
    const updateCustomerQuantity = (status:boolean) => {
        if(!status) {
            if(quantity > 1) {
                setQuantity(quantity - 1);
                formik.setFieldValue('soLuongKhach',quantity - 1);
            }
        }
        else {
            if(quantity < data?.khach) {
                setQuantity(quantity + 1);
                formik.setFieldValue('soLuongKhach',quantity + 1);
            }
        }
    }
    const handleChangeRange = (value:any) => {
        if(value) {
            const startDate = dayjs(value[0]);
            const endDate = dayjs(value[1]);
            const numberOfDays = endDate.diff(startDate, 'day');
            if(numberOfDays < 1) {
                setRange(1);
            }
            else {
                setRange(numberOfDays)
            }
            formik.setFieldValue('ngayDen',dayjs(value[0]).format('DD/MM/YYYY'))
            formik.setFieldValue('ngayDi',dayjs(value[1]).format('DD/MM/YYYY'))
        }
        else {
            setRange(1);
        }
    }
  return (
    <form onSubmit={formik.handleSubmit} className='w-5/6 h-fit border py-6 px-4 rounded-xl shadow-lg'>
        <div className='flex justify-between mb-5'>
            <h1 className='font-medium text-2xl'>$ {data?.giaTien} <span className='font-light text-gray-700 text-base'>/ đêm</span></h1>
            <div className='flex gap-1 text-sm items-center'>
                <p className='font-medium gap-1 items-center flex'><FontAwesomeIcon icon={faStar}/>{(10 - data?.giaTien / 100).toFixed(2)}</p>
                <p className='font-light text-gray-500 gap-1'>{data?.giaTien + 7} đánh giá</p>
            </div>
        </div>
        <RangePicker
            format='DD/MM/YYYY'
            className='w-full p-3 text-lg font-medium custom-range-picker'
            placeholder={['Ngày nhận phòng','Ngày trả phòng']}
            style={{border:'1px solid black'}}
            defaultValue={[dayjs(date, dateFormat), dayjs(date, dateFormat)]}
            disabledDate={disabledDate}
            renderExtraFooter={renderFooter}
            popupStyle={{border:'none',padding:0,borderRadius:10}}
            placement='bottomLeft'
            size='large'
            onChange={handleChangeRange}
        /> 
        <div className='border border-black rounded-md my-5 py-2 px-3'>
            <label className='font-medium text-sm'>Số khách</label>
            <div className='flex justify-between items-center mt-3'>
                <button type='button' onClick={() => updateCustomerQuantity(false)}><span><FontAwesomeIcon icon={faCircleMinus} className='text-3xl text-gray-500 hover:scale-105 hover:text-pink-600 duration-300' /></span></button>
                <span className='font-light'>{quantity} khách</span>
                <button type='button' onClick={() => updateCustomerQuantity(true)}><FontAwesomeIcon icon={faCirclePlus} className='text-3xl text-gray-500 hover:scale-105 hover:text-pink-600 duration-300' /></button>
            </div>
        </div> 
        <button type='submit' className='text-center w-full bg-pink-600 p-3 rounded-md mb-3 hover:bg-pink-700 duration-300 text-white font-medium'>Đặt phòng</button>
        <p className='text-center text-sm mb-5'>Bạn vẫn chưa bị trừ tiền</p>
        <div className='flex justify-between items-center font-light mb-3' style={{fontSize:16.5}}>
            <p className='underline'>${data?.giaTien} x {range} đêm</p>
            <p>${data?.giaTien * range}</p>
        </div>
        <div className='flex justify-between items-center font-light mb-3' style={{fontSize:16.5}}>
            <p className='underline'>Phí vệ sinh</p>
            <p>$5</p>
        </div>
        <div className='flex justify-between items-center font-light border-b border-gray-300 pb-5' style={{fontSize:16.5}}>
            <p className='underline'>Phí dịch vụ Airbnb</p>
            <p>$5</p>
        </div>
        <div className='flex justify-between items-center font-medium pt-5' style={{fontSize:16.5}}>
            <p>Tổng trước thuế</p>
            <p>${data?.giaTien * range + 5 + 5}</p>
        </div>
    </form>
  )
}
