"use client";
import pageRoutes from "@/utils/pageRoutes";
import Link from "next/link";
import React, { useState } from "react";
import useAuthHooks from "@/hooks/useAuthHooks";

const Login = () => {
  const { login, handleloginChange, handleloginsubmit } = useAuthHooks();

  return (
    <div>
      <section className="container-fluid row justify-content-center">
        <section className="col-12 col-sm-6 col-md-4">
          <form
            className="form-container form-group card p-5 mt-5 "
            onSubmit={handleloginsubmit}
          >
            <h4 className="text-center"> Login </h4>
            <label className="mt-4">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter username"
              name="email"
              value={login.email}
              onChange={handleloginChange}
              required
            />
            <label className="mt-4">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              value={login.password}
              onChange={handleloginChange}
              required
            />
            <button type="Sign in" className="btn btn-primary btn-block mt-4">
              Login
            </button>
            <div className="form-footer">
              <Link href={pageRoutes.SIGNUP()}>
                <p className="mt-4 ms-5">
                  Don't have an account? <b>Sign Up</b>
                </p>
              </Link>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
};

export default Login;
