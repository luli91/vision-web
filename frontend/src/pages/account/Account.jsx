import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Account = () => {
  const { currentUser, updateUserProfile, updateUserPassword, sendPasswordReset } = useAuth();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [userData, setUserData] = useState(null);


useEffect(() => {
  if (!currentUser) return;

  const fetchUserData = async () => {
    try {
      const token = await currentUser.getIdToken();
      console.log("Token enviado:", token);
      console.log("Buscando usuario con UID:", currentUser.uid);

      // Intentar obtener el perfil del usuario desde el backend
      const res = await axios.get(`/api/users/${currentUser.uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Datos del usuario obtenidos:", res.data);
      setUserData(res.data);
      setValue("email", currentUser.email); 
      setValue("displayName", res.data.displayName); 
      setValue("street", res.data.address.street);
      setValue("city", res.data.address.city);
      setValue("state", res.data.address.state);
      setValue("zipcode", res.data.address.zipcode);
      setValue("country", res.data.address.country);
      setValue("phone", res.data.phone);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Usuario no encontrado en la base de datos, creando...");
        // Si el usuario no existe, crearlo en la base de datos
        try {
          const newUser = {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            role: "user", // Asigna el rol por defecto
          };
          const res = await axios.post("/api/users", newUser);
          console.log("Usuario creado en la base de datos:", res.data);
          setUserData(res.data);
          setValue("email", currentUser.email);
        setValue("displayName", res.data.displayName);
        setValue("street", res.data.address.street);
        setValue("city", res.data.address.city);
        setValue("state", res.data.address.state);
        setValue("zipcode", res.data.address.zipcode);
        setValue("country", res.data.address.country);
        setValue("phone", res.data.phone);
        } catch (postError) {
          console.error("Error al crear el usuario:", postError);
        }
      } else {
        console.error("Error al obtener usuario:", error);
      }
    }
  };

  fetchUserData();
}, [currentUser, setValue]);

const onUpdateProfile = async (data) => {
  console.log("Formulario enviado con datos:", data);
  try {
    const token = await currentUser.getIdToken();
    console.log("Updating Profile with data:", data);
    await axios.put(`/api/users/${currentUser.uid}`, {
      displayName: data.displayName,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        country: data.country,
      },
      phone: data.phone,
    }, {
      headers: { Authorization: `Bearer ${await currentUser.getIdToken()}` }
    });
    setProfileMessage("Perfil actualizado correctamente.");
  } catch (error) {
    setProfileMessage("Error al actualizar el perfil.");
    console.error("Error updating profile:", error);
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
      
      <form
  onSubmit={handleSubmit((data) => {
    console.log("✔ handleSubmit ejecutado, enviando datos:", data);
    onUpdateProfile(data);
  })}
>

        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="email">Email</label>
          <input {...register("email", { required: true })} type="email" id="email" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' disabled />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="displayName">Nombre</label>
          <input {...register("displayName", { required: true })} type="text" id="displayName" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="street">Calle</label>
          <input {...register("street")} type="text" id="street" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="city">Localidad</label>
          <input {...register("city")} type="text" id="city" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="state">Provincia</label>
          <input {...register("state")} type="text" id="state" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="zipcode">Código Postal</label>
          <input {...register("zipcode")} type="text" id="zipcode" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="country">País</label>
          <input {...register("country")} type="text" id="country" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="phone">Teléfono</label>
          <input {...register("phone")} type="text" id="phone" className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
        </div>
        <button onClick={() => {
  const values = getValues(); 
  console.log("Valores obtenidos:", values);
  onUpdateProfile(values);
}}>
  Test Actualizar Perfil
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
