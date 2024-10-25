import React, { useEffect, useState } from 'react'
import { DiHtml5DeviceAccess } from 'react-icons/di';
import ProductsCard from '../products/ProductsCard';

const categories = ["Elegí la categoria", "Sol", "Lectura", "Computadora", "Deportivos", "Tecnología", "Moda  "]

const TopSellers = () => {
    const [productos, setProductos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState ("Elegí la categoria")

    useEffect (() => {
        fetch("productos.json")
        .then(res => res.json())
        .then((data) => setProductos(data))
    }, [])

    const filteredProductos = selectedCategory === "Elegí la categoria" 
    ? productos 
    : productos.filter(producto => producto.category.toLowerCase() === selectedCategory.trim().toLowerCase());
    console.log(filteredProductos);
    
  return (
    <div className='py-10'>
        <h2 className='text-3xl font-semibold mb-6'> Top Sellers</h2>
        {/* category filtering */}
        <div className='mb-8 flex items-center'>
            <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                {
                    categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))
                }
            </select>
        </div>
        {
            filteredProductos.map((productos, index)  => (
                <ProductsCard key={index} producto={productos}/>
            ))
        }
    </div>
  )
}

export default TopSellers