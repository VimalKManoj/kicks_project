import React, { useEffect } from 'react'
import Section from './Section'
import Button from './Button'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'


const PaymentSuccess = ({baseURL}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams =new URLSearchParams(location.search)
    const sessionID = queryParams.get('session_id')
    
    useEffect(()=>{
      const sendSession = async () =>{

        const response = await axios.post(`${baseURL}api/v1/users/createbooking`,{sessionID},
          {
            withCredentials: true,
          })
      }

      sendSession()
      
    },[sessionID])
  return (
    <Section className=" lg:pt-10  xl:py-12 lg:px-14 bg-[#f1f4f5]">
        <div className='-translate-y-10 flex flex-col justify-center items-center h-full'>
        <img src='/success.gif' className='h-96 '></img>
        <h2 className='h2'>Payment Successful!</h2>
        <h2 className='h5'>Thanks for being there with us.</h2>
        <Button className='bg-black m-10' onClick={()=>navigate('/')}>Go back to home</Button>
        </div>
        
    </Section>
  )
}

export default PaymentSuccess