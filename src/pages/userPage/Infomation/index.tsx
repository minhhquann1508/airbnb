import { faCalendarDays, faCheck, faEnvelope, faKey, faLock, faPhone, faUser, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import UpdateForm from './UpdateForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import dayjs from 'dayjs';
import { fetchData } from './duck/actions';
import { useParams } from 'react-router-dom';
import UpdateAvatar from './UpdateAvatar';
export default function Infomation() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {loading,data,error} = useSelector((state:RootState) => state.infomationReducer);
    const showInfoModal = () => {
        setIsModalInfoOpen(true);
    };
    //Mở modal sửa thông tin
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);

    const handleInfoModalOk = ():void => {
        setIsModalInfoOpen(false);
    };

    const handleCancelModalInfo = ():void => {
        setIsModalInfoOpen(false);
    };

    //Mở modal cập nhật avatar
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    const showModalAvatar = () => {
        setIsAvatarModalOpen(true);
    };

    const handleOkAvtar = () => {
        setIsAvatarModalOpen(false);
    };

    const handleCancelAvatar = () => {
        setIsAvatarModalOpen(false);
    };

    useEffect(() => {
        dispatch(fetchData(Number(id)))
    },[])
  return (
    <section className='flex justify-center py-10'>
        <Modal title="Thông tin cá nhân" footer="" width={800} open={isModalInfoOpen} onOk={handleInfoModalOk} onCancel={handleCancelModalInfo}>
            <UpdateForm closeModal={handleInfoModalOk}/>
        </Modal>
        <Modal title="Cập nhật ảnh đại diện" footer="" open={isAvatarModalOpen} onOk={handleOkAvtar} onCancel={handleCancelAvatar}>
            <UpdateAvatar closeModal={handleCancelAvatar}/>
        </Modal>
        <div className='w-4/5 flex flex-col lg:flex-row'>
            <div className='w-full lg:w-1/3 flex justify-center lg:justify-start'>
                <div className='w-5/6 shadow-lg border p-3 rounded-md h-full'>
                    <img src="./../img/airbnb_logo.png" width={100} height={100} alt="logo" />
                    <div className='flex justify-center mb-3'>
                        <img src={data?.avatar === '' ? "https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" : data?.avatar} className='w-20 h-20 rounded-full' alt="avatar" />
                    </div>
                    <div className='text-center mb-3'>
                        <button className='underline text-gray-500 font-medium hover:text-pink-600 duration-300' onClick={showModalAvatar}>Cập nhật hình ảnh</button>
                    </div>
                    <div className='text-center mb-5'>
                        <h1 className='font-medium text-lg'>{data?.name}</h1>
                    </div>
                    <div className='mx-3 mb-3'>
                        <h1 className='text-base sm:text-lg font-medium mb-2 flex gap-1 items-center'><FontAwesomeIcon icon={faCheck} /><span>Đã xác nhận</span></h1>
                        <p className='text-sm sm:text-base text-gray-600 pl-5'>Địa chỉ email</p>
                    </div>
                    <div className='mx-3 mb-3'>
                        <h1 className='text-base sm:text-lg font-medium mb-2 flex gap-1 items-center'><FontAwesomeIcon icon={faLock} /><span>Tại sao thông tin của tôi không được hiển thị ở đây?</span></h1>
                        <p className='text-sm sm:text-base text-gray-600 pl-5'>Chúng tôi đang ẩn một số thông tin tài khoản để bảo vệ danh tính của bạn.</p>
                    </div>
                    <div className='mx-3 mb-3'>
                        <h1 className='text-base sm:text-lg font-medium mb-2 flex gap-1 items-center'><FontAwesomeIcon icon={faKey} /><span>Bạn có thể chỉnh sửa những nội dung nào?</span></h1>
                        <p className='text-sm sm:text-base text-gray-600 pl-5'>
                        Bạn có thể chỉnh sửa thông tin cá nhân. 
                        Nếu sử dụng thông tin này để xác minh danh tính, bạn sẽ cần phải xác minh lần nữa vào lần đặt tiếp theo,
                        hoặc để tiếp tục đón tiếp khách.
                        </p>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-2/3 mt-6 lg:mt-0'>
                <div className='grid grid-cols-2 py-8 px-3 hover:bg-gray-100 duration-300'>
                    <label className='font-medium'><FontAwesomeIcon icon={faUser} /> Họ và tên</label>
                    <p className='font-light text-gray-600'>{data?.name}</p>
                </div>
                <div className='grid grid-cols-2 py-8 px-3 hover:bg-gray-100 duration-300'>
                    <label className='font-medium'><FontAwesomeIcon icon={faVenusMars} /> Giới tính</label>
                    <p className='font-light text-gray-600'>{data?.gender ? 'Nam' : 'Nữ'}</p>
                </div>
                <div className='grid grid-cols-2 py-8 px-3 hover:bg-gray-100 duration-300'>
                    <label className='font-medium'><FontAwesomeIcon icon={faCalendarDays} /> Ngày sinh</label>
                    <p className='font-light text-gray-600'>{dayjs(data?.birthday).format('DD/MM/YYYY')}</p>
                </div>
                <div className='grid grid-cols-2 py-8 px-3 hover:bg-gray-100 duration-300'>
                    <label className='font-medium'><FontAwesomeIcon icon={faEnvelope} /> Email</label>
                    <p className='font-light text-gray-600'>{data?.email}</p>
                </div>
                <div className='grid grid-cols-2 py-8 px-3 hover:bg-gray-100 duration-300'>
                    <label className='font-medium'><FontAwesomeIcon icon={faPhone} /> Số điện thoại</label>
                    <p className='font-light text-gray-600'>{data?.phone}</p>
                </div>
                <div className='text-center mt-5'>
                    <button className='bg-pink-600 text-white font-medium p-2 rounded-md hover:bg-pink-700 hover:scale-105 duration-300' onClick={showInfoModal}>Chỉnh sửa thông tin</button>
                </div>
            </div>
        </div>
    </section>
  )
}
