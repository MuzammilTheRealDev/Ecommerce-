import { useSelector } from "react-redux";
import ProductCard from "../features/admin/product/ProductCard";

export default function Products() {
    const product = useSelector((state) => state.products.product)
    console.log(product);

    const renderProduct = product.map((data) => {
        return <ProductCard key={data.id} product={data} />
    })

    return product.length > 0 ? (
        <div className="bg-background text-text flex">
            <aside className="hidden md:block w-1/4 p-4 bg-card">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <div className="space-y-2">
                    {["Category A", "Category B"].map(c => (
                        <label key={c} className="block">
                            <input type="checkbox" className="mr-2" />{c}
                        </label>
                    ))}
                </div>
            </aside>
            <main className="flex-1 p-6 min-h-[70vh]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Products</h2>
                    <select className="bg-card text-text p-2 rounded">
                        <option>Sort by</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {renderProduct}
                </div>
                <div className="flex justify-center mt-6 space-x-2">
                    {[1, 2, 3].map(n => (
                        <button key={n} className="px-4 py-2 bg-card hover:bg-slate-800 transition-all duration-300 rounded">{n}</button>
                    ))}
                </div>
            </main>
        </div>
    ) : <div className="h-[100vh]">
        {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-card p-4 rounded-xl animate-pulse" />
        ))}
    </div>
}
