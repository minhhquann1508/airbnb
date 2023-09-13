import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
export default function Footer():JSX.Element {
  const {t} = useTranslation();
  return (
    <footer className="p-6 border bg-gray-200">
      <div className="container grid pb-8 grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">{t("support")}</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <NavLink className='text-sm hover:underline' to="/help">{t("help")}</NavLink>
            <a className='text-sm hover:underline' href="#">AirCover</a>
            <a className='text-sm hover:underline' href="#">{t("private_info")}</a>
            <a className='text-sm hover:underline' href="#">{t("disability_support")}</a>
            <a className='text-sm hover:underline' href="#">{t("cancellation_options")}</a>
            <a className='text-sm hover:underline' href="#">{t("report")}</a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">{t("social")}</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <a className='text-sm hover:underline' href="#">{t("support_refugees")}</a>
            <a className='text-sm hover:underline' href="#">{t("anti_discrimination")}</a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">{t("welcome")}</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <a className='text-sm hover:underline' href="#">{t("aircover")}</a>
            <a className='text-sm hover:underline' href="#">{t("resources")}</a>
            <a className='text-sm hover:underline' href="#">{t("forum")}</a>
            <a className='text-sm hover:underline' href="#">{t("welcome_guest")}</a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Airbnb</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <a className='text-sm hover:underline' href="#">{t("new")}</a>
            <a className='text-sm hover:underline' href="#">{t("feature")}</a>
            <a className='text-sm hover:underline' href="#">{t("job")}</a>
            <a className='text-sm hover:underline' href="#">{t("investors")}</a>
          </div>
        </div>
      </div>
      <div className='hidden md:flex justify-between bg-white border py-2 px-5 fixed z-40 left-0 w-full bottom-0'>
        <ul className='flex gap-2'>
          <li className='text-gray-500 text-sm'>© 2022 Airbnb, Inc</li>
          <li className='text-gray-500 text-sm'>{t("privacy")}</li>
          <li className='text-gray-500 text-sm'>{t("rules")}</li>
        </ul>
        <ul className='flex gap-3'>
          {/* <LanguageSwitcher/> */}
          <li className='text-gray-500 text-sm'><FontAwesomeIcon icon={faEarthAsia} /> Tiếng việt (VN)</li>
          <li className='text-gray-500 text-sm'>$USD</li>
        </ul>
      </div>
    </footer>
  )
}
