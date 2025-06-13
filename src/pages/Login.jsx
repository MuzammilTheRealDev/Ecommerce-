import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmission = (data) => {
    console.log(data);

    reset();
    

  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-accent p-12 flex items-center justify-center">
        <h1 className="text-4xl text-white font-bold">Welcome Back</h1>
      </div>
      <div className="p-8 flex flex-col justify-center">
        <form onSubmit={handleSubmit(onSubmission)} className="space-y-6 w-full max-w-md mx-auto">
          {/* Email */}
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder=" "
              className="peer bg-card w-full p-3 rounded text-text focus:outline-none"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-3 text-text text-opacity-70 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm transition-all duration-300 peer-focus:top-0 peer-focus:text-xs"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              {...register('password')}
              type="password"
              id="password"
              placeholder=" "
              className="peer bg-card w-full p-3 rounded text-text focus:outline-none"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-3 text-text text-opacity-70 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm transition-all duration-300 peer-focus:top-0 peer-focus:text-xs"
            >
              Password
            </label>
          </div>
          <button className="bg-accent w-full py-2 rounded text-white font-semibold hover:bg-emerald-600 transition-all duration-300">Login</button>
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
