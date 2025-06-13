export default function Footer() {
    return (
        <footer className="bg-card text-text p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {["Shop", "Company", "Support", "Legal"].map(section => (
                <div key={section}>
                    <h4 className="font-semibold mb-4">{section}</h4>
                    <ul className="space-y-2 text-sm text-opacity-70">
                        {["Link 1", "Link 2", "Link 3"].map(link => (
                            <li key={link}><a href="#" className="hover:text-primary">{link}</a></li>
                        ))}
                    </ul>
                </div>
            ))}
        </footer>
    );
}
