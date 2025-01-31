import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetOrderByEmailQuery, useRequestReturnMutation } from '../../redux/features/orders/ordersApi';
import { getImgUrl } from '../../utils/getImgUrl';
import { useAuth } from '../../context/AuthContext';

const MyPurchasesPage = () => {
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const { data: purchases = [], refetch } = useGetOrderByEmailQuery(currentUser?.email);
    const [requestReturn] = useRequestReturnMutation();

    const handleReturnRequest = async (purchaseId) => {
        await requestReturn({ purchaseId, reason: "Razón de la devolución" });
        refetch();
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Mis Compras</h2>
            {purchases.length > 0 ? (
                purchases.map(purchase => (
                    <div key={purchase._id} className="bg-white rounded shadow-md p-4 mb-4">
                        {purchase.productIds.map(product => (
                            <div key={product._id} className="flex items-center mb-4">
                                <img src={getImgUrl(product.coverImage)} alt={product.title} className="w-20 h-20 object-cover rounded-md" />
                                <div className="ml-4 flex-1">
                                    <h3 className="text-xl font-semibold">{product.title}</h3>
                                    <p className="text-gray-600">Cantidad: {purchase.productIds.length}</p>
                                    <p className="text-gray-600">Precio: ${product.newPrice}</p>
                                    <p className="text-gray-600">Estado: {purchase.delivered ? "Entregado" : "No entregado"}</p>
                                </div>
                                <div>
                                    <button onClick={() => handleReturnRequest(purchase._id)} className="text-red-500 hover:text-red-700">
                                        Solicitar Devolución / Cambio
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No tienes compras realizadas.</p>
            )}
        </div>
    );
};

export default MyPurchasesPage;
