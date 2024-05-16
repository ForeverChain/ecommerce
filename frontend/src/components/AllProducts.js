import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, resetProducts } from "../redux/actions/productActions";
import Product from "./Product";
import Loading from "../components/Loading";

const AllProducts = () => {
    const products = useSelector((state) => state.allProducts.products);
    const featuredProduct = products.slice(0, 20);
    const renderList = featuredProduct.map((product) => {
        return <Product detail={product} key={product._id} />;
    });

    return (
        <>
            <div className="heroBottom">
                <section className="section featured hero-container">
                    <div className="title">
                        <span />
                        <h2>Дэлгүүрийн бараа бүтээгдэхүүнүүд</h2>
                        <span />
                    </div>
                    {Object.keys(products).length === 0 ? <Loading /> : <div className="products-container">{renderList}</div>}
                </section>
            </div>
        </>
    );
};

export default AllProducts;
