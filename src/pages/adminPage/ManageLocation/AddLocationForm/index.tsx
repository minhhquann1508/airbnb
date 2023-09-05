import { useFormik } from "formik"
import { useDispatch } from "react-redux";
import { addNewLocationAction } from "../duck/action";

export default function AddLocationForm(props:any) {
    const dispatch = useDispatch();
    const {activePage,closeModal} = props;
    const formik = useFormik({
        initialValues:{
            id: 0,
            tenViTri: "",
            tinhThanh: "",
            quocGia: "",
            hinhAnh: ""
        },
        onSubmit:(values,{resetForm}) => {
            dispatch(addNewLocationAction(values,activePage,resetForm,closeModal));
        }
    });
    return (
        <form onSubmit={formik.handleSubmit} className="pt-5">
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Tên vị trí</label>
                <input name="tenViTri" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tenViTri} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Tên tỉnh thành</label>
                <input name="tinhThanh" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tinhThanh} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Tên quốc gia</label>
                <input name="quocGia" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.quocGia} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </div>
            <div className="text-right">
                <button type="submit" className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center duration-300">Thêm</button>
            </div>
        </form>
    )
}
