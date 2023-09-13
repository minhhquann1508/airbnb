import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateUserAction } from "../duck/action";
import { UserFormat } from "../../../../types";

export default function UpdateUserForm(props:any):JSX.Element {
  const dispatch = useDispatch();
  const {itemData,closeModal,activePage} = props;
  const formik = useFormik({
    initialValues:{
      id: itemData.id || 0,
      name: itemData.name || '',
      email: itemData.email || '',
      phone: itemData.phone || '',
      birthday: itemData.birthday || '',
      gender: itemData.gender || true,
      role: itemData.role || 'user'
    },
    enableReinitialize:true,
    onSubmit:(values) => {
      dispatch(updateUserAction(values.id,values,closeModal,activePage))
    }
  })
  useEffect(() => {
    for(let key in itemData) {
      formik.setFieldValue(key,itemData[key]);
    }
  },[itemData])
  return (
    <form onSubmit={formik.handleSubmit} className='py-3'>
        <div className="grid sm:grid-cols-2 gap-5">
            <div>
                <label className="block mb-2 font-medium text-gray-900">Tên người dùng</label>
                <input name="id" disabled={true} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.id} type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
                {/* {formik.touched.name && formik.errors.name ? <p className="text-red-600">{formik.errors.name}</p> : ''} */}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900">Tên người dùng</label>
                <input name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
                {/* {formik.touched.name && formik.errors.name ? <p className="text-red-600">{formik.errors.name}</p> : ''} */}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900">Email</label>
                <input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
                {/* {formik.touched.email && formik.errors.email ? <p className="text-red-600">{formik.errors.email}</p> : ''} */}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900">Số điện thoại</label>
                <input type="text" name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
                {/* {formik.touched.phone && formik.errors.phone ? <p className="text-red-600">{formik.errors.phone}</p> : ''} */}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900">Ngày sinh</label>
                <input type="text" name="birthday" onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={true} value={formik.values.birthday} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900">Giới tính</label>
                <Select
                  // onChange={(value) => handleChangeGenderInput(Boolean(value))}
                  defaultValue={formik.values.gender ? 'Nam' : 'Nữ'}
                  className="border p-1.5 bg-gray-50 rounded-xl focus:outline-pink-500"
                  bordered={false}
                  style={{ width: '100%' }}
                  options={[
                    { value: true, label: 'Nam' },
                    { value: false, label: 'Nữ' },
                  ]}
                  />
            </div>
            <div className='col-span-full'>
                <label className="block mb-2 font-medium text-gray-900">Loại người dùng</label>
                <Select
                  // onChange={(value) => handleChangeRoleInput(String(value))}
                  defaultValue={formik.values.role.toLowerCase() === 'user' ? 'Khách hàng' : 'Quản trị'}
                  className="border p-1.5 bg-gray-50 rounded-xl focus:outline-pink-500"
                  bordered={false}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'USER', label: 'Khách hàng' },
                    { value: 'ADMIN', label: 'Quản trị' },
                  ]}
                  />
            </div>
        </div>
        <div className='flex justify-end items-center my-5'>
            <button type="submit" className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300">Cập nhật</button>
        </div>
      </form>
  )
}
