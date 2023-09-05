import { faPersonSwimming, faTemperatureThreeQuarters, faTv, faUtensils, faWifi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { deleteJourneyAction, fetchData } from './duck/action';
import { RootState } from '../../../redux/store';
import { JourneyItem } from '../../../types';
import dayjs from 'dayjs';
import { Skeleton } from 'antd';
import Swal from 'sweetalert2';
export default function Journey():JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading,data,error} = useSelector((state:RootState) => state.journeyReducer);
    const {id}  = useParams();
    useEffect(() => {
        dispatch(fetchData(Number(id)))
    },[])
    const renderListJourney = ():JSX.Element => {
        if(loading) {
            return (
                <>
                    {
                        new Array(4).fill(null).map((_,index) => {
                            return (
                                <Skeleton key={index} className='mb-5' avatar paragraph={{ rows: 4 }} />
                            )
                        })
                    }
                </>
            )
        }
        else {
            if(data?.length > 0) {
                return data?.map((journey:JourneyItem) => {
                    return (
                        <div key={journey.id} className='flex gap-3 hover:bg-gray-100 flex-col sm:flex-row rounded-lg overflow-hidden mb-3 border hover:shadow duration-300 cursor-pointer'>
                            <img className='sm:w-1/3' src="https://airbnb.cybersoft.edu.vn/public/images/room/1658134435797_put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg" alt="anh" />
                            <div className='py-5 px-3 md:px-5 w-full sm:w-2/3'>
                                <h1 className='font-medium uppercase text-lg mb-3'>Đã đặt thành công</h1>
                                <p className='flex font-light text-gray-700 text-sm justify-between items-center mb-2'><span><span className='font-medium'>Mã phòng</span> : {journey.maPhong}</span></p>
                                <p className='flex font-light text-gray-700 text-sm justify-between items-center mb-3'><span><span className='font-medium'>Vào ngày:</span> {dayjs(journey.ngayDen).format('DD/MM/YYYY')} - {dayjs(journey.ngayDi).format('DD/MM/YYYY')}</span> <span className='font-medium'>Số khách:<span className='font-light'> {journey.soLuongKhach}</span></span></p>
                                <h1 className='font-medium text-lg mb-2'>Tiện ích</h1>
                                <div className='flex gap-5 flex-wrap text-xl mb-5'>
                                    <span><FontAwesomeIcon icon={faUtensils} /></span>
                                    <span><FontAwesomeIcon icon={faWifi} /></span>
                                    <span><FontAwesomeIcon icon={faTemperatureThreeQuarters} /></span>
                                    <span><FontAwesomeIcon icon={faPersonSwimming} /></span>
                                    <span><FontAwesomeIcon icon={faTv} /></span>
                                </div>
                                <div className='text-right'>
                                    <button className='text-sm hover:bg-red-600 hover:text-white hover:scale-105 duration-300  bg-gray-300 font-medium p-2 rounded-md'
                                        onClick={() => deleteJourney(journey.id)}
                                    >Hủy chuyến đi</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            else {
                return (
                    <div>Bạn chưa có chuyến đi nào cả.</div>
                )
            }
        }
    }

    const deleteJourney = (maPhong:number) => {
        Swal.fire({
            title:'Bạn chắc chứ',
            icon:'question',
            text: 'Bạn chắc chắn muốn xóa chuyến đi này chứ?',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            confirmButtonColor:'#db2777',
            cancelButtonText: `Hủy`,
            reverseButtons:true
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(deleteJourneyAction(maPhong,Number(id)))
            } 
          })
    }

    return (
        <section className='container mx-auto px-5 md:px-0 py-10'>
            <h1 className='text-3xl font-medium mb-7'>Chuyến đi</h1>
            <div className='flex gap-10 flex-col-reverse lg:flex-row'>
                {/* Phần trái */}
                <div className='w-full lg:w-2/3'>
                    {renderListJourney()}
                </div>
                {/* Phần phải */}
                <div className='w-3/4 lg:w-1/3 shadow rounded-lg border h-fit p-5'>
                    <h1 className='text-xl font-medium mb-3'>Khám phá các địa điểm thú vị</h1>
                    <p className='mb-5 text-gray-600'>Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu lưu tiếp theo của bạn rồi</p>
                    <div className='text-right'>
                        <button className='font-medium hover:text-pink-600 duration-300' onClick={() => navigate('/')}>Bắt đầu tìm kiếm</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
