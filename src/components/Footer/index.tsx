import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
export default function Footer():JSX.Element {
  return (
    <footer className="p-6 border bg-gray-200">
      <div className="container grid pb-8 grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Hỗ trợ</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <a className='text-sm hover:underline' href="#">Trung tâm hỗ trợ</a>
            <a className='text-sm hover:underline' href="#">AirCover</a>
            <a className='text-sm hover:underline' href="#">Thông tin an toàn</a>
            <a className='text-sm hover:underline' href="#">Hỗ trợ người khuyết tật</a>
            <a className='text-sm hover:underline' href="#">Các tùy chọn hủy</a>
            <a className='text-sm hover:underline' href="#">Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</a>
            <a className='text-sm hover:underline' href="#">Báo cáo lo ngại của hàng xóm</a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Cộng đồng</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <a className='text-sm hover:underline' href="#">Airbnb.org: nhà ở cứu trợ</a>
            <a className='text-sm hover:underline' href="#">Hỗ trợ dân tị nạn Afghanistan</a>
            <a className='text-sm hover:underline' href="#">Chống phân biệt đối xử</a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Đón tiếp khách</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <a className='text-sm hover:underline' href="#">Thử đón tiếp khách</a>
            <a className='text-sm hover:underline' href="#">AirCover cho Chủ nhà</a>
            <a className='text-sm hover:underline' href="#">Xem tài nguyên đón tiếp khách</a>
            <a className='text-sm hover:underline' href="#">Truy cập diễn đàn cộng đồng</a>
            <a className='text-sm hover:underline' href="#">Đón tiếp khách có trách nhiệm</a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Airbnb</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <a className='text-sm hover:underline' href="#">Trang tin tức</a>
            <a className='text-sm hover:underline' href="#">Tìm hiểu các tính năng mới</a>
            <a className='text-sm hover:underline' href="#">Thư ngỏ từ các nhà sáng lập</a>
            <a className='text-sm hover:underline' href="#">Cơ hội nghề nghiệp</a>
            <a className='text-sm hover:underline' href="#">Nhà đầu tư</a>
          </div>
        </div>
      </div>
      <div className='hidden md:flex justify-between bg-white border py-2 px-5 fixed z-40 left-0 w-full bottom-0'>
        <ul className='flex gap-2'>
          <li className='text-gray-500 text-sm'>© 2022 Airbnb, Inc</li>
          <li className='text-gray-500 text-sm'>Quyền riêng tư</li>
          <li className='text-gray-500 text-sm'>Điều khoản</li>
          <li className='text-gray-500 text-sm'>Sơ đồ trang web</li>
        </ul>
        <ul className='flex gap-3'>
          <li className='text-gray-500 text-sm'><FontAwesomeIcon icon={faEarthAsia} /> Tiếng việt (VN)</li>
          <li className='text-gray-500 text-sm'>$USD</li>
          <li className='text-gray-500 text-sm'>Hỗ trợ tài nguyên</li>
        </ul>
      </div>
    </footer>
  )
}
