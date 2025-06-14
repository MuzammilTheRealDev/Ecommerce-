console.log("Register component loaded");

import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { asyncRegisterUser } from "../store/actions/UserAction";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const password = watch('password')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmission = async (data) => {
    try {
      setLoading(true)
      console.log(data);
      delete data.confirmPassword;
      const user = {
        id: nanoid(),
        ...data,
        isAdmin:false
      }

      await dispatch(asyncRegisterUser(user))
      toast.success('User Registered Successfully')
      reset();
      navigate('/login')
    } catch (error) {
      toast.error('Registration failed')
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-background text-text">
      {/* Left Side */}
      <div className="bg-gradient-to-br from-primary to-accent flex items-center justify-center p-12">
        <h1 className="text-4xl font-bold text-white">Create Your Account</h1>
      </div>

      {/* Right Side - Register Form */}
      <div className="p-8 flex flex-col justify-center">
        <form onSubmit={handleSubmit(onSubmission)} className="space-y-6 w-full max-w-md mx-auto">
          {/* Name */}
          <div className="relative">
            <input
              {...register('name', { required: "Name is required" })}
              type="text"
              id="name"
              placeholder=" "
              className="peer bg-card w-full p-3 rounded text-text focus:outline-none"
            />
            <label
              htmlFor="name"
              className="absolute left-3 top-3 text-text text-opacity-70 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm transition-all duration-300 peer-focus:top-0 peer-focus:text-xs"
            >
              Full Name
            </label>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          </div>

          {/* Email */}
          <div className="relative">
            <input
              {...register('email',
                {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })
              }
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              {...register('password',
                {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be atlest 6 character"
                  }
                })}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              {...register('confirmPassword',
                {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match"
                })
              }
              type="password"
              id="confirmPassword"
              placeholder=" "
              className="peer bg-card w-full p-3 rounded text-text focus:outline-none"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 top-3 text-text text-opacity-70 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm transition-all duration-300 peer-focus:top-0 peer-focus:text-xs"
            >
              Confirm Password
            </label>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="bg-accent w-full py-2 rounded text-white font-semibold hover:bg-emerald-600 transition-all duration-300">
            {loading ? "Registering..." : 'Register'}
          </button>

          <p className="text-sm text-center text-text text-opacity-70">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}