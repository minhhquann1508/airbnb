import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {useFormik} from 'formik'
import { updateInfoAction } from "../duck/actions";
import { useParams } from "react-router-dom";
export default function UpdateForm(props:any):JSX.Element {
  const dispatch = useDispatch();
  const {id} = useParams();
  const {data} = useSelector((state:RootState) => state.infomationReducer);
  const {closeModal} = props;
  const formik = useFormik({
    initialValues:{
      id: data?.id || 0,
      name: data?.name || '',
      email: data?.email || '',
      phone: data?.phone || '',
      birthday: data?.birthday || '',
      gender: data?.gender,
      role: data?.role || 'USER'
    },
    enableReinitialize:true,
    onSubmit:(values) => {
      dispatch(updateInfoAction(Number(id),values,closeModal))
    }
  })
  const handleChange = (value: string) => {
    formik.setFieldValue('gender',Boolean(value))
  };
  return (
    <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-5 mt-5">
      <div>
        <h1 className="mb-1 font-medium">Tên người dùng</h1>
        <input name="name" onChange={formik.handleChange} value={formik.values.name} className="border w-full p-2 rounded-md shadow focus:outline-red-500" type="text" />
      </div>
      <div>
        <h1 className="mb-1 font-medium">Email</h1>
        <input name="email" disabled={true} onChange={formik.handleChange} value={formik.values.email} className="border w-full p-2 rounded-md shadow focus:outline-red-500" type="email" />
      </div>
      <div>
        <h1 className="mb-1 font-medium">Giới tính</h1>
        <Select
          className="p-0 border border-gray-200 rounded-md shadow"
          defaultValue={formik.values.gender ? 'Nam' : 'Nữ'}
          style={{ width: '100%'}}
          bordered={false}
          size="large"
          onChange={handleChange}
          options={[
            { value:true, label: 'Nam' },
            { value: false, label: 'Nữ' },
          ]}
      />
      </div>
      <div>
        <h1 className="mb-1 font-medium">Ngày sinh</h1>
        <input name="birthday" onChange={formik.handleChange} value={formik.values.birthday} className="border w-full p-2 rounded-md shadow focus:outline-red-500" type="date" />
      </div>
      <div className="col-span-full">
        <h1 className="mb-1 font-medium">Số điện thoại</h1>
        <input name="phone" onChange={formik.handleChange} value={formik.values.phone} className="border w-full p-2 rounded-md shadow focus:outline-red-500" type="text" />
      </div>
      <div className="col-span-full text-right">
        <button type="submit" className="bg-pink-600 hover:bg-pink-700 duration-300 p-2 text-white font-medium rounded-md">Cập nhật thông tin</button>
      </div>
    </form>
  )
}
