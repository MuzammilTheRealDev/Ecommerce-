export default function ProductCard({ product }) {
  return (
    <div className="bg-card p-4 rounded-2xl shadow-lg hover:bg-slate-800 transition-all duration-300 group">
      <div className="h-40 bg-slate-700 animate-pulse rounded-xl mb-4"></div>
      <h3 className="text-lg font-semibold text-light group-hover:text-primary">{product.name}</h3>
      <p className="text-sm text-text text-opacity-70">{product.description}</p>
      <p className="text-accent font-bold mt-2">${product.price}</p>
    </div>
  );
}
