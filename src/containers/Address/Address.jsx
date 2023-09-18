import React from 'react'
import classes from "./Address.module.css";
import { BackButtom } from 'components/BackButtom/BackButtom';
import ProfileCard from 'components/ProfileCard/ProfileCard';
import AddressCard from 'components/AddressCard/AddressCard';
const Address = () => {
  return (
    <div className={classes.layout}>
            <div className="container overflow-hidden">
                <BackButtom />
                <div className="two mt-5 mb-5 min-h-[80vh] gap-[20px]">
                    <ProfileCard />
                    <AddressCard />
                </div>
            </div>
    </div>
  )
}

export default Address