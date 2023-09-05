import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateLocationInfomationAction } from "../duck/action";
import { LocationFormat } from "../../../../types";
import { locationSchema } from "../../../../util/schema";

export default function UpdateForm(props:any) {
    const {itemData,closeModal,activePage} = props;
    const dispatch = useDispatch();
    useEffect(() => {
        formik.setFieldValue('id',itemData.id);
        formik.setFieldValue('tenViTri',itemData.tenViTri);
        formik.setFieldValue('tinhThanh',itemData.tinhThanh);
        formik.setFieldValue('quocGia',itemData.quocGia);
        formik.setFieldValue('hinhAnh',itemData.hinhAnh);
    },[itemData])
    const formik = useFormik({
        initialValues:{
            id: itemData.id,
            tenViTri: itemData.tenViTri,
            tinhThanh: itemData.tinhThanh,
            quocGia: itemData.quocGia,
            hinhAnh: itemData.hinhAnh
        },
        validationSchema:locationSchema,
        enableReinitialize:true,
        onSubmit:(values:LocationFormat) => {
            dispatch(updateLocationInfomationAction(values,values.id,closeModal,activePage))
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} className="pt-5">
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                <input type="text" disabled={true} name="id" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.id} className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên vị trí</label>
                <input type="text" name="tenViTri" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tenViTri} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                {formik.touched.tenViTri && formik.errors.tenViTri ? <p className="text-red-600">{formik.errors.tenViTri}</p> : ''}
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên tỉnh thành</label>
                <input type="text" name="tinhThanh" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tinhThanh} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                {formik.touched.tinhThanh && formik.errors.tinhThanh ? <p className="text-red-600">{formik.errors.tinhThanh}</p> : ''}
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quốc gia</label>
                <input type="text" name="quocGia" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.quocGia} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                {formik.touched.quocGia && formik.errors.quocGia ? <p className="text-red-600">{formik.errors.quocGia}</p> : ''}
            </div>
            <div className="text-right">
                <button type="submit" className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cập nhật</button>
            </div>
        </form>
    )
}
