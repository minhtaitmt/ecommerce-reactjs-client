import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import {login} from "../redux/apiCalls"
import {useDispatch, useSelector} from "react-redux"
import Validator from "../utils/validator";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255,0.2)
		),
		url("https://www.prada.com/content/dam/pradanux/e-commerce/2021/12/CO_holiday_2/collection/men/Holiday_Double_DT.jpg/_jcr_content/renditions/cq5dam.web.840.840.webp")
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 25%;
	padding: 20px;
	background-color: white;
	${mobile({ width: "75%" })}
`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
	${mobile({ fontSize: "18px" })}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0px;
	padding: 10px;
	${mobile({ minWidth: "80%", padding: "5px" })}
`;

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	margin-bottom: 5px;
	&:disabled{
		opacity: 0.7;
		cursor: not-allowed;
	}
	${mobile({ padding: "10px" })}
`;

const LinkContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Link = styled.a`
	margin-top: 10px;
	font-size: 12px;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
	text-decoration: none;
	color: black;
`;

const Error = styled.span`
	color: red;
	font-size: 14px;
`;
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch()
	const {isFetching,error} = useSelector(state => state.user)

	const [validate, setValidate] = useState();
	const rules = [
		{
			field: "username",
			method: "isEmpty",
			validWhen: false,
			message: "The username field is required.",
		},
		{
			field: "username",
			method: "isLength",
			args: [{ min: 6 }],
			validWhen: true,
			message: "The username must be at least 6 characters.",
		},
		{
			field: "password",
			method: "isEmpty",
			validWhen: false,
			message: "The password field is required.",
		},
		{
			field: "password",
			method: "isLength",
			args: [{ min: 6 }],
			validWhen: true,
			message: "The password must be at least 6 characters.",
		},
	];
	const validator = new Validator(rules);
	const user = {
		username: username,
		password: password,
	};
	const handleClick = (e) => {
		e.preventDefault();
		if(Object.values(validator.validate(user))[0] != undefined){
			setValidate(Object.values(validator.validate(user))[0]);
		}else{
			login(dispatch, user)
			setValidate()
		}
	};
	return (
		<Container>
			<Wrapper>
				<Title>SIGN IN</Title>
				<Form>
					<Input
						placeholder="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						placeholder="password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button onClick={handleClick} disabled={isFetching}>LOG IN</Button>
					{validate && <Error>{validate}</Error>}
					{error && validate && <Error>Oops! Wrong username or password...</Error>}
					<LinkContainer>
						<Link >REMEMBER YOUR PASSWORD?</Link>
						<Link href="/register">CREATE A NEW ACCOUNT</Link>
					</LinkContainer>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Login;
