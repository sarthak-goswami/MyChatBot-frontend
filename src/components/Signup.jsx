import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [result, setResult] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    const res = await fetch(`http://localhost:5000/user/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if(data.successfull) Navigate("/conversations")
    console.log(data);
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-850 to-indigo-800 px-4 py-10">
      <div className="mx-auto flex w-full max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-white">
            Create Account
          </h2>
          <p className="mb-8 text-center text-sm text-slate-300">
            Join now and start your journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="johndoe"
                className="w-full rounded-lg border border-slate-600/60 bg-slate-900/70 px-4 py-3 text-slate-100 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-600/60 bg-slate-900/70 px-4 py-3 text-slate-100 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="*********"
                className="w-full rounded-lg border border-slate-600/60 bg-slate-900/70 px-4 py-3 text-slate-100 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:scale-[1.01] hover:brightness-110 active:scale-[0.99]"
            >
              Sign Up
            </button>
          </form>
          <p
            className={
              result.successfull == true ? `text-green-400` : `text-red-500`
            }
          >
            {result.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
