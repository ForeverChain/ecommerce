import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            <i className="fa fa-home menu-icon" aria-hidden="true"></i>
                            <span className="menu-title">Дашбоард</span>
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">
                            <i className="fa fa-cube menu-icon" />
                            <span className="menu-title">Бараанууд</span>
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/categories">
                            <i className="fa fa-list menu-icon" />
                            <span className="menu-title">Төрлүүд</span>
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/orders">
                            <i className="fa fa-shopping-cart menu-icon" />
                            <span className="menu-title">Захиалгууд</span>
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/users">
                            <i className="fa fa-user menu-icon" />
                            <span className="menu-title">Хэрэглэгчид</span>
                        </Link>
                    </li> */}
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;
