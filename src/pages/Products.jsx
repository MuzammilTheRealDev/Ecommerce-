export default function Products() {
    return (
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
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Products</h2>
                    <select className="bg-card text-text p-2 rounded">
                        <option>Sort by</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-card p-4 rounded-xl animate-pulse" />
                    ))}
                </div>
                <div className="flex justify-center mt-6 space-x-2">
                    {[1, 2, 3].map(n => (
                        <button key={n} className="px-4 py-2 bg-card hover:bg-slate-800 transition-all duration-300 rounded">{n}</button>
                    ))}
                </div>
            </main>
        </div>
    );
}
