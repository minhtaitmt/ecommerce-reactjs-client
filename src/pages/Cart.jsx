import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, resetCart } from "../redux/cartRedux";
import { useState } from "react";
import Validator from "../utils/validator";
import { userRequest } from "../requestMethod";

const Container = styled.div`
	background-color: #fafafa;
`;

const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
	font-weight: 300;
	text-align: center;
	${mobile({ fontSize: "24px" })}
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	${mobile({ padding: "10px" })}
`;

const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "black" : "white"};
	color: ${(props) => props.type === "filled" && "white"};
	${mobile({ display: "none" })}
`;

const TopTexts = styled.div`
	${mobile({ display: "none" })}
`;

const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
	${mobile({ fontSize: "14px", margin: "0 4px" })}
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
	flex: 3;
	display: flex;
	flex-direction: column;
	row-gap: 5px;
	${mobile({ display: "flex", flexDirection: "column", rowGap: "8px" })}
`;

const Product = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ProductDetail = styled.div`
	flex: 2;
	display: flex;
	${mobile({ flexDirection: "column", alignItems: "normal" })}
`;

const Image = styled.img`
	width: 200px;
	${mobile({ width: "230px" })}
`;

const Detail = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	${mobile({ flexDirection: "column", padding: "0px" })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	${mobile({ width: "15px", height: "15px" })}
`;

const ProductSize = styled.span``;

const ProductSinglePrice = styled.span``;

const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	${mobile({ marginBottom: "8px" })}
`;

const ProductAmount = styled.div`
	font-size: 24px;
	margin: 5px;
	${mobile({ margin: "5px 15px", fontSize: "18px" })}
`;

const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({ flexDirection: "column", fontSize: "22px" })}
`;

const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
	margin: 20px 0;
`;

const Sumary = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	background-color: white;
`;

const SumaryTitle = styled.h1`
	font-weight: 200;
`;

const SumaryItem = styled.div`
	margin: 10px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;

const SumaryItemText = styled.span``;

const SumaryItemPrice = styled.span``;

const SumaryButton = styled.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	border: 2px solid black;
	font-weight: 600;
	padding: 15px 0;
	margin-top: 10px;
	cursor: pointer;

	&:hover {
		background-color: white;
		color: black;
	}
`;

const Button = styled.button`
	margin: 20px 0px;
	padding: 5px;
	border: 1px solid black;
	background-color: black;
	cursor: pointer;
	font-weight: 500;
	color: white;
	&:hover {
		background-color: white;
		color: black;
	}
	${mobile({ padding: "5px" })}
`;

const Input = styled.input`
	max-width: 100%;
	padding: 10px;
	margin: 10px 0px;
	${mobile({ minWidth: "80%", padding: "5px" })}
`;

const Error = styled.span`
	color: red;
	font-size: 14px;
`;

