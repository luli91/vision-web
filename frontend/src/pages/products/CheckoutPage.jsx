import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CheckoutPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const {currentUser} = useAuth()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [isChecked, setIsChecked] = useState(false);
    const onSubmit = (data) => {
        console.log(data);

        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
        
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        }
        console.log(newOrder)
    }


    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Método de Pago</h2>
                            <p className="text-gray-500 mb-2">Precio Total: ${totalPrice}</p>
                            <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
                        </div>
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Detalles personales</p>
                                    <p>Por favor complete todos los campos.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Nombre completo</label>
                                            <input
                                                {...register('name')}
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                {...register('email')}
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                disabled
                                                defaultValue={currentUser.email}
                                                placeholder="email@domain.com"
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="phone">Número de Teléfono</label>
                                            <input
                                                {...register('phone')}
                                                type="number"
                                                name="phone"
                                                id="phone"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="+123 456 7890"
                                            />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="address">Dirección</label>
                                            <input
                                                {...register('address')}
                                                type="text"
                                                name="address"
                                                id="address"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="city">Localidad</label>
                                            <input
                                                {...register('city')}
                                                type="text"
                                                name="city"
                                                id="city"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="country">País</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    {...register('country')}
                                                    name="country"
                                                    id="country"
                                                    placeholder="País"
                                                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="state">Provincia</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    {...register('state')}
                                                    name="state"
                                                    id="state"
                                                    placeholder="Provincia"
                                                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="zipcode">Código Postal</label>
                                            <input
                                                {...register('zipcode')}
                                                type="text"
                                                name="zipcode"
                                                id="zipcode"
                                                className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="md:col-span-5 mt-3">
                                            <div className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="billing_same"
                                                    id="billing_same"
                                                    className="form-checkbox"
                                                    onChange={(e) => setIsChecked(e.target.checked)}
                                                />
                                                <label htmlFor="billing_same" className="ml-2">
                                                    Estoy de acuerdo con los <Link className='underline underline-offset-2 text-blue-600'>Términos y condiciones</Link> y <Link className='underline underline-offset-2 text-blue-600'>Política de compras.</Link>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    disabled={!isChecked}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Realizar un pedido
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
