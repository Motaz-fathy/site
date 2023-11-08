import React from 'react'
import classes from "./BackButtom.module.css";
import BackIcon from 'containers/Profile/BackIcon';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export const BackButtom = () => {
  const navigate =useNavigate();
  const {t} = useTranslation()
  return (
  
    <div className='w-[70px] text-white py-3 flex justify-around items-center gap-2 rtl:flex-row-reverse' onClick={()=> navigate(-1)}>
    <BackIcon />
    <span > {t("back")} </span>
  </div>
  )
}
