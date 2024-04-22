import React from "react";
import NavBar from "../components/Navbar";
import PageHeading from "../components/PageHeading";
import ProductPersonDetail from "../components/ProductPersonDetail";
import Sidebar from "../components/Sidebar";
import Cart from "../components/Cart";

const ProductsPerson = () => {
    return (
        <>
            <NavBar />
            <PageHeading title="Нүүр хуудас / Дэлгүүрийн бүтээгдэхүүн" />
            <ProductPersonDetail />
            <Sidebar />
            <Cart />
        </>
    );
};

export default ProductsPerson;
