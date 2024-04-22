import Home from "./pages/Home";
import CreateShop from "./pages/CreateShop";
import ListShop from "./components/ListShop";
import CreateProduct from "./pages/CreateProduct";
import ListProduct from "./components/ListProduct";
import ProductsPage from "./pages/ProductsPage";
import ProductsPerson from "./pages/ProductsPerson";
import ProductDetailPage from "./pages/ProductDetailPage";
import About from "./pages/About";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import PrivateRouter from "./PrivateRouter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Toast from "./components/Toast";
import "react-toastify/dist/ReactToastify.css";
import ShopPage from "./pages/Shop";

function App() {
    return (
        <>
            <Toast />
            <Router>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/createShop" component={CreateShop} />
                    <Route path="/listShop" component={ListShop} />
                    <Route path="/createProduct" component={CreateProduct} />
                    <Route path="/listProduct" component={ListProduct} />
                    <Route path="/products" component={ProductsPage} />
                    <Route path="/productsPerson" component={ProductsPerson} />
                    <Route path="/shop" component={ShopPage} />
                    <Route path="/product/:id" component={ProductDetailPage} />
                    <Route path="/about" component={About} />
                    <PrivateRouter path="/shipping" component={Shipping} />
                    <PrivateRouter path="/payment" component={Payment} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
