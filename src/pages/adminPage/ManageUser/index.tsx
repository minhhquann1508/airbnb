import { faAngleLeft, faAngleRight, faEdit, faGear, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { deleteUserAction, fetchData } from "./duck/action";
import { UserFormat } from "../../../types";
import { avatarUserError } from "../../../util/constants";
import Swal from "sweetalert2";
import { Modal, Pagination } from "antd";
import { useFormik } from "formik";
import AddUserForm from "./AddUserForm";
import UpdateUserForm from "./UpdateUserForm";
export default function ManageUser():JSX.Element {
    const dispatch = useDispatch();
    const [activeItem,setActiveItem] = useState<UserFormat | null>(null);
    // Xử lý mở đóng modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //Xử lí mở modal upadte
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const showUpdateModal = (item:UserFormat) => {
        setActiveItem(item);
        setIsUpdateModalOpen(true);
    };
    
    const handleUpdateOk = () => {
        setIsUpdateModalOpen(false);
    };
    
    const handleUpdateCancel = () => {
        setIsUpdateModalOpen(false);
    };

    const [activePage,setActivePage] = useState<number>(1);
    const [isKeyword,setIsKeyword] = useState<string>('');
    const {loading,data,error} = useSelector((state:RootState) => state.manageUserReducer);
    const formik = useFormik({
        initialValues:{
            keyword:''
        },
        onSubmit:(values) => {
            setIsKeyword(values.keyword);
        }
    })
    useEffect(() => {
        dispatch(fetchData(isKeyword,activePage))
    },[activePage,isKeyword]);

    const handleDeleteUserEvent = (id:number,activePage:number) => {
        Swal.fire({
            title:'Bạn chắc chứ',
            icon:'question',
            text: 'Bạn chắc chắn muốn xóa người dùng này chứ?',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            confirmButtonColor:'#db2777',
            cancelButtonText: `Hủy`,
            reverseButtons:true
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              dispatch(deleteUserAction(id,activePage));
            } 
          })
    }

    const handleChangeInput = (e:any) => {
        let value = e.target.value;
        formik.setFieldValue('keyword',value);
        setIsKeyword(value);
    }

    const renderTableContent = ():JSX.Element => {
        return data?.data.map((user:UserFormat) => {
            return (
                <tr key={user.id} className="bg-white border-b">
                    <th className="px-6 py-4">
                        {user.id}
                    </th>
                    <td className="px-6 py-4">
                        {user.name}
                    </td>
                    <td className="px-6 py-4">
                        {user.email}
                    </td>
                    <td className="px-6 py-4">
                        <img src={user.avatar} onError={(e:any) => e.target.src = avatarUserError} className="w-10 h-10 rounded-full" alt="avatar" />
                    </td>
                    <td className="px-6 py-4 flex gap-2 flex-wrap">
                        <button className="px-2 py-1 rounded-md bg-green-600 hover:bg-green-700 hover:scale-105 duration-300"
                            onClick={() => showUpdateModal(user)}
                        ><FontAwesomeIcon className="text-white" icon={faEdit}/></button>
                        <button className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 hover:scale-105 duration-300"
                            onClick={() => handleDeleteUserEvent(user.id,activePage)}
                        ><FontAwesomeIcon className="text-white" icon={faTrash}/></button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <Modal footer="" title="Thêm tài khoản" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
               <AddUserForm closeModal={handleCancel} activePage={activePage}/>
            </Modal>
            <Modal footer="" title="Cập nhật tài khoản" open={isUpdateModalOpen} onOk={handleUpdateOk} onCancel={handleUpdateCancel}>
               <UpdateUserForm itemData={activeItem} closeModal={handleUpdateCancel} activePage={activePage}/>
            </Modal>
            <h1 className="text-2xl font-medium mb-5">Quản lý người dùng</h1>
            <div className="flex  flex-col md:justify-end md:flex-row gap-3 mb-5">
                <form onSubmit={formik.handleSubmit}>
                    <input type="text" name="keyword" onChange={(e) => handleChangeInput(e)} placeholder="Tìm kiếm theo tên..." className="border bg-gray-50 border-r-0 p-2 rounded-l-lg focus:outline-none"/>
                    <button className="p-2 text-white font-medium rounded-r-lg bg-pink-600 border border-pink-600 hover:bg-pink-700 duration-300"><FontAwesomeIcon icon={faSearch}/></button>
                </form>
                <button className="w-fit p-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 duration-300" onClick={showModal}>Thêm tài khoản</button>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tên người dùng
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ảnh đại diện
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
                <Pagination pageSize={20} current={activePage} showSizeChanger={false} total={data?.totalRow} onChange={(value) => setActivePage(value)}/>
            </div>
        </>
        
    )
}
