import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Navbar";
import PageHeading from "../components/PageHeading";
import ProductDetail from "../components/ProductDetail";
import Sidebar from "../components/Sidebar";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";
import { Login } from "../redux/actions/userActions";
import { addShop } from "../redux/actions/shopActions";

const CreateShop = () => {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const userPanelLogin = useSelector((state) => state.userPanelLogin);
  const { userInfo } = userPanelLogin;

  const [formState, setFormState] = useState({
    values: {},
  });

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

    const { name, description, address, image, facebook, instagram, mail } =
      formState.values;
    const seller = userInfo?.data[0]?._id;
    if ((name && description && address, image, mail && seller)) {
      dispatch(
        addShop({
          name,
          description,
          address,
          image,
          facebook,
          instagram,
          mail,
          seller,
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
                Дэлгүүр нээх
              </h4>
              <div className="justify-content-center form_container auth-page-container">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="input-group">
                    <input
                      type="text"
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.name
                          ? " is-invalid"
                          : "")
                      }
                      name="name"
                      placeholder="Нэр"
                      onChange={handleChange}
                      value={formState.values.name || ""}
                    />
                  </div>
                  {submitted && !formState.values.name && (
                    <div className="inline-errormsg">Name is required</div>
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
                      value={formState.values.description || ""}
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
                      value={formState.values.address || ""}
                    />
                  </div>

                  {submitted && !formState.values.address && (
                    <div className="inline-errormsg">
                      Description is required
                    </div>
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
                      placeholder="Зураг"
                      onChange={handleChange}
                      value={formState.values.image || ""}
                    />
                  </div>

                  {submitted && !formState.values.image && (
                    <div className="inline-errormsg">
                      Description is required
                    </div>
                  )}
                  <div className="input-group mt-3">
                    <input
                      type="text"
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.facebook
                          ? " is-invalid"
                          : "")
                      }
                      name="facebook"
                      placeholder="Facebook"
                      onChange={handleChange}
                      value={formState.values.facebook || ""}
                    />
                  </div>

                  <div className="input-group mt-3">
                    <input
                      type="text"
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.instagram
                          ? " is-invalid"
                          : "")
                      }
                      name="instagram"
                      placeholder="Инстаграм"
                      onChange={handleChange}
                      value={formState.values.instagram || ""}
                    />
                  </div>

                  <div className="input-group mt-3">
                    <input
                      type="email"
                      className={
                        "form-control form-control-lg" +
                        (submitted && !formState.values.mail
                          ? " is-invalid"
                          : "")
                      }
                      name="mail"
                      placeholder="Мэйл"
                      onChange={handleChange}
                      value={formState.values.mail || ""}
                    />
                  </div>

                  {submitted && !formState.values.mail && (
                    <div className="inline-errormsg">Mail is required</div>
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

export default CreateShop;
