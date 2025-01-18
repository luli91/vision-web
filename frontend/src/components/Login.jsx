import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
        await loginUser(data.email, data.password)
        alert("login sucessful")
        navigate("/")
    } catch (error) {
        setMessage("Por favor provea un email y contraseña válido");
        console.error(error);
    } 
  };

  const handleGoogleSignIn = async () => {
    try {
        await signInWithGoogle();
        alert("Login sucessfull")
        navigate("/")
    } catch (error) {
        alert("Login with google failed");
        console.error(error);
    }
  };

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-semibold mb-4'>Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
              type="email" name="email" id="email" placeholder='Ingresá tu e-mail'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.email && <p className='text-red-500 text-xs italic'>Por favor ingrese un email válido.</p>}
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
              type="submit" 
              variant="outlined"
              color="warning">
              Login
            </Button>
          </div>
        </form>
        <p className='align-baseline font-medium mt-4 text-sm'>¿No tenés un cuenta? Por favor <Link to="/register" className="text-primary hover:text-orange-400">Registrate</Link></p>
        <div className='mt-4'>
          <button
            onClick={handleGoogleSignIn}
            className='w-full text-slate-500 font-bold flex flex-wrap gap-3 items-center justify-center py-2 px-4 rounded focus:outline-none text-lg border border-blue-gray-500'>
            <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
            Continuá con Google
          </button>
        </div>
        <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Nissis - Todos los derechos reservados</p>
      </div>
    </div>
  );
}

export default Login;
