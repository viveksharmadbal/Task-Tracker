"use client";
import { icons } from "@/env/icons";
import React from "react";
import Link from "next/link";
import pageRoutes from "@/utils/pageRoutes";
import Image from "next/image";

const Home = () => {
  return (
    <div>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-6 mt-4">
          {/* <Image src={icons.LOGO} alt="logo" className="img-fluid" style={{ maxHeight: "50px", width: "auto" }}></Image> */}
          <img src={icons.LOGO} alt="logo" className="img-fluid" style={{ maxHeight: "50px", width: "auto" }} />
        </div>
        <div className="col-6 mt-4 d-flex justify-content-end">
          <Link href={pageRoutes.LOGIN()}>
            <button className="btn btn-outline-light m-2">
              Login
            </button>
          </Link>
          <Link href={pageRoutes.SIGNUP()}>
            <button className="btn btn-outline-light m-2">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <div className="align-items-center">
      <h1 className="justify-content-center text-center mt-5 display-6 text-light">Welcome to Task Manager!</h1>
      </div>
      <p className="text-center mt-2 text-light">
        Get started.
      </p>
    </div>
    </div>
  );
};

export default Home;
