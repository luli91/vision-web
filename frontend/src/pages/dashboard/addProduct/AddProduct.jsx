import React, { useState } from 'react';
import InputField from './inputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddProductMutation } from '../../../redux/features/products/productsApi';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addProduct, {isLoading, isError}] = useAddProductMutation()
    const [imageFileName, setimageFileName] = useState('')

    const onSubmit = async (data) => {
        const newProductData = {
            ...data,
            coverImage: imageFileName
        };
        try {
            await addProduct(newProductData).unwrap();
            Swal.fire({
                title: "Producto agregado",
                text: "Tu producto fue editado exitosamente!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok!"
                });
                reset();
                setimageFileName('')
                setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Error al agregar un producto. Por favor intenta nuevamente")
        }
    
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }
return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Agregar un nuevo producto</h2>

      {/* Form starts here */}
        <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <InputField
            label="Titulo"
            name="title"
            placeholder="Ingresá el título del producto"
            register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
            label="Descripcion"
            name="description"
            placeholder="Ingresá la descripcion del producto"
            type="textarea"
            register={register}

        />

        {/* Reusable Select Field for Category */}
        <SelectField
            label="Categoria"
            name="category"
            options={[
            { value: '', label: 'Elejí la Categoria'},
            { value: 'Tecnologia', label: 'Tecnologia' },
            { value: 'Juguetria', label: 'Juguetria' },
            { value: 'Belleza y cuidado personal', label: 'Belleza y cuidado personal' },
            { value: 'Home y deco', label: 'Home y deco' },
            { value: 'Regaleria', label: 'Regaleria' },
            { value: 'Bazar', label: 'Bazar' },
            ]}
            register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
            <label className="inline-flex items-center">
            <input
                type="checkbox"
                {...register('trending')}
                className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
            </label>
        </div>

        {/* Old Price */}
        <InputField
            label="Precio anterior"
            name="oldPrice"  
            type="number"
            placeholder="Precio anterior"
            register={register}
        
        />

        {/* New Price */}
        <InputField
            label="Nuevo precio"
            name="newPrice"
            type="number"
            placeholder="Nuevo precio"
            register={register}
        
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen de portada</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
            {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
            {
                isLoading ? <span className="">Adding.. </span> : <span>Agregar producto</span>
            }
        </button>
        </form>
    </div>
    )
}

export default AddProduct