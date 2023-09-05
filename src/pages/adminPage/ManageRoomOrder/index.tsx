import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrderAction, fetchData } from './duck/action';
import { RootState } from '../../../redux/store';
import { Modal, Pagination } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faGear, faImage, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import UpdateForm from './UpdateForm';
import { JourneyItem } from '../../../types';
export default function ManageRoomOrder() {
  const dispatch = useDispatch();
  const [itemPerPage] = useState<number>(20);
  const [pageActive,setPageActive] = useState<number>(1);
  const [activeItem,setActiveItem] = useState(null);
  const {loading,data,error} = useSelector((state:RootState) => state.manageRoomOrderAdminReducer);
  useEffect(() => {
    dispatch(fetchData());
  },[])
  
  const handleDeleteUserEvent = (id:number) => {
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
          dispatch(deleteOrderAction(id));
        } 
    })
  }

  // Mở modal update thông tin vị trí
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const showUpdateModal = (item:any) => {
    setActiveItem(item)
    setIsUpdateModalOpen(true);
  };
    
  const handleUpdateModalOk = () => {
    setIsUpdateModalOpen(false);
  };
    
  const handleUpdateModalCancel = () => {
    setIsUpdateModalOpen(false);
  };

  const renderTableContent = ():JSX.Element => {
    return data?.slice((pageActive * itemPerPage - (itemPerPage - 1)) - 1,pageActive * itemPerPage - 1).map((item:JourneyItem) => {
        return (
            <tr key={item.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th className="px-6 py-4">
                    {item.id}
                </th>
                <th className="px-6 py-4">
                    {item.maPhong}
                </th>
                <td className="px-6 py-4">
                    {dayjs(item.ngayDen).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4">
                  {dayjs(item.ngayDi).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4">
                    {item.soLuongKhach}
                </td>
                <td className="px-6 py-4 flex gap-2 flex-wrap">
                    <button className="px-2 py-1 rounded-md bg-green-600 hover:bg-green-700 hover:scale-105 duration-300"
                      onClick={() => showUpdateModal(item)}
                    >
                      <FontAwesomeIcon className="text-white" icon={faEdit}/>
                    </button>
                    <button className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 hover:scale-105 duration-300"
                        onClick={() => handleDeleteUserEvent(item.id)}
                    ><FontAwesomeIcon className="text-white" icon={faTrash}/></button>
                </td>
            </tr>
        )
    })
}



  return (
    <>
      <Modal footer="" title="Cập nhật avatar" open={isUpdateModalOpen} onOk={handleUpdateModalOk} onCancel={handleUpdateModalCancel}>
          <UpdateForm itemData={activeItem} closeModal={handleUpdateModalOk}/>
      </Modal>
      <h1 className="text-2xl font-medium mb-5">Quản lý đặt phòng</h1>
      <div className="flex  flex-col md:justify-end md:flex-row gap-3 mb-5">
          <form>
              <input type="text" name="keyword" placeholder="Tìm kiếm..." className="border bg-gray-50 border-r-0 p-2 rounded-l-lg focus:outline-none"/>
              <button className="p-2 text-white font-medium rounded-r-lg bg-pink-600 border border-pink-600 hover:bg-pink-700 duration-300"><FontAwesomeIcon icon={faSearch}/></button>
          </form>
      </div>
      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Mã phòng
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Ngày đến
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Ngày đi
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Số lượng khách
                  </th>
                  <th scope="col" className="px-6 py-3">
                      <FontAwesomeIcon icon={faGear}/>
                  </th>
              </tr>
              </thead>
              <tbody>
                {renderTableContent()}
              </tbody>
          </table>
      </div>
      <div className="flex justify-center mt-5">
        <Pagination pageSize={20} current={pageActive} showSizeChanger={false} total={data?.length} onChange={(value) => setPageActive(value)}/>
      </div>
    </>
  )
}
