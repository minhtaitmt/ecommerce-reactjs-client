import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ChangePassword from "./pages/ChangePassword";
import Information from "./pages/Information";

const App = () => {
	const user = useSelector(state =>state.user.currentUser);
	return(
		<Router>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/products/:category" element={<ProductList/>}/>
				<Route path="/product/:id" element={<Product/>}/>
				<Route path="/cart" element={user ? <Cart/> : <Login/>}/>
				<Route path="/success" element={user ? <Success/> : <Login/>}/>
				<Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
				<Route path="/change-password" element={user ? <ChangePassword/> : <Login/>}/>
				<Route path="/information" element={user ? <Information/> : <Login/>}/>
				<Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
			</Routes>
		</Router>
	);
};

export default App;
