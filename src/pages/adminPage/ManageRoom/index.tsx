import { faEdit, faGear, faImage, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { avatarUserError } from "../../../util/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteRoomAction, fetchData } from "./duck/action";
import { RootState } from "../../../redux/store";
import { RoomFormat } from "../../../types";
import { Modal, Pagination } from "antd";
import AddRoomForm from "./AddRoomForm";
import Swal from "sweetalert2";
import UpdateForm from "./UpdateForm";
import UpdateAvatarForm from "./UpdateAvatarForm";
export default function ManageRoom() {
  const dispatch = useDispatch();
  const [activePage,setActivepage] = useState<number>(1);
  const [activeItem,setActiveItem] = useState<RoomFormat | null>(null);
  const {loading,data,error} = useSelector((state:RootState) => state.manageRoomAdminReducer);
  useEffect(() => {
    dispatch(fetchData('',activePage));
  },[activePage]);

  const deleteRoom = (id:number,activePage:number) => {
    Swal.fire({
        title:'Bạn chắc chứ',
        icon:'question',
        text: 'Bạn chắc chắn muốn xóa phòng này chứ?',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        confirmButtonColor:'#db2777',
        cancelButtonText: `Hủy`,
        reverseButtons:true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(deleteRoomAction(id,activePage));
        } 
      })
  }

  // Mở modal update thông tin phòng
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const showUpdateModal = (item:RoomFormat) => {
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
    return data?.data.map((room:RoomFormat) => {
        return (
            <tr key={room.id} className="bg-white border-b">
                <th className="px-6 py-4">
                    {room.id}
                </th>
                <th className="px-6 py-4">
                    {room.tenPhong}
                </th>
                <td className="px-6 py-4 text-center">
                    {room.giaTien} $
                </td>
                <td className="px-6 py-4">
                    <img src={room.hinhAnh} onError={(e:any) => e.target.src = avatarUserError} className="h-20 object-cover" alt="avatar" />
                </td>
                <td className="px-6 py-4 flex gap-2 flex-wrap">
                    <button className="px-2 py-1 rounded-md bg-green-600 hover:bg-green-700 hover:scale-105 duration-300"
                      onClick={() => showUpdateModal(room)}
                    >
                      <FontAwesomeIcon className="text-white" icon={faEdit}/>
                    </button>
                    <button className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 hover:scale-105 duration-300"
                        onClick={() => deleteRoom(room.id,activePage)}
                    ><FontAwesomeIcon className="text-white" icon={faTrash}/></button>
                     <button className="px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 hover:scale-105 duration-300"
                        onClick={() => showAddAvatarModal(room)}
                    ><FontAwesomeIcon className="text-white" icon={faImage}/></button>
                </td>
            </tr>
        )
    })
  }

  // Mở modal add phòng
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

  // Mở modal add avatar phòng
  const [isAddAvatarModalOpen, setIsAddAvatarModalOpen] = useState<boolean>(false);
  const showAddAvatarModal = (room:RoomFormat) => {
    setActiveItem(room);
    setIsAddAvatarModalOpen(true);
  };
    
  const handleAddAvatarModalOk = () => {
    setIsAddAvatarModalOpen(false);
  };
    
  const handleAddAvatarModalCancel = () => {
    setIsAddAvatarModalOpen(false);
  };

  return (
      <>
        <Modal footer="" title="Thêm phòng mới" open={isAddModalOpen} onOk={handleAddModalOk} onCancel={handleAddModalCancel}>
            <AddRoomForm closeModal={handleAddModalCancel} activePage={activePage}/>
        </Modal>
        <Modal footer="" title="Cập nhật avatar" open={isAddAvatarModalOpen} onOk={handleAddAvatarModalOk} onCancel={handleAddAvatarModalCancel}>
            <UpdateAvatarForm itemId={activeItem?.id} closeModal={handleAddAvatarModalOk} activePage={activePage}/>
        </Modal>
        <Modal footer="" title="Cập nhật thông tin" open={isUpdateModalOpen} onOk={handleUpdateModalOk} onCancel={handleUpdateModalCancel}>
            <UpdateForm itemData={activeItem} closeModal={handleUpdateModalOk} activePage={activePage}/>
        </Modal>
        <h1 className="text-2xl font-medium mb-5">Quản lý phòng</h1>
        <div className="flex flex-col md:justify-end md:flex-row gap-3 mb-5">
            <form>
                <input type="text" name="keyword" placeholder="Tìm kiếm..." className="border bg-gray-50 border-r-0 p-2 rounded-l-lg focus:outline-none"/>
                <button className="p-2 text-white font-medium rounded-r-lg bg-pink-600 border border-pink-600 hover:bg-pink-700 duration-300"><FontAwesomeIcon icon={faSearch}/></button>
            </form>
            <button className="w-fit p-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 duration-300" onClick={showAddModal}>Thêm phòng mới</button>
        </div>
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Mã phòng
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Tên phòng
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Giá thành
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
            <Pagination pageSize={20} current={activePage} showSizeChanger={false} total={data?.totalRow} onChange={(value) => setActivepage(value)}/>
        </div>
      </>
  )
}
