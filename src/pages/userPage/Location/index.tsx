import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "./duck/action";
import { errorImgLocation } from "../../../util/constants";
import { Pagination, Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
export default function LocationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      keyword:''
    },
    onSubmit:(values) => {
      if(values.keyword.trim() === '') {
        navigate(`/location/all`)
      }
      else {
        navigate(`/location/${values.keyword}`)
      } 
    }
  })
  const {keyword} = useParams();
  const [activePage,setActivePage] = useState(1);
  const {loading,data,error} = useSelector((state:RootState) => state.locationCategoryReducer);
  useEffect(() => {
    dispatch(fetchData(String(keyword),activePage));
  },[keyword,activePage]);
  const totalPage = data?.totalRow / data?.pageSize > 1 ? Math.round(data?.totalRow / data?.pageSize) + 1 : 1;

  const renderLocationItem = ():JSX.Element => {
    if(loading) {
      return (
        <>
          {
            new Array(8).fill(null).map((_,index) => {
              return (
                <Skeleton key={index}/>
              )
            })
          }
        </>
      )
    }
    else {
      return data?.data.map((item:any,index:number) => {
        return (
          <div key={index} className="p-3 hover:shadow-xl rounded-lg duration-500 cursor-pointer" onClick={() => navigate(`/finding/${item.id}`)}>
            <div className="flex justify-center">
              <img className="rounded-lg object-cover w-32 h-32" onError={(e:any) => e.target.src = errorImgLocation} src={item.hinhAnh} alt="anh" />
            </div>
            <div className="mt-3 text-center">
              <h1 className="font-medium text-lg mb-1">{item.tenViTri}</h1>
              <p className="text-gray-600">{item.tinhThanh}, {item.quocGia}</p>
            </div>
          </div>
        )
      })
    }
  }
  return (
    <section className="container mx-auto py-10 px-5 md:px-0">
      <div className="flex justify-between flex-col gap-3 md:flex-row mb-5 md:mb-10">
        <h1 className="font-medium text-2xl md:text-3xl">Danh sách điểm đến</h1>
        <form onSubmit={formik.handleSubmit} className="border rounded-full relative overflow-hidden p-3 bg-gray-50 hover:bg-gray-200">
          <input type="text" name="keyword" onChange={formik.handleChange} className="font-medium focus:outline-none bg-transparent" placeholder="Tìm kiếm địa điểm"/>
          <button type="submit" className="absolute right-1 top-1 p-3 text-white w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center"><FontAwesomeIcon icon={faSearch}/></button>
        </form>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {renderLocationItem()}          
      </div>
      {/* Phần phân trang */}
      <div className="flex justify-center">
          <div className="flex gap-2.5">
            <Pagination pageSize={8} current={activePage} showSizeChanger={false} total={data?.totalRow} onChange={(value) => setActivePage(value)}/>
          </div>
      </div>
    </section>
  )
}
