import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncLoginUser } from "../store/actions/UserAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmission = async (data) => {
    try {
      console.log(data);
      const user = await dispatch(asyncLoginUser(data))
      if(!user) return
      reset();
      navigate("/");
      toast.success("User Successfully Login");
    } catch (error) {
      console.log(error);
      toast.error('Login Failed!!')

    }

  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-accent p-12 flex items-center justify-center">
        <h1 className="text-4xl text-white font-bold">Welcome Back</h1>
      </div>
      <div className="p-8 flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmission)}
          className="space-y-6 w-full max-w-md mx-auto"
        >
          {/* Email */}
          <div className="relative">
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              placeholder=" "
              className="peer bg-card w-full p-3 rounded text-text focus:outline-none"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-3 text-text text-opacity-70 
               peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
               peer-focus:top-0 peer-focus:text-xs 
               peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs 
               transition-all duration-300"
            >
              Email
            </label>
            {errors.email && (
              <p className="text-red-400 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              placeholder=" "
              className="peer bg-card w-full p-3 rounded text-text focus:outline-none"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-3 text-text text-opacity-70 
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
                peer-focus:top-0 peer-focus:text-xs 
                peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs 
                transition-all duration-300"
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-400 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className="bg-accent w-full py-2 rounded text-white font-semibold hover:bg-emerald-600 transition-all duration-300">
            Login
          </button>
          <p className="text-sm text-center text-text text-opacity-70">
            Don't have an account?{" "}
            <Link to="/register" className="text-accent hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
