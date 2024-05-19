import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShops, resetShops } from "../redux/actions/shopActions";
import Loading from "./Loading";
import Shop from "./Shop";
import SearchBar from "../components/SearchBar";

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

  const loadMoreShops = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 200
    ) {
      setCurrentPage((page) => {
        const nextPage = page + 1;
        // Ensure we don't exceed the total number of pages
        if (nextPage <= numOfPages) {
          return nextPage;
        } else {
          return page;
        }
      });
    }
  }, [numOfPages]);

  const renderList = shops.map((shop) => {
    return <Shop detail={shop} id={shop._id} key={shop._id} />;
  });

  const memoizedGetShops = useCallback(() => {
    if (currentPage <= numOfPages) {
      dispatch(getShops(currentPage, shopsPerPage, sortBy, searchTerm));
    }
  }, [currentPage, numOfPages, dispatch, sortBy, searchTerm]);
  useEffect(() => {
    memoizedGetShops();
  }, [dispatch, memoizedGetShops, currentPage]);
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
  }, [searchTerm]);

  return (
    <>
      <div class="section-center mt-3">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <section class="grid grid-cols-3 gap-4 section-center mt-3">
        {shops.length === 0 ? <Loading /> : <>{renderList}</>}
      </section>
    </>
  );
};

export default Shops;
