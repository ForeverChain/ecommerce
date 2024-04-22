import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Filters from "./Filters";
import Product from "./Product";
import { getProducts, resetProducts } from "../redux/actions/productActions";
import Loading from "../components/Loading";

const ProductPersonDetail = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [priceFilter, setPriceFilter] = useState(10000);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByFilter, setSortByFilter] = useState("");
    const [filter, setFilter] = useState("");
    const allProducts = useSelector((state) => state.allProducts);
    const { products, numOfPages, sortBy, searchText, price } = allProducts;
    const productsPerPage = 9;

    const userPanelLogin = useSelector((state) => state.userPanelLogin);
    const { userInfo } = userPanelLogin;

    const changePrice = (e) => {
        setPriceFilter(e.target.value);
    };

    const changeSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const loadMoreProduct = (e) => {
        if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 200) {
            setCurrentPage((page) => page + 1);
        }
    };

    const renderList = products.map((product) => {
        return <Product detail={product} key={product._id} />;
    });

    const memoizedGetProducts = useCallback(() => {
        if (currentPage <= numOfPages) {
            dispatch(getProducts(currentPage, productsPerPage, sortBy, searchTerm, price, userInfo?.data[0]?._id));
        }
    }, [currentPage, numOfPages, sortBy, searchTerm, price, dispatch]);

    useEffect(() => {
        memoizedGetProducts();
    }, [memoizedGetProducts]);

    //Call Function after stop typing text
    useEffect(() => {
        dispatch(resetProducts());
        const delaySearchFunc = setTimeout(() => {
            setCurrentPage(0);
            setFilter(searchTerm + priceFilter);
        }, 1500);

        window.addEventListener("scroll", loadMoreProduct);

        return () => {
            clearTimeout(delaySearchFunc);
            window.removeEventListener("scroll", loadMoreProduct);
        };
    }, [searchTerm, priceFilter]);

    const handleSortBy = (e) => {
        const sortByValue = e.target.value;
        setCurrentPage(0);
        dispatch(getProducts(currentPage, productsPerPage, sortByValue, searchTerm, price));
    };

    return (
        <>
            <section className="products-container section-center">{Object.keys(products).length === 0 ? <Loading /> : <div className="mt-3">{renderList}</div>}</section>
        </>
    );
};

export default ProductPersonDetail;
