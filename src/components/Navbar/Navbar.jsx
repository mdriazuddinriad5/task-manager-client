import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut().then().catch()
    }


    const navLinks = <>
        <li><NavLink to={'/'} className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#008080] underline" : ""
        }>Home</NavLink></li>

        {
            user && <li><NavLink to={'/dashboard/task'} className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#008080] underline" : ""
            }>Dashboard</NavLink></li>
        }

        {
            user ? <>

                <p className="mr-2 text-blue-400 font-bold ">{user.displayName}</p>
                <img className="w-8 rounded-full mr-2" src={user.photoURL} />

                <a onClick={handleLogOut} href=""><button className="btn btn-sm">Sign Out</button></a>



            </> :
                <li><NavLink to={'/login'} className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-[#008080] underline" : ""
                }>Login</NavLink></li>
        }



    </>
    return (
        <div className="navbar w-5/6 mx-auto rounded-xl">
            {/* bg-[#ff6b6b] */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-black text-white rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>

            </div>
            <div className="navbar-center hidden md:flex md:ml-20 lg:ml-0">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
          

        </div>
    );
};

export default NavBar;