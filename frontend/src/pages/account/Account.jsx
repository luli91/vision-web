import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Account = () => {
  const { currentUser, updateUserProfile, updateUserPassword, sendPasswordReset } = useAuth();
  const { register, handleSubmit, setValue } = useForm();
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      setValue("email", currentUser.email);
      setValue("displayName", currentUser.displayName);
    }
  }, [currentUser, setValue]);

  const onUpdateProfile = async (data) => {
    try {
      await updateUserProfile(data);
      await axios.put(`/api/users/${currentUser.uid}`, {
        displayName: data.displayName,
        address: data.address,
      });
      setProfileMessage("Perfil actualizado correctamente.");
    } catch (error) {
      setProfileMessage("Error al actualizar el perfil.");
      console.error(error);
    }
  };

  const onChangePassword = async (data) => {
    try {
      await updateUserPassword(data.oldPassword, data.newPassword);
      setPasswordMessage("Contraseña actualizada correctamente.");
    } catch (error) {
      setPasswordMessage("Error al actualizar la contraseña.");
      console.error(error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordReset(currentUser.email);
      setResetMessage("Correo de restablecimiento de contraseña enviado.");
    } catch (error) {
      setResetMessage("Error al enviar correo de restablecimiento.");
      console.error(error);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Mi Cuenta</h2>
      {profileMessage && <p className='text-green-500 text-sm mb-3'>{profileMessage}</p>}
      
      <form onSubmit={handleSubmit(onUpdateProfile)}>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="email">Email</label>
          <input {...register("email", { required: true })} type="email" id="email" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' disabled />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="displayName">Nombre</label>
          <input {...register("displayName", { required: true })} type="text" id="displayName" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="address">Dirección</label>
          <input {...register("address")} type="text" id="address" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
        </div>
        <button type="submit" className='w-full py-2 bg-green-500 text-white font-bold rounded-md'>
          Actualizar Perfil
        </button>
      </form>

      <h3 className='text-xl font-bold text-gray-800 mt-6 mb-4'>Cambiar Contraseña</h3>
      {passwordMessage && <p className='text-green-500 text-sm mb-3'>{passwordMessage}</p>}
      <form onSubmit={handleSubmit(onChangePassword)}>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="oldPassword">Contraseña Actual</label>
          <input {...register("oldPassword", { required: true })} type="password" id="oldPassword" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="newPassword">Nueva Contraseña</label>
          <input {...register("newPassword", { required: true })} type="password" id="newPassword" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
        </div>
        <button type="submit" className='w-full py-2 bg-blue-500 text-white font-bold rounded-md'>
          Cambiar Contraseña
        </button>
      </form>
      <button onClick={handlePasswordReset} className='w-full py-2 mt-4 bg-orange-500 text-white font-bold rounded-md'>
        Enviar Correo de Restablecimiento de Contraseña
      </button>
      {resetMessage && <p className='text-green-500 text-sm mb-3'>{resetMessage}</p>}
    </div>
  );
};

export default Account;
