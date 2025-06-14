import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncDeleteProduct, asyncUpdateProduct } from "../../../store/actions/ProductAction";
import { toast } from "react-toastify";

export default function ProductDetail() {
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const products = useSelector((state) => state.products.product);
    const { id } = useParams();
    const product = products?.find((product) => product.id === id)
    const user = useSelector((state) => state.user.users)
    console.log(user);



    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: product?.title,
            url: product?.url,
            description: product?.description,
            category: product?.category,
            price: product?.price
        }
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmission = async (data) => {
        try {
            data.price = parseFloat(data.price);
            await dispatch(asyncUpdateProduct(id, data));
            toast.success('Product Updated Successfully')
            // reset();
            // navigate('/products');
        } catch (error) {
            console.error("Product creation failed", error);
        }
    }

    const deleteHandler = () => {
        dispatch(asyncDeleteProduct(id))
        navigate('/products')
        toast.success('Product deleted successfully')
    }

    return (
        <div className="bg-background text-text min-h-screen p-8">
            {/* Product Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card p-6 rounded-2xl shadow-xl">
                {/* Product Image */}
                <div className="bg-slate-700 h-64 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                        src={product?.url}
                        alt="Product"
                        className="object-cover object-top max-h-full w-full"
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{product?.title}</h1>
                    <p className="text-lg text-accent font-semibold">${product?.price}</p>
                    <p className="text-sm text-text text-opacity-80">
                        {product?.description.split(" ").slice(0, 7).join(" ")}
                    </p>

                    <div className="flex space-x-4 mt-6">
                        {user && user?.isAdmin && (
                            <div className="flex space-x-4 ">
                                <button onClick={() => setShowUpdateForm(!showUpdateForm)} className="bg-primary px-5 py-2 rounded text-white hover:bg-indigo-500 transition-all duration-300">
                                    {showUpdateForm ? "Cancel" : "Update"}
                                </button>
                                <button onClick={deleteHandler} className="bg-red-600 px-5 py-2 rounded text-white hover:bg-red-700 transition-all duration-300">
                                    Delete
                                </button>
                            </div>
                        )}
                        <div className="">
                            <button onClick={() => setShowUpdateForm(!showUpdateForm)} className="bg-primary px-5 py-2 rounded text-white hover:bg-indigo-500 transition-all duration-300">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Update Form (will show on button click) */}

            {showUpdateForm && user && user?.isAdmin && (
                <div className="mt-10 ">
                    <h2 className="text-2xl mb-4">Update Product</h2>
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
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
