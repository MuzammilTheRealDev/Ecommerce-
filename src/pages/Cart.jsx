import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateUser } from "../store/actions/UserAction";

export default function Cart() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.users);
    // const products = useSelector((state) => state.products.product);

    if (!user) {
        return <div className="min-h-[70vh] pt-20">Loading user data...</div>;
    }

    if (!user.cart || user.cart.length === 0) {
        return (
            <div className="min-h-[70vh] pt-20 flex items-center justify-center bg-background/98">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-white">Your Cart is Empty</h2>
                    <p className="text-gray-400">Add some products to get started</p>
                </div>
            </div>
        );
    }

    const updateCartItem = (index, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedUser = {
            ...user,
            cart: user.cart.map((item, i) =>
                i === index ? { ...item, quantity: newQuantity } : item
            )
        };
        console.log(updatedUser);

        dispatch(asyncUpdateUser(updatedUser.id, updatedUser));
    };

    const increaseQuantityHandler = (index) => {
        const currentQuantity = user.cart[index].quantity;
        updateCartItem(index, currentQuantity + 1);
    };

    const decreaseQuantityHandler = (index) => {
        const currentQuantity = user.cart[index].quantity;
        updateCartItem(index, currentQuantity - 1);
    };

    const removeItemHandler = (index) => {
        const updatedUser = {
            ...user,
            cart: user.cart.filter((_, i) => i !== index)
        };

        dispatch(asyncUpdateUser(updatedUser.id, updatedUser));
    };

    // Calculate totals
    const subtotal = user.cart.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
    );
    const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping for orders over $100
    const total = subtotal + shipping;

    return (
        <div className="bg-background text-text p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[70vh] pt-20">
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-sm text-opacity-70">
                                {["Item", "Price", "Quantity", "Total"].map((h) => (
                                    <th key={h} className="pb-2">
                                        {h}
                                    </th>
                                ))}
                                <th className="pb-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.cart.map((item, index) => (
                                <tr key={`${item.product.id}-${index}`} className="border-t border-slate-700">
                                    <td className="py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.product.url}
                                                alt={item.product.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <h3 className="font-medium">{item.product.title}</h3>
                                                <p className="text-sm text-gray-400">{item.product.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${item.product.price.toFixed(2)}</td>
                                    <td>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => decreaseQuantityHandler(index)}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
                                            >
                                                -
                                            </button>
                                            <span className="bg-gray-700 px-3 py-1 rounded">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => increaseQuantityHandler(index)}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button
                                            onClick={() => removeItemHandler(index)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="sticky top-4 bg-card p-6 rounded-xl h-fit">
                <h3 className="text-xl mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2 mt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                <button
                    className="bg-accent w-full py-3 rounded text-white font-semibold hover:bg-emerald-600 transition-all duration-300"
                    disabled={user.cart.length === 0}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}