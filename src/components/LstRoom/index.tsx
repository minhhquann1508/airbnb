import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar } from '@fortawesome/free-solid-svg-icons';
import LstRoomImg from './LstRoomImg';
import { Skeleton } from 'antd';
import { RootState } from '../../redux/store';
import { fetchData } from './duck/actions';
import { Room } from '../../types';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export default function LstRoom():JSX.Element  {
    const {loading,data,error} = useSelector((state:RootState) => state.lstRoomReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    const renderListRoom = ():JSX.Element[] => {
        if(loading) {
            return new Array(12).fill(null).map((_, index) => (
                <Skeleton key={index} active />
            ));
        }
        else {
            return data?.map((room:Room) => {
                return (
                    <div key={room.id} className="cursor-pointer hover:shadow-lg duration-500 rounded-md overflow-hidden flex flex-col">
                        <div>
                            <LstRoomImg hinhAnh={room.hinhAnh}/>
                        </div>
                        <div className="px-2 py-4 flex flex-col justify-end gap-1 relative" 
                            onClick={() => {
                                navigate(`/detail/${room.id}`)
                        }}>
                            <div className='flex items-start gap-3'>
                                <h1 className="w-full font-medium capitalize text-sm leading-5" style={{fontSize:15.5}}>{t(room.tenPhong.toLowerCase())}</h1>
                                <button className='flex justify-center items-center text-sm gap-1'>
                                    <FontAwesomeIcon className='text-yellow-400' icon={faStar} />
                                    <span className='font-medium'>{(10 - room.giaTien / 100).toFixed(2)}</span>
                                </button>
                            </div>
                            <p className="text-sm text-gray-600">{room.giaTien * 12} km</p>
                            <p className="text-sm text-gray-600"><span className='capitalize'>{t("days")}</span> {dayjs().format('DD')}-{dayjs().add(1,'day').format('DD/MM/YYYY')}</p>
                            <p className="font-semibold text-sm">${room.giaTien}<span className="font-normal">/ {t("night")}</span></p>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <section className="py-5 container px-5 mx-auto sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {renderListRoom()}
        </section>
    )
}
