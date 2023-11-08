import React , {FC} from 'react'
import classes from "./PrevCard.module.css";
import Profile from 'images/Profile';
import ShowIcon from 'images/logos/ShowIcon';
import Logo from "../../images/WebusLogo.png";
import FeedIcon from 'images/logos/FeedIcon';
import { toast } from 'react-toastify';
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
interface PrevCardProps {
  total: string;
  seat: string;
  stationFrom:string;
stationTo:string;
timeFrom:string;
img_url: string;
timeTo:string
}
const PrevCard:FC<PrevCardProps> = ({
  total,
  seat,
  stationFrom,
  stationTo,
  timeFrom,
  img_url,
  timeTo
}) => {
  const {t} = useTranslation()
  return (
    <div className={classes.prevCard}>
    <header className={classes.ccardHeading}>
      <img src={img_url} alt='logo' className='max-w-[50px]'/>
      <div className={classes.Pricing}>
        <div className={classes.Profile}>
            <Profile />
          <span>{seat}</span>
        </div>
        {/* <p>{total.split(".")[0]} EGP</p> */}
      </div>
    </header>
    <main className={classes.ccardDetails}>
        <div className={classes.detail}>
          <p>{stationFrom}</p>
          <span>{tConvert( timeFrom?.split(" ")[1])}</span>
        </div>
        <div className={classes.detail}>
          <p>{stationTo}</p>
          <span>{tConvert( timeTo?.split(" ")[1])}</span>
        </div>
    </main>
    <div className={classes.btns}>

    <button className={classes.ccBtn} onClick={()=> toast.success("comming soon")}>
      <FeedIcon />
      <span>{t("Feedback")}</span>
    </button>
    <button className={`${classes.ccBtn} ${classes.active}`} onClick={()=> toast.success("comming soon")}>
      <ShowIcon />
      <span>{t("View ticket")}</span>
    </button>
    </div>
</div>  
  )
}

export default PrevCard