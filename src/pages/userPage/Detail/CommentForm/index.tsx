import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { CommentFormat } from "../../../../types";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { addNewCommentAction } from "../duck/actions";
export default function CommentForm() {
  const {id} = useParams();
  const {userLogin} = useSelector((state:RootState) => state.loginReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues:{
      id: 0,
      maPhong: Number(id),
      maNguoiBinhLuan: userLogin?.user.id || 0,
      ngayBinhLuan: dayjs(new Date().getTime()).format('DD/MM/YYYY'),
      noiDung: '',
      saoBinhLuan: 5
    },
    onSubmit:(values:CommentFormat) => {
      dispatch(addNewCommentAction(values,Number(id)))
    }
  })
  return (
    <div>
        <h1 className="text-2xl font-medium flex items-center gap-3 mb-5"><span>Đánh giá của bạn</span> <FontAwesomeIcon icon={faComment} /></h1>
        <form onSubmit={formik.handleSubmit}>
            <textarea name="noiDung" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Hãy viết gì đó nhé !" className="border border-gray-400 rounded-lg w-full p-3 resize-none" cols={30} rows={10}></textarea>
            <div className="text-right">
                <button type="submit" className="bg-pink-600 hover:bg-pink-700 hover:scale-105 duration-300 py-2 px-5 text-white font-medium rounded-md">Gửi</button>
            </div>
        </form>
    </div>
  )
}
