import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteUser, asyncLogoutUser, asyncUpdateUser } from "../../store/actions/UserAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
    const { users } = useSelector((state) => state.user)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: users?.name,
            email: users?.email,
            password: ''
        }
    });

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onSubmission = (data) => {
        dispatch(asyncUpdateUser(users.id, data));
        console.log(data);
    }

    const deleteHandler = () => {
        dispatch(asyncDeleteUser(users.id))
        navigate('/login')
        toast.message('User deleted successfully')

    }

    const logoutHandler = () => {
        dispatch(asyncLogoutUser());
        toast.success('User Logout Successfully')
        navigate('/login')
    }

    return users ? (
        <div className="min-h-screen bg-background text-text p-8">
            <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-xl space-y-6">
                <h1 className="text-3xl font-semibold text-center mb-4">User Profile</h1>

                {/* User Info Display */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center overflow-hidden">
                            <img
                                src="/placeholder-avatar.jpg"
                                alt="User Avatar"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <p className="mt-2 text-sm text-opacity-70">Profile Picture</p>
                    </div>

                    {/* User Info Form */}
                    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmission)}>
                        <div>
                            <label className="block mb-1 text-sm">Full Name</label>
                            <input
                                {...register('name', { required: "Name is required" })}
                                type="text"
                                className="w-full p-2 rounded bg-slate-800 text-text focus:outline-none"
                            />
                            {errors.name && (
                                <p className="text-red-400 mt-1 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm">Email</label>
                            <input
                                {...register('email', { required: "Email is required" })}
                                type="email"
                                className="w-full p-2 rounded bg-slate-800 text-text focus:outline-none"
                            />
                            {errors.email && (
                                <p className="text-red-400 mt-1 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm">New Password</label>
                            <input
                                {...register('password', { required: "Password is required" })}
                                type="password"
                                className="w-full p-2 rounded bg-slate-800 text-text focus:outline-none"
                            />
                            {errors.password && (
                                <p className="text-red-400 mt-1 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-accent py-2 rounded text-white hover:bg-emerald-600 transition-all duration-300"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* Divider */}
                <hr className="border-slate-600" />

                {/* Actions */}
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <button onClick={deleteHandler} className="w-full md:w-auto bg-red-600 px-6 py-2 rounded text-white hover:bg-red-700 transition-all duration-300">
                        Delete Account
                    </button>

                    <button onClick={logoutHandler} className="w-full md:w-auto bg-indigo-600 px-6 py-2 rounded text-white hover:bg-indigo-700 transition-all duration-300">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    ) : "Loading";
}
