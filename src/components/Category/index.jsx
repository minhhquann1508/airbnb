import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { lstCategory } from '../../util/constants';
import style from './style.module.css'
export default function Category() {
  return (
    <Swiper
      className='container'
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      breakpoints={{
        0: {
          slidesPerView: 2
        },
        400: {
          slidesPerView: 3
        },
        567: {
          slidesPerView: 5
        }
      }}
      navigation
    >
      {new Array(16).fill(null).map((_, index) => {
        return (
          <SwiperSlide key={index}>
            <div className={`${style['swiperItem']} cursor-pointer relative flex flex-col items-center justify-center pt-12 pb-8 gap-2`}>
              <img src={`./img/category${(index + 1)}.jpg`} width={25} height={25} alt="logo" />
              <label className='text-xs text-gray-500'>{lstCategory[index]}</label>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
}

