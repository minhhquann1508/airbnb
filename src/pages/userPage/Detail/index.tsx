import {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import { deleteCommentAction, fetchData, getListCommentAction } from './duck/actions';
import { RootState } from '../../../redux/store';
import {  faAngleRight, faBed, faCalendar, faElevator, faExplosion, faHouseUser, faLanguage, faLocation, faLocationDot, faMedal, faPersonSwimming, faShareFromSquare, faShower, faSoap, faSquareParking, faStar, faTelevision, faTemperatureArrowDown, faUser, faUtensils, faWifi } from '@fortawesome/free-solid-svg-icons';
import { faHeart , faComment} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserComment } from '../../../types';
import BookingForm from './BookingForm';
import CommentForm from './CommentForm';
import Swal from 'sweetalert2';
export default function Detail():JSX.Element {
  const [isShowMore,setIsShowMore] = useState(false);
  const {id} = useParams();
  const dispacth = useDispatch();
  const {loading,data,error,lstComment} = useSelector((state:RootState) => state.roomDetailReducer);
  const {userLogin} = useSelector((state:RootState) => state.loginReducer);
  useEffect(() => {
      dispacth(fetchData(Number(id)))
      dispacth(getListCommentAction(Number(id)))
  }, [id]);
  const deleteComment = (commentId:number,roomId:number):void => {
    Swal.fire({
      title:'Bạn chắc chứ',
      icon:'question',
      text: 'Bạn chắc chắn muốn xóa bình luận này chứ ?',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      confirmButtonColor:'#db2777',
      cancelButtonText: `Hủy`,
      reverseButtons:true
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispacth(deleteCommentAction(commentId,roomId));
      } 
    })
  }
  const renderCommentSection = ():JSX.Element => {
    if(isShowMore) {
      return lstComment?.map((user:UserComment) => {
        return (
          <div key={user.id} className='mb-3 p-3'>
            <div className='flex gap-5 mb-3'>
              <img src={user.avatar} className='cursor-pointer rounded-full w-10 h-10 bg-gray-400' alt={user.tenNguoiBinhLuan} />
              <div>
                <h1 className='font-medium text-sm mb-1'>{user.tenNguoiBinhLuan}</h1>
                <p className='text-sm text-gray-500'>{user.ngayBinhLuan}</p>
              </div>
            </div>
              <p className='leading-7 px-2'>
                {user.noiDung}
              </p>
              <p className='px-2 flex gap-2 items-center mb-3'>{new Array(user.saoBinhLuan).fill(null).map((_,index) => {
                  return (
                    <FontAwesomeIcon key={index} className='text-yellow-500' icon={faStar} /> 
                  )
              })}</p>
              <div className={`${(userLogin?.user.role).toLowerCase() === 'admin' ? 'flex' : 'hidden'} px-2 gap-3`}>
                <button className='text-sm text-gray-500 hover:underline hover:text-green-600 duration-300'>Chỉnh sửa</button>
                <button className='text-sm text-gray-500 hover:underline hover:text-red-600 duration-300'
                  onClick={() => deleteComment(user.id,Number(id))}
                >Xóa</button>
              </div>
          </div>
        )
      })
    }
    else {
      return lstComment?.slice(0,4).map((user:UserComment) => {
        return (
          <div key={user.id} className='mb-3 p-3'>
            <div className='flex gap-5 mb-3'>
              <img src={user.avatar} className='rounded-full w-10 h-10 bg-gray-400' alt={user.tenNguoiBinhLuan} />
              <div>
                <h1 className='font-medium text-sm mb-1'>{user.tenNguoiBinhLuan}</h1>
                <p className='text-sm text-gray-500'>{user.ngayBinhLuan}</p>
              </div>
            </div>
              <p className='leading-7 px-2 mb-2'>
                {user.noiDung}
              </p>
              <p className='px-2 flex gap-2 items-center mb-3'>{new Array(user.saoBinhLuan).fill(null).map((_,index) => {
                  return (
                    <FontAwesomeIcon key={index} className='text-yellow-500' icon={faStar} /> 
                  )
              })}</p>
              <div className={`${(userLogin?.user.role)?.toLowerCase() === 'admin' ? 'flex' : 'hidden'} px-2 gap-3`}>
                <button className='text-sm text-gray-500 hover:underline hover:text-green-600 duration-300'>Chỉnh sửa</button>
                <button className='text-sm text-gray-500 hover:underline hover:text-red-600 duration-300'
                  onClick={() => deleteComment(user.id,Number(id))}
                >Xóa</button>
            </div>
          </div>
        )
      })
    }
  }
  return (
    <div className='container mx-auto px-3 md:p-0'>
      <section className='py-5'>
        <h1 className='text-xl md:text-2xl mb-2 font-medium tracking-wide flex items-center gap-2'><FontAwesomeIcon icon={faLocationDot} /> <span>{data?.tenPhong}</span></h1>
        <div className='flex flex-col gap-3 md:flex-row justify-between mb-5'>
          {/* Phần trái */}
          <div className='flex gap-5 text-sm md:text-base'>
            <p className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faStar} />
              <span>{(10 - data?.giaTien / 100).toFixed(2)}</span>
            </p>
            <h1 className='underline'>{data?.giaTien} đánh giá</h1>
            <p className='flex items-center gap-1'>
            <FontAwesomeIcon icon={faMedal} />
              <span>Chủ nhà siêu cấp</span>
            </p>
          </div>
          {/* Phần phải */}
          <div className='flex gap-5 text-sm md:text-base'>
            <button className='font-medium flex items-center gap-2'><FontAwesomeIcon icon={faShareFromSquare} /> <span>Chia sẻ</span></button>
            <button className='font-medium flex items-center gap-2'><FontAwesomeIcon icon={faHeart} /> <span>Lưu</span></button>
          </div>
        </div>
        <img src={data?.hinhAnh} alt="anh" />
      </section>
      <section className='flex flex-col lg:flex-row gap-10 pt-10 pb-6 border-b border-gray-300'>
        {/* Phần trái */}
        <div className='w-full lg:w-2/3 flex flex-col'>
          <div className='border-b pb-6 border-gray-300'>
            <div className='flex justify-between mb-3'>
                <h1 className='text-xl md:text-2xl font-medium'>Toàn bộ căn hộ. Chủ nhà Steve</h1>
                <button className='text-2xl text-white w-10 h-10 bg-gray-600 rounded-full'><FontAwesomeIcon icon={faUser} /></button>
            </div>
            <ul className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
              <li className='flex justify-center rounded-xl items-center gap-3 font-medium border px-5 py-5'><FontAwesomeIcon className='text-2xl' icon={faBed} /><span>{data?.giuong} giường đôi</span></li>
              <li className='flex justify-center rounded-xl items-center gap-3 font-medium border px-5 py-5'><FontAwesomeIcon className='text-2xl' icon={faShower} /><span>{data?.phongTam} Phòng tắm</span></li>
              <li className='flex justify-center rounded-xl items-center gap-3 font-medium border px-5 py-5'><FontAwesomeIcon className='text-2xl' icon={faHouseUser} /><span>Gia đình chủ nhà sống tại đây</span></li>
            </ul>
          </div>
          <div className='flex flex-col gap-5 py-6 border-b border-gray-300'>
            <div className='flex items-center gap-5'>
              <FontAwesomeIcon icon={faMedal}  className='text-2xl'/>
              <div>
                <h1 className='text-lg font-medium'>Steve là chủ nhà cao cấp</h1>
                <p className='text-gray-500 text-sm'>Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.</p>
              </div>
            </div>
            <div className='flex items-center gap-5'>
              <FontAwesomeIcon icon={faLocation}  className='text-2xl'/>
              <div>
                <h1 className='text-lg font-medium'>Địa điểm tuyệt vời</h1>
                <p className='text-gray-500 text-sm'>90% khách gần đây đã xếp hạng 5 sao cho vị trí này.</p>
              </div>
            </div>
            <div className='flex items-center gap-5'>
              <FontAwesomeIcon icon={faCalendar}  className='text-2xl'/>
              <div>
                <h1 className='text-lg font-medium'>Miễn phí hủy trong 48 giờ.</h1>
              </div>
            </div>
          </div>
          <div className='py-6' style={{fontSize:16.5}}>
            <img src="../../../img/detail_logo1.png" width={150} alt="anh" />
            <p className='my-4 leading-8'>
              Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ nhà hủy, thông tin nhà/phòng cho thuê không chính xác và những vấn đề khác như sự cố trong quá trình nhận phòng.
            </p>
            <button className='font-medium underline'>Tìm hiểu thêm <FontAwesomeIcon icon={faAngleRight} /></button>
          </div>
          <div className='py-6 border-b border-gray-300' style={{fontSize:16.5}}>
            <h1><FontAwesomeIcon className='mr-3' icon={faLanguage} />Một số thông tin đã được dịch tự động.<span className='font-medium underline'>Hiển thị ngôn ngữ gốc</span></h1>
            <p className='my-4 leading-8'>
              {data?.moTa}
            </p>
            <button className='font-medium underline'>Hiển thị thêm <FontAwesomeIcon icon={faAngleRight} /></button>
          </div>
          <div className='py-6'>
            <h1 className='font-medium text-2xl mb-6'>Nơi này có những gì cho bạn</h1>
            <div className='grid grid-cols-2 gap-7'>
              <div className='flex gap-5 items-center'>
                <FontAwesomeIcon className='text-2xl' icon={faUtensils} />
                <span className={`${data?.bep ? '' : 'line-through'} text-lg`}>Bếp</span>
              </div>
              <div className='flex gap-5 items-center'>
                <FontAwesomeIcon className='text-2xl' icon={faWifi} />
                <span className={`${data?.wifi ? '' : 'line-through'} text-lg`}>Wifi</span>
              </div>
              <div className='flex gap-5 items-center'>
                <FontAwesomeIcon className='text-2xl' icon={faElevator} />
                <span className={`${data?.thangMay ? '' : 'line-through'} text-lg`}>Thang máy</span>
              </div>
              <div className='flex gap-5 items-center'>
                <FontAwesomeIcon className='text-2xl' icon={faTelevision} />
                <span className={`${data?.tivi ? '' : 'line-through'} text-lg`}>TV</span>
              </div>
              <div className='flex gap-5 items-center'>
              <FontAwesomeIcon className='text-2xl' icon={faTemperatureArrowDown} />
                <span className={`${data?.dieuHoa ? '' : 'line-through'} text-lg`}>Điều hòa</span>
              </div>
              <div className='flex gap-5 items-center'>
                <FontAwesomeIcon className='text-2xl' icon={faExplosion} />
                <span className={`${data?.banUi ? '' : 'line-through'} text-lg`}>Bàn ủi</span>
              </div>
              <div className='flex gap-5 items-center'>
                <FontAwesomeIcon className='text-2xl' icon={faSquareParking} />
                <span className={`${data?.doXe ? '' : 'line-through'} text-lg`}>Bãi đỗ xe</span>
              </div>
              <div className='flex gap-5 items-center'>
                <FontAwesomeIcon className='text-2xl' icon={faPersonSwimming} />
                <span className={`${data?.hoBoi ? '' : 'line-through'} text-lg`}>Hồ bơi</span>
              </div>
              <div className='flex gap-5 items-center'>
                <FontAwesomeIcon className='text-2xl' icon={faSoap} />
                <span className={`${data?.matGiat ? '' : 'line-through'} text-lg`}>Máy giặt</span>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:w-1/3 flex justify-center lg:justify-end'>
          <BookingForm data={data}/>
        </div>
      </section>
      {/* Phần đánh giá */}
      <section className='py-6'>
          <div className='text-xl flex gap-5 mb-8'>
            <h1 className='flex items-center gap-2 font-medium'><FontAwesomeIcon icon={faStar} />{(10-data?.giaTien/100).toFixed(2)}.</h1>
            <h1 className='flex items-center gap-2 font-medium'><FontAwesomeIcon icon={faComment} />{data?.giaTien + 5} Đánh giá</h1>
          </div>
          <div className='grid sm:grid-cols-2 gap-5'>
              <div className='flex justify-between mb-3'>
                <h1 className='font-medium'>Mức độ sạch sẽ</h1>
                <div className='flex items-center gap-5'>
                  <div className='bg-black h-1 w-32 rounded-lg'></div>
                  <span className='font-medium text-sm'>10,0</span>
                </div>
              </div>
              <div className='flex justify-between mb-3'>
                <h1 className='font-medium'>Độ chính xác</h1>
                <div className='flex items-center gap-5'>
                  <div className='bg-black h-1 w-32 rounded-lg'></div>
                  <span className='font-medium text-sm'>10,0</span>
                </div>
              </div>
              <div className='flex justify-between mb-3'>
                <h1 className='font-medium'>Giao tiếp</h1>
                <div className='flex items-center gap-5'>
                  <div className='bg-black h-1 w-32 rounded-lg'></div>
                  <span className='font-medium text-sm'>10,0</span>
                </div>
              </div>
              <div className='flex justify-between mb-3'>
                <h1 className='font-medium'>Vị trí</h1>
                <div className='flex items-center gap-5'>
                  <div className='bg-black h-1 w-32 rounded-lg'></div>
                  <span className='font-medium text-sm'>10,0</span>
                </div>
              </div>
              <div className='flex justify-between mb-3'>
                <h1 className='font-medium'>Nhận phòng</h1>
                <div className='flex items-center gap-5'>
                  <div className='bg-black h-1 w-32 rounded-lg'></div>
                  <span className='font-medium text-sm'>10,0</span>
                </div>
              </div>
              <div className='flex justify-between mb-3'>
                <h1 className='font-medium'>Giá trị</h1>
                <div className='flex items-center gap-5'>
                  <div className='bg-black h-1 w-32 rounded-lg'></div>
                  <span className='font-medium text-sm'>10,0</span>
                </div>
              </div>
          </div>
      </section>
      {/* Phần các bình luận */}
      <section className='py-6 grid sm:grid-cols-2 gap-5'>
        {renderCommentSection()}
      </section>
      {/* Nút hiển thị thêm */}
      <div className={`${lstComment?.length <= 4 ? 'hidden' : '' } border-b border-gray-300 pb-5`}>
          <button className='border border-gray-800 py-3 px-8 rounded-md font-medium hover:bg-gray-100 hover:scale-105 duration-300'
            onClick={() => {
              setIsShowMore(!isShowMore)
            }}
          >{isShowMore ? 'Ẩn bớt bình luận' : 'Hiển thị thêm'}</button>
      </div>
      {/* Phần bình luận của bạn */}
      <section className='py-6'>
          <CommentForm/>
      </section>
      <section className='py-6'>
          <h1 className='font-medium text-2xl mb-6'>Những điều bạn cần biết</h1>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
            <ul className='flex flex-col gap-4'>
              <li className='font-medium'>Nội quy nhà</li>
              <li>Nhận phòng: 16:00 – 20:00</li>
              <li>Trả phòng trước 12:00</li>
              <li>Tối đa {data?.khach} khách</li>
            </ul>
            <ul className='flex flex-col gap-4'>
              <li className='font-medium'>An toàn và chỗ ở</li>
              <li>Không có máy phát hiện khí CO</li>
              <li>Không có máy báo khói</li>
              <li>Không phù hợp với trẻ em và em bé</li>
            </ul>
            <ul className='flex flex-col gap-4'>
              <li className='font-medium'>Chính sách hủy</li>
              <li>Hủy miễn phí trước 48 giờ</li>
              <li className='leading-8'>Hãy đọc toàn bộ chính sách hủy của Chủ nhà/Người tổ chức được áp dụng ngay cả khi bạn hủy vì ốm bệnh hoặc gián đoạn do dịch COVID-19.</li>
              <li></li>
            </ul>
          </div>
          <p className='mt-8 text-center font-medium underline'>Tìm hiểu thêm <FontAwesomeIcon icon={faAngleRight} /></p>
      </section>
    </div>
  )
}
