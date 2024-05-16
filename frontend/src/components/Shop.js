import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { formattedDate } from "../common";

const Shop = (props) => {
    const { name, image, price, createdAt } = props.detail;
    const dispatch = useDispatch();

    function isValidURL(url) {
        // Regular expression to check if the string is a valid URL
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        // Test the URL against the regular expression
        return urlRegex.test(url);
    }

    // Example usage
    function isValidURL(url) {
        // Regular expression to check if the string is a valid URL
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        // Test the URL against the regular expression
        return urlRegex.test(url);
    }
    return (
        <>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-center mt-4">
                    <a href="#" class="">
                        <img class="rounded-t-lg w-full mx-auto" src={image && isValidURL(image) ? image : "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"} alt="" style={{ width: "auto", height: "200px" }} />
                    </a>
                </div>
                <div class="p-4">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{formattedDate(createdAt)}-аас хойш </p>
                    <Link to={`/productsPerson`} href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Shop;
