export default function PageNotFound() {
    return (
        <div className="bg-background text-text flex pt-30 justify-center min-h-screen px-4">
            <div className="text-center space-y-6">
                {/* Glitchy 404 */}
                <h1 className="text-7xl md:text-9xl font-bold text-primary relative inline-block">
                    <span className="relative z-10">404</span>
                    <span className="absolute top-0 left-0 w-full h-full text-indigo-400 blur-sm animate-pulse z-0">
                        404
                    </span>
                </h1>

                {/* Message */}
                <p className="text-xl text-text text-opacity-70">
                    Oops! The page you're looking for doesn't exist.
                </p>

                {/* Button */}
                <a
                    href="/"
                    className="inline-block bg-accent px-6 py-2 rounded text-white hover:bg-emerald-600 transition-all duration-300"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );
}
