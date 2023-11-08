import React, { FC, useTransition } from 'react';
import classes from './PendCard.module.css';
import Profile from 'images/Profile';
import ShowIcon from 'images/logos/ShowIcon';
import Logo from '../../images/WebusLogo.png';
import MonyIcon from 'images/logos/MonyIcon';
import Cancelcon from 'images/logos/Cancelcon';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function tConvert(time: any) {
  // Check correct time format and split into components
  try {
     time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time   // return adjusted time or original string
  } catch (error) {
    return 'no date '
  }
 
}

interface PendCardProps {
  total: string;
  seat: string;
  stationFrom: string;
  stationTo: string;
  timeFrom: string;
  timeTo: string;
  cancel_url: string;
  cancel: boolean;
  id: string;
  img_url: string;
  invoice_url: string;
}

const PendCard: FC<PendCardProps> = ({
  total,
  seat,
  stationFrom,
  stationTo,
  timeFrom,
  timeTo,
  cancel,
  cancel_url,
  id,
  img_url,
  invoice_url
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  const cancelHandler = async (e:any) => {
    e.preventDefault () 
    try {
      const res = await axios.post(
        cancel_url
      );
      if (res.status === 200) {
        toast.success('cancel data correct ');
        window.location.reload();
      }
    } catch (error) {
      toast.error("can't cancel Data ");
    }
  };
  const addHandler = async () => {
    try {
      const res = await axios.post(
        invoice_url
      );
      if (res.status === 200) {
        toast.success('cancel data correct ');
        navigate(-1);
      }
    } catch (error) {
      toast.error("can't cancel Data ");
    }
  };
  const PayNow = async () => {
    
    const paymentUrl = invoice_url
    const token = localStorage.getItem("token");
  
    const config = {
      headers: {
        accept: "application/json, text/plain, /",
        "accept-language": "en",
        Authorization: `Bearer ${token}`
      }
    };
    if (paymentUrl) {
      try {
        const response = await axios.post(paymentUrl, null, config);
        const { url } = response?.data?.data;
        window.location.href = url;
      } catch (error:any) {
        console.log(error.message);
      }
    }
  };

  const {t} = useTranslation()
  return (
    <div className={classes.pendCard}>
      <header className={classes.ccardHeading}>
        <img src={Logo} alt='logo' />
        <div className={classes.Pricing}>
          <div className={classes.Profile}>
            <Profile />
            <span>{seat}</span>
          </div>
          <p>{total?.substring(3)} {t("LE")}</p>
        </div>
      </header>
      <main className={classes.ccardDetails}>
        <div className={classes.detail}>
          <p>{stationFrom}</p>
          <span>{tConvert( timeTo?.split(" ")[1])}</span>
        </div>
        <div className={classes.detail}>
          <p>{stationTo}</p>
          <span>{tConvert( timeTo?.split(" ")[1])}</span>
        </div>
      </main>
      <div className={classes.layoutBtns}>
        <div className={classes.btns}>
          <button className={classes.Btnbay} onClick={PayNow}>
            <MonyIcon />
            <span>{t("Pay")}</span>
          </button>
          <button
            className={classes.ccBtn}
            onClick={() => toast.success('comming soon')}
          >
            <ShowIcon />
            <span>{t("View")}</span>
          </button>
        </div>
        {cancel && (
          <button className={classes.cancelBtn} onClick={(e)=>cancelHandler(e)}>
            <Cancelcon />
            <span>{t("Cancel")}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PendCard;