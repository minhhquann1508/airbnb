import { NavLink, useNavigate } from 'react-router-dom'
import Auth from '../../../HOC/Auth'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { loginAction } from './duck/actions'
import { loginSchema } from '../../../util/schema'
const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:loginSchema,
        onSubmit:(values) => {
            dispatch(loginAction(values,navigate,resetForm))
        }
    })
    const resetForm = () => {
        formik.setFieldValue('email','');
        formik.setFieldValue('password','');
    }
    return (
    <div>
        <h1 className='text-3xl text-pink-600 font-bold text-center mb-5'>Đăng nhập</h1>
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-900">Email</label>
                <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
                {formik.touched.email && formik.errors.email ? <p className='text-red-600'>{formik.errors.email}</p> : ''}
            </div>
            <div className="mb-8">
                <label className="block mb-2 font-medium text-gray-900">Mật khẩu</label>
                <input name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-pink-500 block w-full p-2.5" />
                {formik.touched.password && formik.errors.password ? <p className='text-red-600'>{formik.errors.password}</p> : ''}
            </div>
            <div className='flex justify-between items-center mb-5'>
                <a className='text-pink-500 cursor-pointer font-medium hover:underline'>Quên mật khẩu</a>
                <button type="submit" className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300">Đăng nhập</button>
            </div>
            <div className='text-center'>
                <p className='text-sm'>Bạn chưa có tài khoản ? <NavLink className='text-pink-500 underline hover:text-pink-600' to='/register'>Đăng ký ngay.</NavLink></p>
            </div>
        </form>
    </div>
    )
}

export default function Login():JSX.Element {
  return (
    <Auth Component={<LoginForm/>}/>
  )
}
