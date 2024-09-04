"use client";
import Link from "next/link";
import React from "react";
import pageRoutes from "@/utils/pageRoutes";
import useAuthHooks from "@/hooks/useAuthHooks";

const SignUp = () => {
  const { signup, handlesignupChange, handlesignupsubmit } = useAuthHooks();

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 card mt-4">
            <h2 className="text-center mb-4 mt-4 p-2">Sign Up</h2>
            <p className="text-center mb-4">
              Please fill in this form to create an account!
            </p>
            <form onSubmit={handlesignupsubmit}>
              <div className="form-group mx-4">
                <div className="row">
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      name="employee_name"
                      placeholder="Name"
                      value={signup.employee_name}
                      onChange={handlesignupChange}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Phone No"
                      value={signup.phone}
                      onChange={handlesignupChange}
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mt-4 mx-4">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={signup.email}
                  onChange={handlesignupChange}
                  required
                />
              </div>
              <div className="form-group mt-4 mx-4">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={signup.password}
                  onChange={handlesignupChange}
                  required
                />
              </div>
              <div className="form-group text-center mt-4 mx-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Sign Up
                </button>
              </div>
              <Link href={pageRoutes.LOGIN()}>
                <div className="text-center mt-3 mb-3 mx-4">
                  <p className="hint-text">
                    Already have an account? <b>Login here.</b>
                  </p>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
