import axios from 'axios'
import React, { useEffect } from 'react'

export const Draw_Bus = () => {

  const HandleSeats = async () => {
    
    try {
      const {data} = await  axios.get(`https://co.telefreik.com/api/trips/494/seats?from_location_id=16&to_location_id=14`)
      console.log(data.data)
    } catch (error) {
      console.log("data of seats error ")
    }
  }

  useEffect(() => {
    HandleSeats()
  } , [])


  return (
    <div>
          new
    </div>
  )
}
