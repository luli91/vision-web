import React from 'react'
import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"

const Register = () => {
  const[message, setMessage]= useState("")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => console.log(data)

      const handleGoogleSignIn = () => {
        
      }

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Registrate</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                    <input 
                    {...register("email", { required: true })}
                    type="email" name="email" id="email" placeholder='Ingresá tu e-mail'
                    className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Contraseña</label>
                    <input 
                    {...register("password", { required: true })}
                    type="password" name="password" id="password" placeholder='Ingresá tu contraseña'
                    className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                    />
                </div>
                {
                    message && <p className='text-orange-400 text-xs italic mb-3'>{message}</p>
                }
                <div>
                    <button className='btn-primary text-white font-bold py-2 px-4 rounded focus:outline-none'>Guardar</button>
                </div>
            </form>
            <p className='align-baseline font-medium mt-4 text-sm'>¿Tenés un cuenta? Por favor <Link to="/login" className="text-orange-400 hover:text-green-200">Login</Link></p>
            <div className='mt-4'>
                <button 
                onClick={handleGoogleSignIn}
                className='w-full flex flex-wrap gap-1 items-center justify-center btn-primary hover:bg-green-950 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                    <FaGoogle className='mr-2'/>
                Registrate con Google
                </button>
            </div>
            <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Nissis - Todos los derechos reservados</p>
        </div>
    </div>
  )
}

export default Register
