import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/Provider';

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const links = (
    <>
      <li><NavLink to="/" className="text-white hover:text-gray-300">Home</NavLink></li>
      <li><NavLink to="/rooms" className="text-white hover:text-gray-300">Rooms</NavLink></li>
      <li><NavLink to="/bookings" className="text-white hover:text-gray-300">My Bookings</NavLink></li>
    </>
  );

  const handleLogout = async () => {
    await logOut();
    setIsLoggedOut(true);
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      setIsLoggedOut(false);
    }
  }, [user]);


  return (
    <div className="navbar bg-[#262626] text-white shadow-lg rounded-xl mt-2">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu z-30 menu-sm dropdown-content bg-[#262626] rounded-box  mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={'/'} className="btn btn-ghost text-xl font-extrabold text-white">Hotel 11</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end px-2 gap-6">
        {user && user.email ? (
          <div className="w-11 rounded-full overflow-hidden">
            <img alt="User Avatar" src={user?.photoURL} />
          </div>
        ) : (
          ''
        )}
        {user && user.email ? (
          <button
            onClick={handleLogout}
            className="btn bg-red-500 hover:bg-red-600 text-white"
          >
            LogOut
          </button>
        ) : (
          !isLoggedOut && (
            <>
              <button className="btn bg-green-500 hover:bg-green-600 text-white">
                <NavLink to="/login">Login</NavLink>
              </button>
              <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
                <NavLink to="/register">Register</NavLink>
              </button>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default NavBar;
