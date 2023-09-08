
import LoginPage from '@/components/Login'
import React from 'react'
import { Logo } from "../components/Logo";


const Login = () => {
  return (
    <div className='flex min-h-screen flex-col items-start pr-24 pb-24 pt-5 bg-sky-300'>
        <div className="pl-[10vw] pt-[2.7vh]"><Logo classname="flex justify-start w-[100vw] max-h-[20vh]" /></div>
        <div className="flex justify-center w-[100vw] pt-[10vh] "><LoginPage className=""/></div>
    </div>
  )
}

export default Login
