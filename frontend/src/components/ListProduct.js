import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./Navbar";
import PageHeading from "./PageHeading";
import Sidebar from "./Sidebar";
import Cart from "./Cart";
import { updateProduct, productBySeller, setProductDetail, getProductsBySeller } from "../redux/actions/productActions";
import { useTable } from "react-table";
import Modal from "./Modal"; // Import your modal component
import { FaEdit } from "react-icons/fa";
import { getShops, resetShops } from "../redux/actions/shopActions";

const ListShop = () => {
    const [submitted, setSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false); // State variable to control modal visibility
    const [selectedShop, setSelectedShop] = useState(null); // State variable to store the selected shop
    const dispatch = useDispatch();
    const userPanelLogin = useSelector((state) => state.userPanelLogin);
    const listData = useSelector((state) => state.allProducts.products);
    const { userInfo } = userPanelLogin;
    const sellerId = userInfo?.data[0]?._id;
    const [formState, setFormState] = useState({ values: {} });
    const handleChange = (event) => {
        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
            },
        }));
    };

    const handleOpenModal = (shop) => {
        setFormState({ values: shop }); // Set formState with the selected shop data
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const { title, description, address, image, categories, color, price, stock, _id } = formState.values;
        const seller = userInfo?.data[0]?._id;

        dispatch(updateProduct(_id, { title, description, address, image, categories, color, price, stock, seller }));
    };

    const columns = React.useMemo(
        () => [
            { Header: "Нэр", accessor: "title" },
            { Header: "Гарчиг", accessor: "description" },
            { Header: "Хаяг", accessor: "address" },
            { Header: "Төрөл", accessor: "categories" },
            { Header: "Өнгө", accessor: "color" },
            { Header: "Үнэ", accessor: "price" },
            { Header: "Тоо хэмжээ", accessor: "stock" },
            {
                Header: "Үйлдэлүүд",
                accessor: "actions", // You can rename 'accessor' as per your data structure
                Cell: ({ row }) => {
                    return (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <FaEdit
                                style={{ fontSize: "1.5em", cursor: "pointer" }} // Adjust the font size as needed
                            />
                        </div>
                    );
                },
            },
        ],
        []
    );

    const data = listData || [];

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    useEffect(() => {
        dispatch(resetShops());
        dispatch(getProductsBySeller(sellerId));
    }, [dispatch, sellerId]);

    return (
        <>
            <NavBar />
            <PageHeading title="Нүүр хуудас / Дэлгүүр нээх" />
            <section className="section section-center">
                <div className="container h-100">
                    <div className="d-flex justify-content-center h-100">
                        <div className="user_card content-card">
                            <h4 className="content-heading">Барааны жагсаалт</h4>
                            <div className="justify-content-center form_container auth-page-container">
                                <form onSubmit={handleSubmit} autoComplete="off">
                                    {/* Your form content here */}
                                </form>
                            </div>
                            <table {...getTableProps()} className="table">
                                <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()} onClick={() => handleOpenModal(row.original)}>
                                                {row.cells.map((cell) => (
                                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <Sidebar />
            <Cart />
            {showModal && (
                <Modal onClose={handleCloseModal}>
                    {/* Render detailed shop information inside the modal */}
                    <div className="container h-100">
                        <div className="d-flex justify-content-center h-100">
                            <div className="user_card content-card" style={{ width: "480px" }}>
                                <h4 className="content-heading">Дэлгүүр нээх</h4>
                                <div className="justify-content-center form_container auth-page-container">
                                    <form onSubmit={handleSubmit} autoComplete="off">
                                        <div className="input-group">
                                            <input type="text" className={"form-control form-control-lg" + (submitted && !formState.values.title ? " is-invalid" : "")} name="title" placeholder="Гарчиг" onChange={handleChange} value={formState.values.title} />
                                        </div>

                                        {submitted && !formState.values.title && <div className="inline-errormsg">Title is required</div>}
                                        <div className="input-group mt-3">
                                            <input type="text" className={"form-control form-control-lg" + (submitted && !formState.values.description ? " is-invalid" : "")} name="description" placeholder="Тайлбар" onChange={handleChange} value={formState.values.description} />
                                        </div>
                                        {submitted && !formState.values.description && <div className="inline-errormsg">Description is required</div>}

                                        {submitted && !formState.values.categories && <div className="inline-errormsg">Image URL is required</div>}
                                        <div className="input-group mt-3">
                                            <select className={"form-control form-control-lg" + (submitted && !formState.values.categories ? " is-invalid" : "")} name="categories" onChange={handleChange} value={formState.values.categories}>
                                                <option value="">Сонгоорой</option>
                                                <option value="Эрэгтэй">Эрэгтэй</option>
                                                <option value="Эмэгтэй">Эмэгтэй</option>
                                            </select>
                                        </div>

                                        <div className="input-group mt-3">
                                            <input type="text" className={"form-control form-control-lg" + (submitted && !formState.values.image ? " is-invalid" : "")} name="image" placeholder="Image URL" onChange={handleChange} value={formState.values.image} />
                                        </div>
                                        {submitted && !formState.values.image && <div className="inline-errormsg">Image URL is required</div>}

                                        {submitted && !formState.values.categories && <div className="inline-errormsg">Categories are required</div>}
                                        <div className="input-group mt-3">
                                            <input type="text" className={"form-control form-control-lg" + (submitted && !formState.values.color ? " is-invalid" : "")} name="color" placeholder="Өнгө" onChange={handleChange} value={formState.values.color} />
                                        </div>
                                        {submitted && !formState.values.color && <div className="inline-errormsg">Color is required</div>}
                                        <div className="input-group mt-3">
                                            <input type="number" className={"form-control form-control-lg" + (submitted && !formState.values.price ? " is-invalid" : "")} name="price" placeholder="Үнэ" onChange={handleChange} value={formState.values.price} />
                                        </div>
                                        {submitted && !formState.values.price && <div className="inline-errormsg">Price is required</div>}
                                        <div className="input-group mt-3">
                                            <input type="number" className={"form-control form-control-lg" + (submitted && !formState.values.stock ? " is-invalid" : "")} name="stock" placeholder="Тоо хэмжээ" onChange={handleChange} value={formState.values.stock} />
                                        </div>
                                        {submitted && !formState.values.stock && <div className="inline-errormsg">Stock is required</div>}
                                        <div className="d-flex justify-content-center mt-3 login_container">
                                            <button className="btn login_btn">Оруулах</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ListShop;
