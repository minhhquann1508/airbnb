import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { fetchData } from "./duck/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { RoomFormat } from "../../../types";
export default function FindingLst():JSX.Element {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,data,error} = useSelector((state:RootState) => state.findingLstReducer);
    useEffect(() => {
        dispatch(fetchData(Number(id)))
    },[id]);
    const renderRoom = ():JSX.Element => {
        return data?.map((item:RoomFormat) => {
            return (
                <div key={item.id} className="p-3 hover:shadow-lg  hover:bg-gray-50 rounded-lg duration-300 cursor-pointer">
                    <img src={item.hinhAnh} className="rounded-lg" alt="anh" />
                    <div className="py-3" onClick={() => navigate(`/detail/${item.id}`)}>
                        <h1 className="capitalize font-medium mb-1 flex justify-between items-start gap-5"><span>{item.tenPhong.toLowerCase()}</span> <span className="text-sm flex gap-1 items-center"><FontAwesomeIcon className="text-yellow-400" icon={faStar} /> {(10 - item.giaTien / 100).toFixed(2)}</span></h1>
                        <p className="text-gray-600 text-sm mb-1">{item.giaTien * 12} km</p>
                        <p className="text-gray-600 text-sm mb-1">{dayjs().format('Ngày DD')}-{dayjs().add(1,'day').format('DD/MM/YYYY')}</p>
                        <p className="text-gray-600 text-sm mb-1"><span className="font-medium text-black text-lg">{item.giaTien}</span> /đêm</p>
                    </div>
                </div>
            )
        })
    }
    return (
        <section className="px-5 container mx-auto py-10">
            <h1 className="text-2xl font-medium flex items-center gap-2 mb-5 md:mb-10"><FontAwesomeIcon icon={faMagnifyingGlass} /> <span>Kết quả: {data?.length} căn hộ</span></h1>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-3/5 lg:grid grid-cols-2 gap-5">
                    {renderRoom()}
                </div>
                <div className="md:w-2/5">
                    <iframe className="h-full w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15745328.59099248!2d95.24033361707788!3d15.534143769255985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2zVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1693568259533!5m2!1svi!2s" width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>
    )
}
