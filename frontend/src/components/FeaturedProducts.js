import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, resetProducts } from "../redux/actions/productActions";
import Product from "./Product";
import Loading from "../components/Loading";

const FeaturedProducts = () => {
    const products = useSelector((state) => state.allProducts.products);
    const featuredProduct = products.slice(0, 6);
    const renderList = featuredProduct.map((product) => {
        return <Product detail={product} key={product._id} />;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetProducts());
        dispatch(getProducts(0, 6, "", "", ""));
    }, []);

    return (
        <>
            <section className="section featured">
                <div className="title">
                    <span />
                    <h2>Онцлох бүтээгдэхүүн</h2>
                    <span />
                </div>
                {Object.keys(products).length === 0 ? <Loading /> : <div className="section-center featured-center">{renderList}</div>}

                <Link to="/products" className="btn">
                    Бүх бүтээгдэхүүн
                </Link>
            </section>
        </>
    );
};

export default FeaturedProducts;
