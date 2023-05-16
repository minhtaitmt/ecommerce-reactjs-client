import {
	Add,
	Remove,
	ArrowLeftOutlined,
	ArrowRightOutlined,
	CallMerge,
} from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethod";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
	background-color: #fafafa;
`;

const Wrapper = styled.div`
	padding: 50px;
	display: flex;
	${mobile({ flexDirection: "column", padding: "10px" })}
`;

const Arrow = styled.div`
	width: 40px;
	height: 40px;
	background-color: lightgray;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: ${(props) => props.direction === "left" && "10px"};
	right: ${(props) => props.direction === "right" && "10px"};
	margin: auto;
	cursor: pointer;
	opacity: 0.5;
	z-index: 2;
	${mobile({ height: "30px", width: "30px" })}
`;

const ImageWrapper = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	transition: all 0.5s ease;
	transform: translateX(${(props) => props.imgIndex * -100}%);
`;

const ImageContainer = styled.div`
	flex: 1;
	height: 90vh;
	display: flex;
	position: relative;
	overflow: hidden;
	${mobile({ height: "50vh", width: "100%" })}
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	${mobile({ height: "50vh" })}
`;

const InfoContainer = styled.div`
	flex: 1;
	padding: 0 50px;
	${mobile({ padding: "0 10px" })}
`;

const Title = styled.h1`
	font-weight: 200;
	${mobile({ fontSize: "24px", margin: "8px 0" })}
`;

const Desc = styled.p`
	margin: 20px 0px;
	${mobile({ fontSize: "14px", margin: "8px 0" })}
`;

const Price = styled.span`
	font-weight: 100;
	font-size: 40px;
	${mobile({ fontSize: "24px", margin: "8px 0" })}
`;

const Discount = styled.p`
	margin: 20px 0px;
	font-weight: 100;
	font-size: 20px;
	${mobile({ fontSize: "14px", margin: "8px 0" })}
`;

const FilterContainer = styled.div`
	width: 50%;
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column", margin: "10px 0" })}
`;

const Filter = styled.div`
	display: flex;
	align-items: center;
	${mobile({ margin: "10px 0" })}
`;

const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
	${mobile({ fontSize: "14px", margin: "0 5px" })}
`;

const FilterColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 1px solid black;
	background-color: ${(props) => props.color};
	margin: 0px 5px;
	cursor: pointer;
	${mobile({ width: "15px", height: "15px" })}
`;

const FilterSize = styled.select`
	margin-left: 10px;
	padding: 5px 10px;
	${mobile({ fontSize: "12px", margin: "8px 0", padding: "3px 5px" })}
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 50%;
	${mobile({ width: "65%", justifyContent: "flex-start", gap: "5px" })}
`;

const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
	${mobile({ fontSize: "10px" })}
`;

const Amount = styled.span`
	width: 40px;
	height: 20px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
	${mobile({ fontSize: "10px", width: "20px", height: "15px" })}
`;

const Button = styled.button`
	padding: 15px;
	border: 1px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	&:hover {
		background-color: teal;
		color: white;
	}
	${mobile({ padding: "5px", fontSize: "12px" })}
`;

const Error = styled.span`
	color: red;
	font-size: 14px;
	margin: 10px 0px;
`;

const Product = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [color, setColor] = useState("");
	const [size, setSize] = useState("");
	const [error, setError] = useState();
	const [imgIndex, setImgIndex] = useState(0);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await publicRequest.get("/product/find/" + id);
				setProduct(res.data);
			} catch {}
		};
		getProduct();
	}, [id]);
	const handleQuantity = (type) => {
		if (type === "dec") {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			setQuantity(quantity + 1);
		}
	};

	const handleClick = () => {
		let addedQuantity = 0;
		cart.products.map((p) => {
			if (p._id === product._id) {
				addedQuantity += p.quantity;
			}
		});
		if (quantity + addedQuantity > product.quantity) {
			setError("The quantity exceeds inventory!");
		} else if (color === "") {
			setError("Please select color for product!");
		} else if (size === "") {
			setError("Please select size for product!");
		} else {
			const res = dispatch(
				addProduct({ ...product, quantity, color, size })
			);
			setError();
			setSize("");
			setColor("");
			setQuantity(1);
		}
	};

	const handleArrow = (direction) => {
		if (direction === "left") {
			setImgIndex(imgIndex > 0 ? imgIndex - 1 : product.img.length - 1);
		} else {
			setImgIndex(imgIndex < product.img.length - 1 ? imgIndex + 1 : 0);
		}
	};

	const pickColor = (colorItem) => {
		setColor(colorItem);
	};

	return (
		<Container>
			<Navbar />
			<Wrapper>
				<ImageContainer>
					<Arrow direction="left" onClick={() => handleArrow("left")}>
						<ArrowLeftOutlined />
					</Arrow>
					<ImageWrapper imgIndex={imgIndex}>
						{product.img?.map((img) => {
							return (
								<Image
									src={
										process.env.REACT_APP_BACKEND_URL + img
									}
								/>
							);
						})}
					</ImageWrapper>
					<Arrow
						direction="right"
						onClick={() => handleArrow("right")}
					>
						<ArrowRightOutlined />
					</Arrow>
				</ImageContainer>
				<InfoContainer>
					<Title>{product.name}</Title>
					<Desc>{product.desc}</Desc>
					<Price>$ {product.price}</Price>
					<Discount>Discount: {product.discount * 100}%</Discount>
					<Discount>Quantity in stock: {product.quantity}</Discount>
					<FilterContainer>
						<Filter>
							<FilterTitle>Color</FilterTitle>
							{product.color?.map((colorItem) => (
								<FilterColor
									color={colorItem}
									key={colorItem}
									onClick={() => pickColor(colorItem)}
								/>
							))}
						</Filter>
						<Filter>
							<FilterTitle>Size</FilterTitle>
							<FilterSize
								onClick={(el) => setSize(el.target.value)}
							>
								<FilterSizeOption selected disabled>
									select size
								</FilterSizeOption>
								{product.size?.map((sizeItem) => (
									<FilterSizeOption key={sizeItem}>
										{sizeItem}
									</FilterSizeOption>
								))}
							</FilterSize>
						</Filter>
					</FilterContainer>
					<AddContainer>
						<AmountContainer>
							<Remove
								onClick={() => handleQuantity("dec")}
								style={{ cursor: "pointer" }}
							/>
							<Amount>{quantity}</Amount>
							<Add
								onClick={() => handleQuantity("inc")}
								style={{ cursor: "pointer" }}
							/>
						</AmountContainer>
						<Button onClick={handleClick}>ADD TO CART</Button>
					</AddContainer>
					{error && <Error>{error}</Error>}
				</InfoContainer>
			</Wrapper>
			<Newsletter />
			<Footer />
		</Container>
	);
};

export default Product;
