import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addNewUserAction } from '../duck/action';
import { RegisterFormat } from '../../../../types';
import { registerSchema } from '../../../../util/schema';
export default function AddUserForm(props:any) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{
            id: 0,
            name: '',
            email: '',
            password: '',
            phone: '',
            birthday: '',
            gender: true,
            role: 'USER'
        },
        validationSchema:registerSchema,
        onSubmit:(values:RegisterFormat) => {
            dispatch(addNewUserAction(values,resetForm,props.closeModal,props.activePage));
        }
    });
    const resetForm = ():void => {
        formik.setFieldValue('name','');
        formik.setFieldValue('email','');
        formik.setFieldValue('password','');
        formik.setFieldValue('phone','');
        formik.setFieldValue('birthday','');
        formik.setFieldValue('gender',true);
        formik.setFieldValue('role','USER');
    }
    const handleChangeGenderInput = (value:boolean):void => {
        formik.setFieldValue('gender',value)
    }
    const handleChangeRoleInput = (value:string):void => {
        formik.setFieldValue('role',value)
    }
    return (
        <form onSubmit={formik.handleSubmit} className='py-3'>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
                <label className="block mb-2 font-medium text-gray-900">Tên người dùng</label>
                <input name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
                {formik.touched.name && formik.errors.name ? <p className="text-red-600">{formik.errors.name}</p> : ''}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900">Email</label>
                <input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
                {formik.touched.email && formik.errors.email ? <p className="text-red-600">{formik.errors.email}</p> : ''}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900">Số điện thoại</label>
                <input type="text" name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
                {formik.touched.phone && formik.errors.phone ? <p className="text-red-600">{formik.errors.phone}</p> : ''}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900">Mật khẩu</label>
                <input type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
                {formik.touched.password && formik.errors.password ? <p className="text-red-600">{formik.errors.password}</p> : ''}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900">Ngày sinh</label>
                <input type="date" name="birthday" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.birthday} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
                {formik.touched.birthday && formik.errors.birthday ? <p className="text-red-600">{formik.errors.birthday}</p> : ''}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900">Giới tính</label>
                <Select
                  onChange={(value) => handleChangeGenderInput(Boolean(value))}
                  defaultValue="Nam"
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
                  onChange={(value) => handleChangeRoleInput(String(value))}
                  defaultValue="Khách hàng"
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
            <button type="submit" className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300">Đăng ký</button>
        </div>
        <div className='text-center'>
          <p className='text-sm'>Bạn đã có tài khoản ? <NavLink className='text-pink-500 underline hover:text-pink-600' to='/login'>Đăng nhập ngay.</NavLink></p>
        </div>
      </form>
    )
}
