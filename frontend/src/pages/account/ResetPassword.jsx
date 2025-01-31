import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import Button from '@mui/material/Button';

const ResetPassword = () => {
    const { resetPassword } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            await resetPassword(data.email);
            setMessage("Correo de restablecimiento de contraseña enviado.");
        } catch (error) {
            setMessage("Hubo un error al enviar el correo de restablecimiento.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email</label>
                    <input type="email" {...register("email", { required: true })} />
                    {errors.email && <span>Este campo es requerido</span>}
                </div>
                <Button type="submit" variant="outlined" color="warning">Restablecer Contraseña</Button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;