const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleRemove = (index) => {
		const res = dispatch(removeProduct({ index: index }));
		// console.log(product)
	};
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.user.currentUser);

	const rules = [
		{
			field: "deliveryPhone",
			method: "isEmpty",
			validWhen: false,
			message: "The delivery phone field is required.",
		},
		{
			field: "deliveryPhone",
			method: "isLength",
			args: [{ min: 10 }],
			validWhen: true,
			message: "The delivery phone must be 10 characters.",
		},
		{
			field: "deliveryPhone",
			method: "isNumeric",
			validWhen: true,
			message: "The phone must be a valid mobile phone.",
		},
		{
			field: "deliveryAddress",
			method: "isEmpty",
			validWhen: false,
			message: "The delivery address field is required.",
		},
		{
			field: "deliveryAddress",
			method: "isLength",
			args: [{ min: 10 }],
			validWhen: true,
			message: "The delivery address must be at least 10 characters.",
		},
	];
	const validator = new Validator(rules);

	const [validate, setValidate] = useState();

	const [deliveryPhone, setDeliveryPhone] = useState();
	const [deliveryAddress, setDeliveryAddress] = useState();
	const deliveryInfo = {
		deliveryPhone: deliveryPhone,
		deliveryAddress: deliveryAddress,
	};
	let orders = [];
	cart.products.map((product) => {
		orders.push({ productId: product._id, quantity: product.quantity });
	});

	const handleClick = (e) => {
		e.preventDefault();
		if (Object.values(validator.validate(deliveryInfo))[0] != undefined) {
			setValidate(Object.values(validator.validate(deliveryInfo))[0]);
		} else {
			const transactionInfo = {
				customerId: user._id,
				orders: orders,
				subTotal: cart.total,
				discount: cart.discount.toFixed(2),
				total: (cart.total - cart.discount).toFixed(2),
				phone: deliveryPhone,
				address: deliveryAddress,
			};
			userRequest
				.post("/transaction", transactionInfo)
				.then((res) => {
					dispatch(resetCart());
					navigate("/Success"); // chuyển sang trang chúc mừng thanh toán thành công
				})
				.catch((err) => {
					console.log(err.response.data);
				});
			setValidate();
		}
	};

	return (
		<Container>
			<Navbar />
			<Wrapper>
				<Title>YOUR BAG</Title>
				<Top>
					<TopButton onClick={() => navigate(-2)}>
						CONTINUE SHOPPING
					</TopButton>
					<TopTexts>
						<TopText>Shopping Bag ({cart.quantity})</TopText>
						<TopText>Your Wishlist (0)</TopText>
					</TopTexts>
					<TopButton type="filled">CHECKOUT NOW !!</TopButton>
				</Top>
				<Bottom>
					<Info>
						{cart.products.map((product) => (
							<Product>
								<ProductDetail>
									<Link to={`/product/${product._id}`}>
										<Image
											src={product.img[0]}
										/>
									</Link>
									<Detail>
										<ProductName>
											<b>Product:</b> {product.name}
										</ProductName>
										<ProductId>
											<b>ID:</b> {product._id}
										</ProductId>
										<ProductColor color={product.color} />
										<ProductSize>
											<b>Size:</b> {product.size}
										</ProductSize>
										<ProductSinglePrice>
											<b>Unit price:</b> $ {product.price}
										</ProductSinglePrice>
										<ProductSinglePrice>
											<b>Discount:</b>{" "}
											{product.discount * 100}%
										</ProductSinglePrice>
									</Detail>
								</ProductDetail>
								<PriceDetail>
									<ProductAmountContainer>
										<Remove />
										<ProductAmount>
											{product.quantity}
										</ProductAmount>
										<Add />
									</ProductAmountContainer>
									<ProductPrice>
										${" "}
										{(
											product.price *
											product.quantity *
											(1 - product.discount)
										).toFixed(1)}
									</ProductPrice>
									<Button
										onClick={() =>
											handleRemove(
												cart.products.indexOf(product)
											)
										}
									>
										Remove item
									</Button>
								</PriceDetail>
							</Product>
						))}
						<Hr />
					</Info>
					<Sumary>
						<SumaryTitle>ORDER SUMARY</SumaryTitle>
						<SumaryItem>
							<SumaryItemText>Amount</SumaryItemText>
							<SumaryItemPrice>{cart.amount}</SumaryItemPrice>
						</SumaryItem>
						<SumaryItem>
							<SumaryItemText>Subtotal</SumaryItemText>
							<SumaryItemPrice>$ {cart.total}</SumaryItemPrice>
						</SumaryItem>
						<SumaryItem>
							<SumaryItemText>Discount</SumaryItemText>
							<SumaryItemPrice>
								$ -{cart.discount.toFixed(2)}
							</SumaryItemPrice>
						</SumaryItem>
						<SumaryItem type="total">
							<SumaryItemText>Total</SumaryItemText>
							<SumaryItemPrice>
								$ {(cart.total - cart.discount).toFixed(2)}
							</SumaryItemPrice>
						</SumaryItem>
						<Input
							placeholder="delivery phone..."
							onChange={(e) => setDeliveryPhone(e.target.value)}
						/>
						<Input
							placeholder="delivery address..."
							onChange={(e) => setDeliveryAddress(e.target.value)}
						/>
						{validate && <Error>{validate}</Error>}
						<SumaryButton onClick={handleClick}>
							CHECKOUT
						</SumaryButton>
					</Sumary>
				</Bottom>
			</Wrapper>
			<Footer />
		</Container>
	);
};

export default Cart;
