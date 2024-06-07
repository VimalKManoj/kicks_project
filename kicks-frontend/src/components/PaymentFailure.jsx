import React from 'react'
import Section from './Section'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const PaymentFailure = () => {
    const navigate = useNavigate()
  return (
    <Section className=" lg:pt-10  xl:py-12 lg:px-14 h-full">
        <div className='h-[30rem] flex flex-col justify-center items-center '>
        
        <h2 className='h2'>OOPS!</h2>
        <h2 className='h5'>Something went wrong.</h2>
        <Button className='bg-black m-10' onClick={()=>navigate('/')}>Go back to home</Button>
        </div>
    </Section>
  )
}

export default PaymentFailure