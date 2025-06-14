import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  console.log(product);
  function truncateWords(str, num = 10) {
    const words = str.trim().split(/\s+/);
    return words.length > num ? words.slice(0, num).join(" ") + "..." : str;
  }
  return (
    <div className="bg-card p-4 rounded-2xl shadow-lg hover:bg-slate-800 transition-all duration-300 group flex flex-col justify-between gap-1">
      <Link to={`/product/detail/${product.id}`} className="h-40 overflow-hidden bg-slate-700 rounded-xl mb-4 object-cover">
        <img src={product.url} className="object-cover w-full" alt="" />
      </Link>
      <Link to={`/product/detail/${product.id}`} className="text-lg font-semibold text-light group-hover:text-primary">{truncateWords(product.title, 4)}</Link>
      <p className="text-sm text-text text-opacity-70" title={product.description}>
        {truncateWords(product.description, 10)}
      </p>
      <p className="text-accent font-bold">${product.price}</p>
      <button className="bg-accent w-full py-2">Add to Cart</button>
    </div>
  );
}
