import React from "react";
import NavBar from "../components/Navbar";
import PageHeading from "../components/PageHeading";
import Shops from "../components/Shops";
import Sidebar from "../components/Sidebar";
import Cart from "../components/Cart";

const ShopPage = () => {
    return (
        <>
            <NavBar />
            <PageHeading title="Нүүр хуудас / Дэлгүүр" />
            <Shops />
            <Sidebar />
            <Cart />
        </>
    );
};

export default ShopPage;
