import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CartIcon, CubeIcon, HomeIcon, LoginIcon, RegisterIcon } from "./icon";
import { useSelector } from "react-redux";


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.user.users)



    const navLinks = [
        { name: "Home", to: "/", icon: HomeIcon },
        { name: "Products", to: "/products", icon: CubeIcon },
        ...(!user
            ? [
                { name: "Login", to: "/login", icon: LoginIcon },
                { name: "Register", to: "/register", icon: RegisterIcon },
            ]
            : [
                { name: "Cart", to: "/cart", icon: CartIcon },
                ...(user?.isAdmin ?
                    [{ name: "Create Product", to: "/admin/create-product", icon: RegisterIcon }] : []
                ),
                { name: "Setting", to: "/user-profile", icon: RegisterIcon },

            ]),
    ];


    return (
        <nav className="bg-[#0f172a] text-[#f1f5f9]">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <NavLink
                    to="/"
                    className="text-2xl font-bold text-indigo-400"
                >
                    MyShop
                </NavLink>

                {/* Hamburger */}
                <button
                    className="md:hidden text-[#f1f5f9] focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center">
                    {navLinks.map(({ name, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-1 hover:text-indigo-400 transition-all duration-300 ${isActive ? "text-indigo-400" : "text-[#f1f5f9]/90"
                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            {name}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3">
                    {navLinks.map(({ name, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => {
                                setIsOpen(false);

                            }
                            }
                            className={({ isActive }) =>
                                `flex items-center gap-2 py-2 border-b border-slate-700 hover:text-indigo-400 transition-all duration-300 ${isActive ? "text-indigo-400" : "text-[#f1f5f9]/90"
                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            {name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default NavBar;
