import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">
            {/* dashboard side bad */}
            <div className="h-64 min-h-screen bg-orange-400">

                <ui className="menu">
                   <li>
                    <NavLink to={'/dashboard/task'}>
                        Task Manager
                    </NavLink>
                   </li>

                    <div className="divider"></div>
                    <li>
                    <NavLink to={'/'}>
                        Home
                    </NavLink>
                   </li>
                </ui>
            </div>
            {/* dashboard side bar */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;