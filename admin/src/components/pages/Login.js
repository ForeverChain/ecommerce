import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../redux/actions/userActions";

const LoginPage = ({ history }) => {
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [formState, setFormState] = useState({
        values: {},
    });

    const handleChange = (event) => {
        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const { email, password } = formState.values;
        if (email && password) {
            dispatch(Login(email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            history.push("/");
        }
    }, [userInfo, history]);

    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        <img src="https://zary.mn/27a395c08037dc4652ee51434e509bb1.png" style={{ maxHeight: "48px", width: "auto" }} className="nav-logo" alt="logo" />
                                    </div>
                                    <h4>Тавтай морил</h4>
                                    <h6 className="fw-light">Үргэжлүүлэхийн тулд нэвтрэх.</h6>
                                    <form className="pt-3" onSubmit={handleSubmit} autoComplete="off">
                                        <div className="form-group">
                                            <input type="email" className={"form-control form-control-lg" + (submitted && !formState.values.email ? " is-invalid" : "")} name="email" placeholder="Имэйл" onChange={handleChange} value={formState.values.email || ""} />
                                            {submitted && !formState.values.email && <div className="inline-errormsg">Email is required</div>}
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className={"form-control form-control-lg" + (submitted && !formState.values.password ? " is-invalid" : "")} name="password" placeholder="Нууц үг" onChange={handleChange} value={formState.values.password || ""} />
                                            {submitted && !formState.values.password && <div className="inline-errormsg">Password is required</div>}
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Нэвтрэх</button>
                                        </div>
                                        <div className="my-2 d-flex justify-content-between align-items-center">
                                            <div className="form-check"></div>
                                            <a href="#" className="auth-link text-black">
                                                Нууц үгээ мартсан уу?
                                            </a>
                                        </div>
                                        <div className="text-center mt-4 fw-light">
                                            Хаягаа нээж амжаагүй юу?{" "}
                                            <Link to="/register" className="text-primary">
                                                Шинээр нээх
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
