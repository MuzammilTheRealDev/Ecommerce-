export default function Home() {
    return (
        <div className="bg-background text-text">
            <section className="bg-gradient-to-r from-primary to-accent p-16 text-center rounded-b-3xl">
                <h1 className="text-4xl font-bold mb-4">Shop the Future</h1>
                <p className="text-light text-opacity-80">Modern tech and gadgets delivered fast</p>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-card h-32 rounded-xl animate-pulse" />
                ))}
            </section>
            <section className="p-8">
                <h2 className="text-2xl mb-4">Featured Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-card p-4 rounded-xl animate-pulse" />
                    ))}
                </div>
            </section>
            <section className="p-8">
                <div className="bg-card p-6 rounded-xl">
                    <h3 className="text-xl mb-2">Join our Newsletter</h3>
                    <input type="email" placeholder="you@example.com" className="p-2 rounded w-full bg-slate-900 text-text placeholder-opacity-60" />
                </div>
            </section>
        </div>
    );
}
