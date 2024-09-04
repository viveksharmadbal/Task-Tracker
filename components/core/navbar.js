"use client"
import React from 'react';
import Link from 'next/link';
import pageRoutes from '@/utils/pageRoutes';

const Navbar = () => {
  return (
    <nav className='d-flex bg-black text-light p-3 align-items-center'>
      <Link href={pageRoutes.DASHBOARD()}> 
        <div className='me-auto text-light'>Dashboard</div>
      </Link>
      <ul className='d-flex ms-auto'>
        <li className='ms-3'>
          <Link href={pageRoutes.EMPLOYEE()} className="text-light">Employee</Link>
        </li>
        <li className='ms-3'>
          <Link href={pageRoutes.PROJECT()} className="text-light">Project</Link>
        </li>
        <li className='ms-3'>
          <Link href={pageRoutes.ROLE()} className="text-light">Role</Link>
        </li>
        <li className='ms-3'>
          <Link href={pageRoutes.ASSIGN_PROJECT()} className="text-light">Assign Project</Link>
        </li>
        {/* <li className='ms-3'>
          <Link href={pageRoutes.ATTENDANCE()} className="text-light">Attendance</Link>
        </li> */}
        <li className='ms-3'>
          <Link href={pageRoutes.TASK_TRACKER()} className="text-light">Task</Link>
        </li>
        {/* <li className='ms-3'>
          <Link href={pageRoutes.TASK_TRACKER()} className="text-light">Task Tracker</Link>
        </li> */}
        <li className='ms-3'>
          <Link href={pageRoutes.HOME_PAGE()} className="text-light">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
