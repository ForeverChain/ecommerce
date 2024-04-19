import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showCart } from "../redux/actions/cartActions";

const CartTotal = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const cartTotal = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

    const dispatch = useDispatch();
    const closeCart = () => {
        dispatch(showCart(false));
    };
    return (
        <>
            <footer>
                <h3 className="cart-total text-slanted">Нийт : {cartTotal}₮</h3>
                {cartItems.length > 0 ? (
                    <Link to="/shipping" onClick={closeCart}>
                        <button className="cart-checkout btn">Худалдан авах</button>
                    </Link>
                ) : (
                    ""
                )}
            </footer>
        </>
    );
};

export default CartTotal;
