import { useFormik } from 'formik';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { uploadAvatarAction } from '../duck/action';
import Swal from 'sweetalert2';
export default function AddAvatarForm(props:any) {
    const dispatch = useDispatch();
    const {itemId,closeModal,activePage} = props;
    const [imgSrc,setImgSrc] = useState('https://a0.muscache.com/defaults/user_pic-50x50.png?v=3');
    const fileRef:any = useRef(null);
    const formik = useFormik({
      initialValues:{
          formFile:null
      },
      onSubmit:(values:any) => {
          if(values.formFile) {
              const formData = new FormData();
              formData.append('formFile',values.formFile,values.formFile.name)
              dispatch(uploadAvatarAction(itemId,formData,resetForm,closeModal,activePage));
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops..!',
              text: 'Bạn chưa chọn ảnh để upload',
            })
          }
      }
    })
    const handleChangeFileInput = (e:any) => {
      const file:File | undefined = e.target.files[0];
      if(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e:any) => {
          setImgSrc(e.target.result);
        } 
        formik.setFieldValue('formFile',file);
      }
    }

    const resetForm = ():void => {
      formik.setFieldValue('formFile',null);
      setImgSrc('https://a0.muscache.com/defaults/user_pic-50x50.png?v=3');
      fileRef.current.value = ''
    }
    return (
      <form onSubmit={formik.handleSubmit} className='pt-5'>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">ID</label>
            <input type="text" disabled={true} value={props.itemId} className='border p-2 w-full rounded-lg'/>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">Chọn file ảnh</label>
            <input ref={fileRef} type="file" accept=".jpg, .jpeg, .png" name='formFile' onChange={handleChangeFileInput}/>
          </div>
          <div className='mb-6'>
            <img src={imgSrc} alt="anh" width={150} height={150}/>
          </div>
          <div className='text-right'>
            <button type="submit" className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Thêm</button>
          </div>
      </form>
    )
}
