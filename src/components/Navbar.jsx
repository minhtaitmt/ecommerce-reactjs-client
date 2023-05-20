import { Badge } from "@material-ui/core";
import {
	Search,
	ShoppingCartOutlined,
	KeyboardArrowDown,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutUser } from "../redux/userRedux";
import axios from "axios";
import { resetCart } from "../redux/cartRedux";

const Container = styled.div`
	height: 60px;
	padding: 10px 0px;
	background-color: white;
	${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;
const Language = styled.span`
	font-size: 15px;
	cursor: pointer;
	${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
	border: 0.5px solid lightgray;
	display: flex;
	align-items: center;
	margin: 0 15px;
	padding: 5px;
	${mobile({ display: "none" })}
`;
const Input = styled.input`
	border: none;
	outline: none;
	${mobile({ width: "50px" })}
`;

const CateBtn = styled.div`
	color: #656565;
	cursor: pointer;
	font-weight: 500;
	display: flex;
	align-items: center;
	margin-left: 25px;
	${mobile({ fontSize: "12px", marginLeft: "12px" })}
`;

const CateMenu = styled.ul`
	list-style-type: none;
	position: absolute;
	top: 90px;
	left: 290px;
	border: 1px solid lightgray;
	z-index: 10;
	background-color: white;
	display: ${(props) => props.displayCate};
	flex-direction: column;
	padding: 10px 0px;

	&:before {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: white;
		content: "";
		left: 30px;
		top: -5px;
		transform: rotate(45deg);
		${mobile({ width: "6px", height: '6px', top: '-3px' })}

	}

	${mobile({ top: "80px", left: '20px' })}
`;

const Center = styled.div`
	flex: 1;
	text-align: center;
`;
const Logo = styled.h1`
	font-weight: 700;
	letter-spacing: 8px;
	${mobile({ fontSize: "22px", letterSpacing: "3px", marginLeft: "12px" })}
`;

const Right = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	${mobile({ flex: 2 })}
`;

const MenuItem = styled.div`
	outline: none;
	font-size: 14px;
	cursor: pointer;
	margin-right: 30px;
	${mobile({ fontSize: "12px", marginRight: "10px" })}
`;

const DropdownBtn = styled.div`
	padding: 7px 5px;
	border: 1px solid #6e6d6d;
	color: #333333;
	cursor: pointer;
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: 5px;
	${mobile({ fontSize: "12px", padding: "2px", gap: "2px", marginRight: "5px" })}
`;

const DropdownMenu = styled.ul`
	list-style-type: none;
	position: absolute;
	top: 90px;
	right: 60px;
	border: 1px solid lightgray;
	z-index: 10;
	background-color: white;
	display: ${(props) => props.display};
	flex-direction: column;
	padding: 10px 0px;

	&:before {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: white;
		content: "";
		right: 30px;
		top: -5px;
		transform: rotate(45deg);
		${mobile({ width: "6px", height: '6px', top: '-3px' })}
	}
	${mobile({ top: "80px", right: '20px' })}
`;

const DropdownItem = styled.li`
	position: relative;
	width: 200px;
	padding: 15px;
	text-align: center;
	text-decoration: none;
	color: #6e6d6d;
	&:hover {
		color: black;
	}
	transition: 0.5s;
	flex: 1;
	cursor: pointer;
	font-size: 14px;
	font-weight: 600;
	${mobile({ fontSize: '10px', width: '100px', padding: '10px' })}
`;

const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);
	const user = useSelector((state) => state.user.currentUser);

	const [open, setOpen] = useState(false);
	const [openCate, setOpenCate] = useState(false);
	const [categories, setCategories] = useState([]);

	const dispatch = useDispatch();

	const handleLogout = (e) => {
		dispatch(logoutUser());
		dispatch(resetCart());
		setOpen(false);
		setOpenCate(false);
	};

	const handleCateBtn = () => {
		setOpenCate(!openCate);
		setOpen(false);
	};

	const handleInfoBtn = () => {
		setOpen(!open);
		setOpenCate(false);
	};

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(
					process.env.REACT_APP_BACKEND_URL + "api/category"
				);
				setCategories(res.data);
			} catch (err) {}
		};
		getProducts();
	});
	return (
		<div>
			<Container>
				<Wrapper>
					<Left>
						<Language>EN</Language>
						<SearchContainer>
							<Input placeholder="Search" />
							<Search style={{ color: "gray", fontSize: 20 }} />
						</SearchContainer>
						<CateBtn onClick={handleCateBtn}>
							{" "}
							ALL PRODUCTS{" "}
							<KeyboardArrowDown
								style={{ color: "lightgray" }}
							/>{" "}
						</CateBtn>
						<CateMenu displayCate={openCate ? "flex" : "none"}>
							{categories.map((cate) => {
								return (
									<Link
										to={"/products/" + cate.cat}
										style={{
											color: "black",
											textDecoration: "none",
										}}
									>
										<DropdownItem>
											{cate.title}
										</DropdownItem>
									</Link>
								);
							})}
						</CateMenu>
					</Left>
					<Center>
						<Link
							to="/"
							style={{ color: "black", textDecoration: "none" }}
						>
							<Logo>AUGUST</Logo>
						</Link>
					</Center>
					<Right>
						<Link to="/cart" style={{ color: "black" }}>
							<MenuItem>
								<Badge badgeContent={quantity} color="primary">
									<ShoppingCartOutlined />
								</Badge>{" "}
							</MenuItem>
						</Link>
						{user ? (
							<DropdownBtn onClick={handleInfoBtn}>
								{" "}
								{user.fullname} <KeyboardArrowDown />
							</DropdownBtn>
						) : null}
						<DropdownMenu display={open ? "flex" : "none"}>
							<Link
								to="/information"
								style={{
									color: "black",
									textDecoration: "none",
								}}
							>
								<DropdownItem>MY INFORMATION</DropdownItem>
							</Link>
							<Link
								to="/change-password"
								style={{
									color: "black",
									textDecoration: "none",
								}}
							>
								<DropdownItem>CHANGE PASSWORD</DropdownItem>
							</Link>

							<DropdownItem onClick={handleLogout}>
								LOG OUT
							</DropdownItem>
						</DropdownMenu>

						<Link
							style={{ color: "black", textDecoration: "none" }}
							to="/register"
						>
							{!user ? <MenuItem>REGISTER</MenuItem> : null}
						</Link>
						<Link
							style={{ color: "black", textDecoration: "none" }}
							to="/login"
						>
							{!user ? <MenuItem>LOG IN</MenuItem> : null}
						</Link>
					</Right>
				</Wrapper>
			</Container>
		</div>
	);
};

export default Navbar;
