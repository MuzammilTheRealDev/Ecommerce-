import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCreateProduct } from '../../../store/actions/ProductAction';

const Create = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmission = async (data) => {
        try {
            data.id = nanoid();
            data.price = parseFloat(data.price);
            await dispatch(asyncCreateProduct(data));
            reset();
            navigate('/products');
        } catch (error) {
            console.error("Product creation failed", error);
        }
    }

    return (
        <div className="min-h-screen bg-background text-text px-4 md:px-8 py-10">
            <div className="max-w-4xl mx-auto bg-cad p-8 rounded-xl shadow-xl">
                <h1 className="text-3xl font-bold mb-8 text-primary text-center">Add / Update Product</h1>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmission)}>
                    {/* Product Title */}
                    <div className="relative col-span-1 md:col-span-2">
                        <input
                            {...register('title', { required: "Product title is required" })}
                            type="text"
                            id="title"
                            placeholder=" "
                            className="peer w-full bg-card text-text p-4 rounded focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        />
                        <label
                            htmlFor="title"
                            className="absolute left-4 -top-2 text-sm text-text text-opacity-70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm"
                        >
                            Product Title
                        </label>
                        {errors.title && <p className="text-red-400 mt-1 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Price */}
                    <div className="relative">
                        <input
                            {...register('price', { required: "Product Price is required" })}
                            type="number"
                            id="price"
                            placeholder=" "
                            className="peer w-full bg-card text-text p-4 rounded focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        />
                        <label
                            htmlFor="price"
                            className="absolute left-4 -top-2 text-sm text-text text-opacity-70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm"
                        >
                            Price (USD)
                        </label>
                        {errors.price && <p className="text-red-400 mt-1 text-sm">{errors.price.message}</p>}
                    </div>

                    {/* Category */}
                    <div className="relative">
                        <select
                            {...register('category', { required: "Category is required" })}
                            id="category"
                            className="peer w-full bg-card text-text p-4 rounded focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 appearance-none"
                        >
                            <option value="">Select Category</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="women's clothing">Women's Clothing</option>
                            <option value="electronics">Electronics</option>
                            <option value="jewelery">Jewelery</option>
                        </select>
                        <label
                            htmlFor="category"
                            className="absolute left-4 -top-2 text-sm bg-card px-1 text-text text-opacity-70"
                        >
                            Category
                        </label>
                        {errors.category && <p className="text-red-400 mt-1 text-sm">{errors.category.message}</p>}
                    </div>

                    {/* Image URL */}
                    <div className="relative md:col-span-2">
                        <input
                            {...register('url', { required: "Imgae url is required" })}
                            type="url"
                            id="image"
                            placeholder=" "
                            className="peer w-full bg-card text-text p-4 rounded focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        />
                        <label
                            htmlFor="image"
                            className="absolute left-4 -top-2 text-sm text-text text-opacity-70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm"
                        >
                            Product Image URL
                        </label>
                        {errors.url && <p className="text-red-400 mt-1 text-sm">{errors.url.message}</p>}
                    </div>

                    {/* Image Preview */}
                    {/* <div className="md:col-span-2">
                        <h2 className="text-sm text-text text-opacity-70 mb-2">Image Preview:</h2>
                        <div className="w-full h-64 bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                                alt="Product Preview"
                                className="object-contain h-full"
                            />
                        </div>
                    </div> */}

                    {/* Description */}
                    <div className="relative md:col-span-2">
                        <textarea
                            {...register('description')}
                            id="description"
                            rows="5"
                            placeholder=" "
                            className="peer peer w-full bg-card text-text p-4 rounded focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none"
                        ></textarea>
                        <label
                            htmlFor="description"
                            className="absolute left-4 -top-2 text-sm text-text text-opacity-70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm"
                        >
                            Description
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-accent hover:bg-emerald-600 text-white font-semibold py-3 rounded-md transition-all duration-300"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create

