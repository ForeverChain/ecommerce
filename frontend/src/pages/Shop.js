import React, { useState } from "react";
import NavBar from "../components/Navbar";
import PageHeading from "../components/PageHeading";
import Shops from "../components/Shops";
import Sidebar from "../components/Sidebar";
import Cart from "../components/Cart";
import Footer from "../components/Footer";

const ShopPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
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
