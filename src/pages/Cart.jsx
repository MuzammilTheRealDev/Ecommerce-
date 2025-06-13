export default function Cart() {
    return (
        <div className="bg-background text-text p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-sm text-opacity-70">
                            {["Item", "Quantity", "Price"].map(h => <th key={h} className="pb-2">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2].map(i => (
                            <tr key={i} className="border-t border-slate-700">
                                <td className="py-4">Product {i}</td>
                                <td><input type="number" defaultValue={1} className="w-16 p-1 bg-card rounded" /></td>
                                <td>$199.99</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="sticky top-4 bg-card p-6 rounded-xl h-fit">
                <h3 className="text-xl mb-4">Order Summary</h3>
                <p className="mb-2">Subtotal: $399.98</p>
                <p className="mb-4">Shipping: $9.99</p>
                <button className="bg-accent w-full py-2 rounded text-white font-semibold hover:bg-emerald-600 transition-all duration-300">Checkout</button>
            </div>
        </div>
    );
}
