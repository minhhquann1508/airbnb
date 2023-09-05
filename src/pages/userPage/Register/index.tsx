import { NavLink, useNavigate } from "react-router-dom";
import Auth from "../../../HOC/Auth";
import { useFormik } from 'formik'
import { Select } from 'antd';
import { useDispatch } from "react-redux";
import { registerAction } from "./duck/actions";
import { RegisterFormat } from "../../../types";
import { registerSchema } from "../../../util/schema";
const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        dispatch(registerAction(values,resetForm,navigate))
      }
    })
  const resetForm = ():void => {
    formik.setFieldValue('name','');
    formik.setFieldValue('email','');
    formik.setFieldValue('password','');
    formik.setFieldValue('phone','');
    formik.setFieldValue('birthday','');
    formik.setFieldValue('gender',true);
  }
  const handleChangeGenderInput = (value:boolean):void => {
    formik.setFieldValue('gender',value)
  }
  return (
  <div>
      <h1 className='text-3xl text-red-500 font-bold text-center mb-5'>Đăng ký</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
                <label className="block mb-2 font-medium text-gray-900 dark:text-white">Tên người dùng</label>
                <input name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                {formik.touched.name && formik.errors.name ? <p className="text-red-600">{formik.errors.name}</p> : ''}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900 dark:text-white">Email</label>
                <input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                {formik.touched.email && formik.errors.email ? <p className="text-red-600">{formik.errors.email}</p> : ''}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                <input type="text" name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                {formik.touched.phone && formik.errors.phone ? <p className="text-red-600">{formik.errors.phone}</p> : ''}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                <input type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                {formik.touched.password && formik.errors.password ? <p className="text-red-600">{formik.errors.password}</p> : ''}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900 dark:text-white">Ngày sinh</label>
                <input type="date" name="birthday" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.birthday} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                {formik.touched.birthday && formik.errors.birthday ? <p className="text-red-600">{formik.errors.birthday}</p> : ''}
            </div>
            <div>
                <label className="block mb-2 font-medium text-gray-900 dark:text-white">Giới tính</label>
                <Select
                  onChange={(value) => handleChangeGenderInput(Boolean(value))}
                  defaultValue="Nam"
                  className="border p-1.5 bg-gray-50 rounded-xl focus:outline-red-500"
                  bordered={false}
                  style={{ width: '100%' }}
                  options={[
                    { value: true, label: 'Nam' },
                    { value: false, label: 'Nữ' },
                  ]}
                  />
            </div>
        </div>
        <div className='flex justify-end items-center my-5'>
            <button type="submit" className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng ký</button>
        </div>
        <div className='text-center'>
          <p className='text-sm'>Bạn đã có tài khoản ? <NavLink className='text-red-500 underline hover:text-red-600' to='/login'>Đăng nhập ngay.</NavLink></p>
        </div>
      </form>
  </div>
  )
}
export default function Register():JSX.Element {
  return (
    <Auth Component={<RegisterForm/>}/>
  )
}
