import React from "react";
import "./Register.css";
import logo from "../../assets/register/icon.png";

const Register = () => {
  return (
    <div className="registerbg">
      <div>
        <div className="card bg-base-100 w-96 max-w-sm shrink-0 shadow-lg">
          <img src={logo} className="w-40 mx-auto my-5" alt="" />
          <form className="card-body">
            <div className="form-control">
              <input
                type="email"
                placeholder="ইমেইল"
                className="input input-bordered border-2 p-2"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="পাসওয়ার্ড"
                className="input input-bordered border-2 p-2"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn w-full bg-green-800 text-white mb-5">
                লগইন করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
