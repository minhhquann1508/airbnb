import { faGlobe,faBars,faUser,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { MenuProps } from 'antd';
import { Dropdown, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { fetchData } from './duck/actions';
import { LocationFormat } from '../../types';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

export default function Header():JSX.Element {
  const [active,isActive] = useState<number>(1);
  const [showTab,setShowTab] = useState<boolean>(false);
  const {userLogin} = useSelector((state:RootState) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {data,loading,error} = useSelector((state:RootState) => state.locationReducer);
  const formik = useFormik({
    initialValues:{
      location:0
    },
    onSubmit:(values) => {
      setShowTab(false);
      navigate(`finding/${values.location}`);
    }
  })
  // Hàm render phần nút avatar
  const renderAvatarBtn = ():JSX.Element => {
      return (
        <button className='bg-black text-white w-5 h-5 md:w-7 md:h-7 rounded-full'><FontAwesomeIcon icon={faUser} /></button>
      )
  }
  const handleChange = (value: number) => {
    formik.setFieldValue('location',value);
  };
  useEffect(() => {
    dispatch(fetchData())
  },[]);

  let items: MenuProps['items'] = [];
  if(!userLogin) {
    items = [  
      {
        label: <NavLink to='/register' className='font-medium'>{t("register")}</NavLink>,
        key: '0',
      },
      {
        label: <NavLink className='font-medium' to='/login'>{t("login")}</NavLink>,
        key: '1',
      },
      {
        label: <NavLink to='/location/all' className='font-medium'>{t("list_of_destinations")}</NavLink>,
        key: '2',
      },
      {
        label: <NavLink to='/help' className='font-medium'>{t("help")}</NavLink>,
        key: '4',
      },
    ];
  }
  else {
    if(userLogin?.user?.role.toLowerCase() === 'admin') {
      items = [  
        {
          label: <NavLink to={`/infomation/${userLogin?.user?.id}`} className='font-medium'>{t("infomation")}</NavLink>,
          key: '0',
        },
        {
          label: <NavLink to={`/admin/manageUser`} className='font-medium'>{t("admin")}</NavLink>,
          key: '7',
        },
        {
          label: <NavLink className='font-medium' to={`/journey/${userLogin?.user.id}`}>{t("trip")}</NavLink>,
          key: '1',
        },
        {
          label: <NavLink to='/location/all' className='font-medium'>{t("list_of_destinations")}</NavLink>,
          key: '5',
        },
        {
          label: <NavLink to='/help' className='font-medium'>{t("help")}</NavLink>,
          key: '3',
        },
        {
          label: <button className='font-medium w-full text-start' onClick={() => {
            localStorage.clear();
            navigate('/login');
            window.location.reload();
          }}>{t("log_out")}</button>,
          key: '4',
        },
      ];
    }
    else {
      items = [  
        {
          label: <NavLink to={`/infomation/${userLogin?.user?.id}`} className='font-medium'>{t("infomation")}</NavLink>,
          key: '0',
        },
        {
          label: <NavLink className='font-medium' to={`/journey/${userLogin?.user?.id}`}>{t("trip")}</NavLink>,
          key: '1',
        },
        {
          label: <NavLink to='/location/all' className='font-medium'>{t("list_of_destinations")}</NavLink>,
          key: '5',
        },
        {
          label: <NavLink to='/help' className='font-medium'>{t("help")}</NavLink>,
          key: '3',
        },
        {
          label: <button className='font-medium w-full text-start' onClick={() => {
            localStorage.clear();
            navigate('/login');
            window.location.reload();
          }}>{t("log_out")}</button>,
          key: '4',
        },
      ];
    }
  }
  return (
    <header>
      <nav className="lg:p-4 py-3.5 dark:text-gray-100 shadow-lg fixed w-full bg-white z-20">
        <div className="lg:container flex justify-center md:justify-between items-center h-16 mx-auto">
          {/* Phần logo */}
          <NavLink to='/' className="hidden md:block p-2">
            <img src="./../img/airbnb_logo.png" alt="logo" width={120} height={120}/>
          </NavLink>
          {/* Phần tìm kiếm nội dung */}
          <ul className={`${!showTab ? 'flex' : 'hidden'} items-center border py-1 px-2 rounded-full shadow-xl`} onClick={() => setShowTab(!showTab)}>
            <li className="flex">
              <button className='text-xs md:text-sm font-medium border-r p-2 text-black'>{t("location")}</button>
            </li>
            <li className="flex">
              <button className='text-xs md:text-sm font-medium border-r p-2 text-black'>{t("time")}</button>
            </li>
            <li className="flex">
              <button className='text-xs md:text-sm font-medium p-2 text-black'>{t("guest")}</button>
            </li>
            <li className="flex">
              <button className='text-sm font-medium w-8 h-8 text-white rounded-full bg-pink-600'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </li>
          </ul>
          {/* Modal khi hiện dropdown */}
          <ul className={`${showTab ? 'flex' : 'hidden'} items-center gap-2 py-1 px-2`} onClick={() => setShowTab(!showTab)}>
            <li className="flex">
              <button className='text-xs md:text-sm font-medium p-2 text-black'>{t("place")}</button>
            </li>
            <li className="flex">
              <button className='text-xs md:text-sm font-medium p-2 text-black'>{t("experience")}</button>
            </li>
            <li className="flex">
              <button className='text-xs md:text-sm font-medium p-2 text-black'>{t("online_experience")}</button>
            </li>
          </ul>
          {/* Phần các option lựa chọn */}
          <div className='flex gap-2 items-center'>
            <button className='hidden md:block hover:duration-300 hover:bg-gray-100 p-2 rounded-full text-sm font-medium'>{t("become_host")}</button>
            <button className='hidden md:block hover:duration-300 hover:bg-gray-100 w-8 h-8 rounded-full'><FontAwesomeIcon icon={faGlobe} /></button>
            <Dropdown placement='bottomRight' className='ml-1' overlayStyle={{width:200}} menu={{ items }} trigger={['click']}>
              <div className='flex items-center gap-2 md:gap-4 rounded-full border py-2 px-4 cursor-pointer hover:shadow-xl duration-300'>
                <button><FontAwesomeIcon icon={faBars} className='text-black'/></button>
                {renderAvatarBtn()}
              </div>
            </Dropdown>
          </div>     
        </div>
        {/* Phần nội dung modal show */}
        <form onSubmit={formik.handleSubmit} className={`${showTab ? 'flex' : 'hidden'} justify-center mt-3`}>
          <ul className='flex border-2 rounded-full bg-gray-100'>
            <li key={1} className={`${active === 1 ? 'bg-white shadow-xl' : ''} md:w-auto py-1 px-3 rounded-full flex items-center`} onClick={() => isActive(1)}>
              <label className='font-medium text-sm text-black'>{t("location")}</label>
              <Select
                style={{ width: 200 }}
                bordered={false}
                onChange={handleChange}
                options={data?.map((location:LocationFormat) => ({label:location.tenViTri,value:location.id}))}
              />
            </li>
            <div className='hidden md:flex'>
              <li key={2} className={`${active === 2 ? 'bg-white shadow-xl' : ''} py-1 px-3 rounded-full flex flex-col gap-1 items-center`} onClick={() => isActive(2)}>
                <label className='font-medium text-sm'>{t("check_in")}</label>
                <input type="date" className='bg-transparent outline-none' />
              </li>
              <li key={3} className={`${active === 3 ? 'bg-white shadow-xl' : ''} py-1 px-3 rounded-full flex flex-col gap-1 items-center`} onClick={() => isActive(3)}>
                <label className='font-medium text-sm'>{t("check_out")}</label>
                <input type="date" className='bg-transparent outline-none' />
              </li>
              <li key={4} className={`${active === 4 ? 'bg-white shadow-xl' : ''} py-1 px-5 rounded-full flex gap-5 items-center`} onClick={() => isActive(4)}>
                <div className='flex flex-col'>
                  <label className='font-medium text-sm'>{t("add_guest")}</label>
                  <input type="number" min={0} max={15} className='bg-transparent outline-none appearance-none' style={{WebkitAppearance:'none'}}/>
                </div>
              </li>
            </div>
            <li className='md:px-2 flex items-center'>
              <button type='submit' className='bg-pink-600 p-2 text-white rounded-full text-xs md:text-sm font-medium'>{t("finding")}</button>
            </li>
          </ul>
        </form>
      </nav>
    </header>
  )
}
