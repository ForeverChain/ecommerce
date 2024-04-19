import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Navbar";
import PageHeading from "../components/PageHeading";
import ProductDetail from "../components/ProductDetail";
import Sidebar from "../components/Sidebar";
import Cart from "../components/Cart";
import { Link, useHistory } from "react-router-dom";
import { showCart } from "../redux/actions/cartActions";
import { createOrder, processPayment } from "../redux/actions/orderActions";
import axios from "axios";

const PaymentForm = () => {
    const history = useHistory();

    const [submitted, setSubmitted] = useState(false);
    const [btnDisable, setBtnDisable] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [showCardPayment, setShowCardPayment] = useState(false);
    const userInfo = useSelector((state) => state.userPanelLogin.userInfo.data);
    const user = userInfo[0]._id;

    const dispatch = useDispatch();

    const cardElementOptions = {
        hidePostalCode: true,
        style: {
            base: {
                color: "#303238",
                fontSize: "18px",
            },
            invalid: {
                color: "#e5424d",
                ":focus": {
                    color: "#303238",
                },
            },
        },
    };

    const shippingAddress = useSelector((state) => state.cart.shippingAddress);
    const { street1, street2, city, state, zip, country } = shippingAddress;

    const cartItems = useSelector((state) => state.cart.cartItems);
    const orderItems = [];
    const cartItemsList = cartItems.map((product) => {
        const { name, qty, image, price, id } = product;
        orderItems.push({
            name,
            qty,
            image,
            price,
            product: id,
        });
    });

    const itemsPrice = orderItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = (0.15 * itemsPrice).toFixed(2);
    const totalPrice = ((parseFloat(itemsPrice) + parseFloat(shippingPrice) + parseFloat(taxPrice)) * 100).toFixed();

    //Redirect to shipping page if address is not filled
    if (cartItems.length === 0) {
        history.push("/");
    }

    //Redirect to shipping page if address is not filled
    if (Object.keys(shippingAddress).length === 0) {
        history.push("/shipping");
    }

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

    let cardElement = null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setBtnDisable(true);

        if (showCardPayment) {
            dispatch(processPayment({ orderItems, shippingAddress, paymentMethod, user, itemsPrice, shippingPrice, taxPrice, totalPrice, price: totalPrice, isPaid: true }));
        } else {
            if (orderItems && shippingAddress && paymentMethod) {
                dispatch(createOrder({ orderItems, shippingAddress, paymentMethod, user, itemsPrice, shippingPrice, taxPrice, totalPrice }));
                history.push("/");
            }
        }
    };

    const changePaymentMethod = (e) => {
        if (e.target.value === "card") {
            setShowCardPayment(true);
            setPaymentMethod("Card");
        } else {
            setShowCardPayment(false);
            setPaymentMethod("Cash on Delivery");
        }
    };

    const handleCardError = (event) => {
        let displayError = document.getElementById("card-errors");
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = "";
        }

        if (event.complete) {
            setBtnDisable(false);
        } else {
            setBtnDisable(true);
        }
    };

    useEffect(() => {
        dispatch(showCart(false));

        if (showCardPayment) {
            return function cleanupListener() {
                cardElement.removeEventListener("change", handleCardError);
            };
        }
    }, [showCardPayment]);

    return (
        <>
            <NavBar />
            <PageHeading title="Нүүр хуудас / Төлбөрийн хэсэг" />
            <section className="section section-center">
                <div className="container h-100">
                    <div className="d-flex justify-content-center h-100">
                        <div className="user_card content-card payment-page-content">
                            <h4 className="content-heading">Төлбөрийн мэдээлэл</h4>
                            <div className="d-flex justify-content-center form_container auth-page-container payment-page-container">
                                <form onSubmit={handleSubmit} autoComplete="off">
                                    <div className="alert-danger" id="card-errors"></div>
                                    <div className="input-group mt-3">
                                        <select className="form-control form-control-lg" id="paymentType" onChange={changePaymentMethod}>
                                            <option value="cod">Гараас төлөх</option>
                                            <option value="card">Кардаар төлөх</option>
                                        </select>
                                    </div>
                                    {showCardPayment ? (
                                        <div className="input-group mt-3">
                                            <div className="card-number"></div>
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                    <div className="d-flex justify-content-center mt-3 login_container">
                                        <button className="btn login_btn" disabled={btnDisable}>
                                            {submitted ? <i className="fas fa-spinner fa-spin"></i> : "Захиалах"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Sidebar />
            <Cart />
        </>
    );
};

export default PaymentForm;
