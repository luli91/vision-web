import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import getBaseUrl from '../utils/baseUrl';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        } = useForm();

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data);
        
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data,{
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            const auth = response.data;
            console.log(auth);
            if(auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Token has been expired!, Please login again');
                    navigate("/")
                }, 3600 * 1000)
            }
            
            alert("Admin Login sucessfull!")
            navigate("/dashboard")

        } catch (error) {
            setMessage("Por favor provea un email y contraseña válido");
            console.error(error);
        } 
    };

    return (
        <div className='h-screen flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Panel de administrador</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">
                Usuario
                </label>
                <input
                {...register("username", { required: true })}
                type="text" name="username" id="username" placeholder='Ingresá tu usuario'
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
            {errors.password && <p className='text-red-500 text-xs italic'>Por favor ingrese una contraseña.</p>}
        </div>
        {
            message && <p className='text-orange-400 text-xs italic mb-3'>{message}</p>
        }
        <div>
            <Button
                className='w-full'
                type="submit" 
                variant="outlined"
                color="warning">
                Login
            </Button>
        </div>
        </form>
            <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Nissis - Todos los derechos reservados</p>
    </div>
</div>
)
}

export default AdminLogin
