import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {useFormik} from 'formik';
import { uploadAvatar } from "../duck/actions";
export default function UpdateAvatar(props:any) {
    const {closeModal} = props;
    const dispatch = useDispatch();
    const fileRef:any = useRef(null);
    const [imgSrc,setImgSrc] = useState('https://a0.muscache.com/defaults/user_pic-50x50.png?v=3');
    const formik = useFormik({
        initialValues:{
            formFile:null
        },
        onSubmit:(values:any) => {
            if(values.formFile) {
                const formData = new FormData();
                formData.append('formFile',values.formFile,values.formFile.name)
                dispatch(uploadAvatar(formData,closeModal,resetForm));
            }
        }
    })
    const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let file: File | undefined = e.target.files?.[0];
        if(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e:any) => {
                setImgSrc(e.target.result)
            }
            formik.setFieldValue('formFile',file)
        }
    }
    const resetForm = ():void => {
        formik.setFieldValue('formFile',null);
        setImgSrc('https://a0.muscache.com/defaults/user_pic-50x50.png?v=3');
        fileRef.current.value = ''
    }
    return (
        <div className="pt-5">
            <form onSubmit={formik.handleSubmit}>
                <div className="flex justify-between h-40">
                    <input ref={fileRef} type="file" accept=".jpg, .jpeg, .png" name="formFile" onChange={handleChangeFileInput}/>
                    <img src={imgSrc} className="h-20 w-20 object-cover border border-gray-500 shadow rounded-full" alt="avatar" />
                </div>
                <div className='flex justify-end'>
                    <button type="submit" className="bg-pink-600 hover:bg-pink-700 duration-300 p-2 text-white font-medium rounded-md hover:scale-105">Cập nhật</button>
                </div>
            </form>
            
        </div>
    )
}
