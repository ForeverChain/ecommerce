import { Link, useHistory } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import logo from "../images/logo.svg";
import minilogo from "../images/logo-mini.svg";
import profilePic from "../images/faces/face8.jpg";

const Header = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    const {
        userLogin: {
            userInfo: { data },
        },
    } = useSelector((state) => state);

    let today = new Date();
    let curHr = today.getHours();
    let userMessage = "";

    if (curHr < 12) {
        userMessage = "Өглөөний мэнд";
    } else if (curHr < 18) {
        userMessage = "Өдрийн мэнд";
    } else {
        userMessage = "Оройн мэнд";
    }

    return (
        <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
                <div className="me-3">
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize">
                        <span className="icon-menu" />
                    </button>
                </div>
                <div>
                    <Link className="navbar-brand brand-logo" to="/products">
                        <img src="https://zary.mn/27a395c08037dc4652ee51434e509bb1.png" style={{ maxHeight: "24px", width: "auto" }} className="nav-logo" alt="logo" />
                    </Link>
                    <Link className="navbar-brand brand-logo-mini" to="/products">
                        <img src={minilogo} alt="logo" />
                    </Link>
                </div>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-top">
                <ul className="navbar-nav">
                    <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
                        <h1 className="welcome-text">
                            {userMessage}, <span className="text-black fw-bold">{data && data[0].name}</span>
                        </h1>
                        <h3 className="welcome-sub-text">Таны энэ долоо хоногийн ажлын тойм </h3>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown d-none d-lg-block user-dropdown">
                        <a className="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className="img-xs rounded-circle" src={profilePic} alt="Profile image" />{" "}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                            <div className="dropdown-header text-center">
                                <img className="img-md rounded-circle" src={profilePic} alt="Profile image" />
                                {/* <p className="mb-1 mt-3 font-weight-semibold">Allen Moreno</p>
                                <p className="fw-light text-muted mb-0">allenmoreno@gmail.com</p> */}
                            </div>
                            {/* <a className="dropdown-item">
                                <i className="dropdown-item-icon mdi mdi-account-outline text-primary me-2" /> My Profile <span className="badge badge-pill badge-danger">1</span>
                            </a>
                            <a className="dropdown-item">
                                <i className="dropdown-item-icon mdi mdi-message-text-outline text-primary me-2" /> Messages
                            </a>
                            <a className="dropdown-item">
                                <i className="dropdown-item-icon mdi mdi-calendar-check-outline text-primary me-2" /> Activity
                            </a>
                            <a className="dropdown-item">
                                <i className="dropdown-item-icon mdi mdi-help-circle-outline text-primary me-2" /> FAQ
                            </a> */}
                            <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                                <i className="dropdown-item-icon mdi mdi-power text-primary me-2" />
                                Системээс Гарах
                            </Link>
                        </div>
                    </li>
                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas">
                    <span className="mdi mdi-menu" />
                </button>
            </div>
        </nav>
    );
};

export default Header;
