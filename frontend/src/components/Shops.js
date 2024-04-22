import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShops, resetShops } from "../redux/actions/shopActions";
import Loading from "./Loading";
import Shop from "./Shop";

const Shops = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByFilter, setSortByFilter] = useState("");
    const shopsData = useSelector((state) => state.shops);

    const { shops, numOfPages, sortBy, searchText } = shopsData;
    const shopsPerPage = 9;

    const changeSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const loadMoreShops = () => {
        if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 200) {
            setCurrentPage((page) => page + 1);
        }
    };

    const renderList = shops.map((shop) => {
        return <Shop detail={shop} key={shop._id} />;
    });

    const memoizedGetShops = useCallback(() => {
        if (currentPage <= numOfPages) {
            dispatch(getShops(currentPage, shopsPerPage, sortBy, searchTerm));
        }
    }, [currentPage, numOfPages, dispatch, sortBy, searchTerm]);

    useEffect(() => {
        memoizedGetShops();
    }, [dispatch, memoizedGetShops]);

    useEffect(() => {
        dispatch(resetShops());
        const delaySearchFunc = setTimeout(() => {
            setCurrentPage(0);
        }, 1500);

        window.addEventListener("scroll", loadMoreShops);

        return () => {
            clearTimeout(delaySearchFunc);
            window.removeEventListener("scroll", loadMoreShops);
        };
    }, []);

    return (
        <>
            <section class="grid grid-cols-3 gap-4 section-center mt-3">{shops.length === 0 ? <Loading /> : <>{renderList}</>}</section>
        </>
    );
};

export default Shops;
