import React, { useContext } from "react";
import "./Register.css";
import logo from "../../assets/register/icon.png";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { signUpUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signUpUser(data.email, data.password).then((res) => {
      if (res) {
        const userInfo = { name: data.name, email: data.email, role: "user" };
        axios
          .post("https://e-ticket-server-pi.vercel.app/users", userInfo)
          .then((res) => {
            if (res) {
              Swal.fire({
                title: "Registration Success!",

                icon: "success",
              });
            }
            navigate("/dashboard");
          });
      }
    });
  };
  return (
    <div className="registerbg">
      <div>
        <div className="card bg-base-100 w-96 max-w-sm shrink-0 shadow-lg">
          <img src={logo} className="w-40 mx-auto my-5" alt="" />
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <input
                {...register("name", { required: true })}
                aria-invalid={errors.name ? "true" : "false"}
                type="text"
                placeholder="নাম "
                className="input input-bordered border-2 p-2 w-full"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-800 my-2" role="alert">
                  Name is required
                </p>
              )}
            </div>
            <div className="form-control">
              <input
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
                type="email"
                placeholder="ইমেইল"
                className="input input-bordered border-2 p-2 w-full"
                required
              />
              {errors.email?.type === "required" && (
                <p className="text-red-800 my-2" role="alert">
                  Email is required
                </p>
              )}
            </div>
            <div className="form-control">
              <input
                {...register("password", { required: true })}
                aria-invalid={errors.password ? "true" : "false"}
                type="password"
                placeholder="পাসওয়ার্ড"
                className="input input-bordered border-2 p-2 w-full"
                required
              />
              {errors.password?.type === "required" && (
                <p className="text-red-800 my-2" role="alert">
                  Password is required
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              {/* <button
                onClick={handleSubmit(onSubmit)}
                className="btn w-full bg-green-800 text-white mb-5"
              >
                রেজিস্টার করুন
              </button> */}
              <input
                className="btn w-full bg-green-800 text-white mb-5"
                type="submit"
                value="রেজিস্টার করুন"
              />
            </div>
            <p className="text-center">
              অ্যাকাউন্ট আছে ?{" "}
              <Link to={"/login"}>
                <span className="text-red-800">লগইন</span>{" "}
              </Link>
              করুন
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
