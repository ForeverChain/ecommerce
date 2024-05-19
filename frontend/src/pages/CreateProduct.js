import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Navbar";
import PageHeading from "../components/PageHeading";
import ProductDetail from "../components/ProductDetail";
import Sidebar from "../components/Sidebar";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";
import { Login } from "../redux/actions/userActions";
import { addProducts } from "../redux/actions/productActions";
import {
  updateShop,
  getShopsBySeller,
  getShopDetail,
} from "../redux/actions/shopActions";
import { getShops, resetShops } from "../redux/actions/shopActions";

const CreateProduct = () => {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const userPanelLogin = useSelector((state) => state.userPanelLogin);
  const { userInfo } = userPanelLogin;

  const listData = useSelector((state) => state.shops.shops);

  const [formState, setFormState] = useState({
    values: {},
  });
  const sellerId = userInfo?.data[0]?._id;

  useEffect(() => {
    dispatch(resetShops());
    dispatch(getShopsBySeller(sellerId));
  }, [dispatch, sellerId]);

  console.log("listData", listData);

  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const {
      title,
      description,
      address,
      image,
      categories,
      color,
      price,
      stock,
      shop,
    } = formState.values;

    const seller = userInfo?.data[0]?._id;

    if (
      title &&
      description &&
      address &&
      image &&
      categories &&
      color &&
      price &&
      stock &&
      seller &&
      shop
    ) {
      dispatch(
        addProducts({
          title,
          description,
          address,
          image,
          categories,
          color,
          price,
          stock,
          seller,
          shop,
        })
      );
    }
  };

  return (
    <>
      <NavBar />
      <section className="section section-center">
        <div className="container h-100">
          <div className="d-flex justify-content-center h-100">
            <div className="user_card content-card">
              <h4 className="content-heading" style={{ width: "480px" }}>
                Бараа нэмэх
              </h4>
              <div className="justify-content-center form_container auth-page-container">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="input-group">
                    <input
                      type="text"
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.title
                          ? " is-invalid"
                          : "")
                      }
                      name="title"
                      placeholder="Гарчиг"
                      onChange={handleChange}
                      value={formState.values.title}
                    />
                  </div>
                  {submitted && !formState.values.title && (
                    <div className="inline-errormsg">Title is required</div>
                  )}
                  <div className="input-group mt-3">
                    <input
                      type="text"
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.description
                          ? " is-invalid"
                          : "")
                      }
                      name="description"
                      placeholder="Тайлбар"
                      onChange={handleChange}
                      value={formState.values.description}
                    />
                  </div>
                  {submitted && !formState.values.description && (
                    <div className="inline-errormsg">
                      Description is required
                    </div>
                  )}
                  <div className="input-group mt-3">
                    <input
                      type="text"
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.address
                          ? " is-invalid"
                          : "")
                      }
                      name="address"
                      placeholder="Хаяг"
                      onChange={handleChange}
                      value={formState.values.address}
                    />
                  </div>
                  {submitted && !formState.values.address && (
                    <div className="inline-errormsg">Address is required</div>
                  )}
                  <div className="input-group mt-3">
                    <input
                      type="text"
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.image
                          ? " is-invalid"
                          : "")
                      }
                      name="image"
                      placeholder="Image URL"
                      onChange={handleChange}
                      value={formState.values.image}
                    />
                  </div>
                  {submitted && !formState.values.image && (
                    <div className="inline-errormsg">Image URL is required</div>
                  )}
                  <div className="input-group mt-3">
                    <select
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.categories
                          ? " is-invalid"
                          : "")
                      }
                      name="categories"
                      onChange={handleChange}
                      value={formState.values.categories}
                    >
                      <option value="">Сонгоорой</option>
                      <option value="Эрэгтэй">Эрэгтэй</option>
                      <option value="Эмэгтэй">Эмэгтэй</option>
                    </select>
                  </div>

                  {submitted && !formState.values.categories && (
                    <div className="inline-errormsg">
                      Categories are required
                    </div>
                  )}

                  <div className="input-group mt-3">
                    {/* Render shop selection options */}
                    <select
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.shop
                          ? " is-invalid"
                          : "")
                      }
                      name="shop"
                      onChange={handleChange}
                      value={formState.values.shop}
                    >
                      <option value="">Дэлгүүрээ сонгоорой</option>
                      {listData.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    {/* Render shop selection validation error message */}
                    {submitted && !formState.values.shop && (
                      <div className="inline-errormsg">
                        Shop selection is required
                      </div>
                    )}
                  </div>

                  <div className="input-group mt-3">
                    <input
                      type="text"
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.color
                          ? " is-invalid"
                          : "")
                      }
                      name="color"
                      placeholder="Өнгө"
                      onChange={handleChange}
                      value={formState.values.color}
                    />
                  </div>
                  {submitted && !formState.values.color && (
                    <div className="inline-errormsg">Color is required</div>
                  )}
                  <div className="input-group mt-3">
                    <input
                      type="number"
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.price
                          ? " is-invalid"
                          : "")
                      }
                      name="price"
                      placeholder="Үнэ"
                      onChange={handleChange}
                      value={formState.values.price}
                    />
                  </div>
                  {submitted && !formState.values.price && (
                    <div className="inline-errormsg">Price is required</div>
                  )}
                  <div className="input-group mt-3">
                    <input
                      type="number"
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.stock
                          ? " is-invalid"
                          : "")
                      }
                      name="stock"
                      placeholder="Тоо хэмжээ"
                      onChange={handleChange}
                      value={formState.values.stock}
                    />
                  </div>
                  {submitted && !formState.values.stock && (
                    <div className="inline-errormsg">Stock is required</div>
                  )}
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <button className="btn login_btn">Илгээх</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Sidebar />
      <Cart />
    </>
  );
};

export default CreateProduct;
