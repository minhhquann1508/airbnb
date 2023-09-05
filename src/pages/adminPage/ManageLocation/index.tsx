import { faEdit, faGear, faImage, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Pagination } from 'antd'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteLocationAction, fetchData } from './duck/action';
import { RootState } from '../../../redux/store';
import { avatarUserError } from '../../../util/constants';
import { LocationFormat } from '../../../types';
import Swal from 'sweetalert2';
import AddLocationForm from './AddLocationForm';
import AddAvatarForm from './AddAvatarForm';
import UpdateForm from './UpdateForm';
export default function ManageLocation() {
  const dispatch = useDispatch();
  const [activePage,setActivepage] = useState<number>(1);
  const [activeItem,setActiveItem] = useState<LocationFormat | null>(null);
  const [activeId,setActiveId] = useState<number>(0);
  const {loading,data,error} = useSelector((state:RootState) => state.manageLocationAdminReducer);

  // Mở modal add vị trí
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const showAddModal = () => {
    setIsAddModalOpen(true);
  };
    
  const handleAddModalOk = () => {
    setIsAddModalOpen(false);
  };
    
  const handleAddModalCancel = () => {
    setIsAddModalOpen(false);
  };

  // Mở modal add avatar vị trí
  const [isAddAvatarModalOpen, setIsAddAvatarModalOpen] = useState<boolean>(false);
  const showAddAvatarModal = (id:number) => {
    setActiveId(id);
    setIsAddAvatarModalOpen(true);
  };
    
  const handleAddAvatarModalOk = () => {
    setIsAddAvatarModalOpen(false);
  };
    
  const handleAddAvatarModalCancel = () => {
    setIsAddAvatarModalOpen(false);
  };

  // Mở modal update thông tin vị trí
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const showUpdateModal = (item:LocationFormat) => {
    setActiveItem(item)
    setIsUpdateModalOpen(true);
  };
    
  const handleUpdateModalOk = () => {
    setIsUpdateModalOpen(false);
  };
    
  const handleUpdateModalCancel = () => {
    setIsUpdateModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchData('',activePage));
  },[activePage])

  const handleDeleteUserEvent = (id:number,activePage:number) => {
    Swal.fire({
        title:'Bạn chắc chứ',
        icon:'question',
        text: 'Bạn chắc chắn muốn xóa vị trí này chứ?',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        confirmButtonColor:'#db2777',
        cancelButtonText: `Hủy`,
        reverseButtons:true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(deleteLocationAction(id,activePage));
        } 
      })
}

  const renderTableContent = ():JSX.Element => {
    return data?.data.map((item:LocationFormat) => {
        return (
            <tr key={item.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th className="px-6 py-4">
                    {item.id}
                </th>
                <th className="px-6 py-4">
                    {item.tenViTri}
                </th>
                <td className="px-6 py-4">
                    {item.tinhThanh}
                </td>
                <td className="px-6 py-4">
                    {item.quocGia}
                </td>
                <td className="px-6 py-4">
                    <img src={item.hinhAnh} onError={(e:any) => e.target.src = avatarUserError} className="w-20 h-20" alt="avatar" />
                </td>
                <td className="px-6 py-4 flex gap-2 flex-wrap">
                    <button className="px-2 py-1 rounded-md bg-green-600 hover:bg-green-700 hover:scale-105 duration-300"
                      onClick={() => showUpdateModal(item)}
                    >
                      <FontAwesomeIcon className="text-white" icon={faEdit}/>
                    </button>
                    <button className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 hover:scale-105 duration-300"
                        onClick={() => handleDeleteUserEvent(item.id,activePage)}
                    ><FontAwesomeIcon className="text-white" icon={faTrash}/></button>
                     <button className="px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 hover:scale-105 duration-300"
                        onClick={() => showAddAvatarModal(item.id)}
                    ><FontAwesomeIcon className="text-white" icon={faImage}/></button>
                </td>
            </tr>
        )
    })
}

  return (
    <>
      <Modal footer="" title="Thêm vị trí mới" open={isAddModalOpen} onOk={handleAddModalOk} onCancel={handleAddModalCancel}>
          <AddLocationForm closeModal={handleAddModalCancel} activePage={activePage}/>
      </Modal>
      <Modal footer="" title="Cập nhật avatar" open={isAddAvatarModalOpen} onOk={handleAddAvatarModalOk} onCancel={handleAddAvatarModalCancel}>
          <AddAvatarForm itemId={activeId} closeModal={handleAddAvatarModalOk} activePage={activePage}/>
      </Modal>
      <Modal footer="" title="Cập nhật avatar" open={isUpdateModalOpen} onOk={handleUpdateModalOk} onCancel={handleUpdateModalCancel}>
          <UpdateForm itemData={activeItem} closeModal={handleUpdateModalOk} activePage={activePage}/>
      </Modal>
      <h1 className="text-2xl font-medium mb-5">Quản lý vị trí</h1>
      <div className="flex  flex-col md:justify-end md:flex-row gap-3 mb-5">
          <form>
              <input type="text" name="keyword" placeholder="Tìm kiếm..." className="border bg-gray-50 border-r-0 p-2 rounded-l-lg focus:outline-none"/>
              <button className="p-2 text-white font-medium rounded-r-lg bg-pink-600 border border-pink-600 hover:bg-pink-700 duration-300"><FontAwesomeIcon icon={faSearch}/></button>
          </form>
          <button className="w-fit p-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 duration-300" onClick={showAddModal}>Thêm vị trí mới</button>
      </div>
      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Tên vị trí
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Tỉnh thành
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Quốc gia
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Hình ảnh
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
          <Pagination pageSize={8} current={activePage} showSizeChanger={false} total={data?.totalRow} onChange={(value) => setActivepage(value)}/>
      </div>
    </>
  )
}
