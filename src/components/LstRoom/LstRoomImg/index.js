// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function LstRoomImg(props) {
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
        >
            {new Array(3).fill(null).map((_, index) => {
                return (
                    <SwiperSlide key={index}>
                        <img className="w-full h-52 object-cover" src={props.hinhAnh} alt="anh" />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}
