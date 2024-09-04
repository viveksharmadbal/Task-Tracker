"use client"
import icons from "@/env/icons";
import React, { useState } from "react";
import Link from "next/link";
import pageRoutes from "@/utils/pageRoutes";

const Header = () => {
  const [show, setshow]=useState(false)
  const [shownavbar,setshownavbar]=useState(false)
  return (
    <div className="row">
      <header className="container-fluid p-1 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={icons.LOGO} alt="logo" className="logo" />
          <div className="d-flex align-items-center">
          {shownavbar &&(
            <>
            <Link href={pageRoutes.HOME_PAGE()}>
              <button className="btn btn-outline-light m-2">Home</button>
            </Link>
            <Link href={pageRoutes.EMPLOYEE()}>
              <button className="btn btn-outline-light m-2">Employee</button>
            </Link>
            <Link href={pageRoutes.PROJECT()}>
              <button className="btn btn-outline-light m-2">Project</button>
            </Link>
            <Link href={pageRoutes.TASK()}>
              <button className="btn btn-outline-light m-2">Task</button>
            </Link>
            <Link href={pageRoutes.ROLE()}>
              <button className="btn btn-outline-light m-2">Role</button>
            </Link>
            </>
          )}
          </div>
        </div>
        <div>
          <Link href={pageRoutes.LOGIN()}>
            <button className="btn btn-outline-light m-2" onClick={()=>setshow(true)}>Login</button>
          </Link>
          {show &&(
            <>
          <Link href={pageRoutes.LOGOUT()}>
            <button className="btn btn-outline-light m-2">Logout</button>
          </Link>
          <Link href={pageRoutes.SIGNUP()}>
            <button className="btn btn-outline-light m-2">Sign Up</button>
          </Link>
          </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
