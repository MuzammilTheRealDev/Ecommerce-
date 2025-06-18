import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../features/admin/product/ProductCard";
import { useState, useEffect } from "react";
import axios from "../utils/Api";
import InfiniteScroll from "react-infinite-scroll-component";
import { loadLazyProducts } from "../store/reducers/ProductSlice";

export default function Products() {
    const products = useSelector((state)=>state.products.product);
    const dispatch = useDispatch();
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`/products?_limit=6&_start=${products.length}`);
            if (data.length > 0) {
                dispatch(loadLazyProducts(data))
                if (data.length < 6) {
                    setHasMore(false)
                }
            } else {
                setHasMore(false)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const renderProduct = products.map((data) => {
        return <ProductCard key={data.id} product={data} />;
    });

    if (loading) {
        return (
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-background">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card p-4 rounded-xl animate-pulse h-48" />
                ))}
            </div>
        );
    }

    if (!products.length) {
        return <div className="text-center p-10">Product not found.</div>;
    }

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
            <main id="scrollableDiv" className="flex-1 p-6 min-h-[70vh]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Products</h2>
                    <select className="bg-card text-text p-2 rounded">
                        <option>Sort by</option>
                    </select>
                </div>
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchProduct}
                    hasMore={hasMore}
                    loader={<h3>Loading...</h3>}
                    endMessage={
                        <p className="text-center">
                            <b>You have reached the end</b>
                        </p>
                    }
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
                        {renderProduct}
                    </div>
                </InfiniteScroll>
                <div className="flex justify-center mt-6 space-x-2">
                    {[1, 2, 3].map(n => (
                        <button key={n} className="px-4 py-2 bg-card hover:bg-slate-800 transition-all duration-300 rounded">{n}</button>
                    ))}
                </div>
            </main>
        </div >
    );
}