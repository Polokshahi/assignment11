import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/Provider';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const navigate = useNavigate(); // Add useNavigate hook

    const link = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/rooms">Rooms</NavLink></li>
            <li><NavLink to="/bookings">My Bookings</NavLink></li>
        </>
    );

    const handleLogout = async () => {
        await logOut(); 
        setIsLoggedOut(true);
        navigate('/login'); // Redirect to login after successful logout
    };

    // Reset the logout state if the user is still logged in
    useEffect(() => {
        if (user) {
            setIsLoggedOut(false); 
        }
    }, [user]);

    return (
        <div className="navbar bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg rounded-xl mt-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {link}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl text-white">Hotel 11</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {link}
                </ul>
            </div>
            <div className="navbar-end px-2 gap-6">
                {user && user.email ? (
                    <div className="w-11 rounded-full overflow-hidden">
                        <img alt="User Avatar" src={user?.photoURL} />
                    </div>
                ) : ''}
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
