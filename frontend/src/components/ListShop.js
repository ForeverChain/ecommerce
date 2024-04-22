import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Navbar";
import PageHeading from "../components/PageHeading";
import Sidebar from "../components/Sidebar";
import Cart from "../components/Cart";
import { updateShop, getShopsBySeller, getShopDetail } from "../redux/actions/shopActions";
import { useTable } from "react-table";
import Modal from "../components/Modal"; // Import your modal component
import { FaEdit } from "react-icons/fa";
import { getShops, resetShops } from "../redux/actions/shopActions";

const ListShop = () => {
    const [submitted, setSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false); // State variable to control modal visibility
    const [selectedShop, setSelectedShop] = useState(null); // State variable to store the selected shop
    const dispatch = useDispatch();
    const userPanelLogin = useSelector((state) => state.userPanelLogin);
    const listData = useSelector((state) => state.shops.shops);
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
        const { name, description, address, image, facebook, instagram, mail, _id } = formState.values;
        const seller = userInfo?.data[0]?._id;
        if (name && description && address && image && mail && seller) {
            dispatch(updateShop(_id, { name, description, address, image, facebook, instagram, mail, seller }));
        }
    };

    const handleAction = (shopId) => {
        dispatch(getShopDetail(shopId));
    };

    const columns = React.useMemo(
        () => [
            { Header: "Нэр", accessor: "name" },
            { Header: "Гарчиг", accessor: "description" },
            { Header: "Хаяг", accessor: "address" },
            { Header: "Facebook", accessor: "facebook" },
            { Header: "Instagram", accessor: "instagram" },
            { Header: "Имэйл", accessor: "mail" },
            {
                Header: "Үйлдэлүүд",
                accessor: "actions", // You can rename 'accessor' as per your data structure
                Cell: ({ row }) => {
                    return (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <FaEdit
                                onClick={() => handleAction(row.original._id)}
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
        dispatch(getShopsBySeller(sellerId));
    }, [dispatch, sellerId]);

    return (
        <>
            <NavBar />
            <PageHeading title="Нүүр хуудас / Дэлгүүр нээх" />
            <section className="section section-center">
                <div className="container h-100">
                    <div className="d-flex justify-content-center h-100">
                        <div className="user_card content-card">
                            <h4 className="content-heading">Дэлгүүрийн жагсаалт</h4>
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
                            <div className="user_card content-card">
                                <h4 className="content-heading" style={{ width: "480px" }}>
                                    Дэлгүүр нээх
                                </h4>
                                <div className="justify-content-center form_container auth-page-container">
                                    <form onSubmit={handleSubmit} autoComplete="off">
                                        <div className="input-group">
                                            <input type="text" className={"form-control form-control-lg" + (submitted && !formState.values.name ? " is-invalid" : "")} name="name" placeholder="Нэр" onChange={handleChange} value={formState.values.name || ""} />
                                        </div>
                                        {submitted && !formState.values.name && <div className="inline-errormsg">Name is required</div>}
                                        <div className="input-group mt-3">
                                            <input type="text" className={"form-control form-control-lg" + (submitted && !formState.values.description ? " is-invalid" : "")} name="description" placeholder="Тайлбар" onChange={handleChange} value={formState.values.description || ""} />
                                        </div>
                                        {submitted && !formState.values.description && <div className="inline-errormsg">Description is required</div>}

                                        <div className="input-group mt-3">
                                            <input type="text" className={"form-control form-control-lg" + (submitted && !formState.values.address ? " is-invalid" : "")} name="address" placeholder="Хаяг" onChange={handleChange} value={formState.values.address || ""} />
                                        </div>

                                        {submitted && !formState.values.address && <div className="inline-errormsg">Description is required</div>}

                                        <div className="input-group mt-3">
                                            <input type="text" className={"form-control form-control-lg" + (submitted && !formState.values.image ? " is-invalid" : "")} name="image" placeholder="Зураг" onChange={handleChange} value={formState.values.image || ""} />
                                        </div>

                                        {submitted && !formState.values.image && <div className="inline-errormsg">Description is required</div>}
                                        <div className="input-group mt-3">
                                            <input type="text" className={"form-control form-control-lg" + (submitted && !formState.values.facebook ? " is-invalid" : "")} name="facebook" placeholder="Facebook" onChange={handleChange} value={formState.values.facebook || ""} />
                                        </div>

                                        <div className="input-group mt-3">
                                            <input type="text" className={"form-control form-control-lg" + (submitted && !formState.values.instagram ? " is-invalid" : "")} name="instagram" placeholder="Инстаграм" onChange={handleChange} value={formState.values.instagram || ""} />
                                        </div>

                                        <div className="input-group mt-3">
                                            <input type="email" className={"form-control form-control-lg" + (submitted && !formState.values.mail ? " is-invalid" : "")} name="mail" placeholder="Мэйл" onChange={handleChange} value={formState.values.mail || ""} />
                                        </div>

                                        {submitted && !formState.values.mail && <div className="inline-errormsg">Mail is required</div>}
                                        <div className="d-flex justify-content-center mt-3 login_container">
                                            <button className="btn login_btn">Илгээх</button>
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
