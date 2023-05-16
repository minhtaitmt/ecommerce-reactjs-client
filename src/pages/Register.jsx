import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Validator from "../utils/validator";
import Modal from "../components/OtpModal";
import { publicRequest } from "../requestMethod"


const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.3),
			rgba(255, 255, 255, 0.3)
		),
		url("https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260")
			center;
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 40%;
	padding: 20px;
	background-color: white;
	${mobile({ width: "75%" })} //o day


`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
	${mobile({ fontSize: "18px" })}
`;

const ImgContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
    justify-content: center;
`

const Img = styled.img`
	width: 120px;
	height: 120px;
	border-radius: 50%;
	object-fit: cover;
	${mobile({ width: "80px", height: '80px' })} 

`

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0 0;
	padding: 10px;
	${mobile({ minWidth: "80%", padding: "3px" })}

`;

const Agreement = styled.span`
	font-size: 12px;
	margin: 20px 0px;
	display: flex;
	align-items: center;
`;

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
`;

const InputCheck = styled.input`
	margin-right: 10px;
`;

const Error = styled.span`
	color: red;
	font-size: 14px;
	padding: 0px 10px;
`;

const Label = styled.label`
	width: 100%;
`;


const Register = () => {
	const [fullname, setFullname] = useState("");
	const [gender, setGender] = useState("");
	const [birth, setBirth] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [file, setFile] = useState()

	const [disabled, setDisabled] = useState(false);
	const [validate, setValidate] = useState();


	const dispatch = useDispatch();
	const { isFetching, error } = useSelector((state) => state.user);

	const handleCheckBox = (e) => {
		setDisabled(!disabled);
	};
	const rules = [
		{
			field: "fullname",
			method: "isEmpty",
			validWhen: false,
			message: "The full name field is required.",
		},
		{
			field: "fullname",
			method: "isLength",
			args: [{ min: 5 }],
			validWhen: true,
			message: "The full name must be at least 5 characters.",
		},
		{
			field: "email",
			method: "isEmpty",
			validWhen: false,
			message: "The email field is required.",
		},
		{
			field: "email",
			method: "isEmail",
			validWhen: true,
			message: "The email must be a valid email address.",
		},
		{
			field: "address",
			method: "isEmpty",
			validWhen: false,
			message: "The address field is required.",
		},
		{
			field: "address",
			method: "isLength",
			args: [{ min: 10 }],
			validWhen: true,
			message: "The address must be at least 10 characters.",
		},
		{
			field: "birth",
			method: "isEmpty",
			validWhen: false,
			message: "The date of birth field is required.",
		},
		{
			field: "birth",
			method: "isBefore",
			args: ["1/1/2009"],
			validWhen: true,
			message: "You must be at least 14 years old to register!.",
		},
		{
			field: "phone",
			method: "isNumeric",
			validWhen: true,
			message: "The phone must be a valid mobile phone.",
		},
		{
			field: "phone",
			method: "isLength",
			args: [{ min: 10 }],
			validWhen: true,
			message: "The phone number must be at least 10 characters.",
		},
		{
			field: "phone",
			method: "isEmpty",
			validWhen: false,
			message: "The phone number field is required.",
		},
		{
			field: "gender",
			method: "isEmpty",
			validWhen: false,
			message: "The gender field is required.",
		},
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
		fullname: fullname,
		gender: gender,
		birth: birth,
		address: address,
		phone: phone,
		email: email,
		username: username,
		password: password,
		avatar: file,
	};
	// const handleClick = (e) => {
	// 	e.preventDefault();
	// 	if(Object.values(validator.validate(user))[0] != undefined){
	// 		setValidate(Object.values(validator.validate(user))[0]);
	// 	}else if(!disabled){
	// 		setValidate("Please accept the policy of website to register...")
	// 	}else if(error){
	// 		setValidate("Oops! Sorry, something went wrong...")
	// 	}else{
	// 		register(dispatch, user)
	// 	}	
	// };
	const [openModal, setOpenModal] = useState(false);
	const [passEmail, setPassEmail] = useState()
	const [errorEmail, setErrorEmail] = useState(false)
	
	const [success, setSuccess] = useState()

	const handleFile = (e) => {
		if(!e.target.files[0].name.match(/\.(jpg|jpeg|png)$/)){
			setValidate("Only jpg / jpeg / png file supported!")
		} else if(e.target.files[0].size > 1024 * 1024 * 2){
			setValidate("The image size is too large")
		}else{
			setFile(e.target.files[0])
			setValidate("")
		}
	}

	
	const handleModal = async (e) =>{
		e.preventDefault()
		if(Object.values(validator.validate(user))[0] != undefined){
			setValidate(Object.values(validator.validate(user))[0]);
		}else if(!disabled){
			setValidate("Please accept the policy of website to register...")
		}else if(!file){
			setValidate("Please select an avatar!")
		}else{
			
			try{ 
				const res = await publicRequest.post("/otp", { email: email })
				if(res.data){
					

					setOpenModal(true)
					setSuccess(res.data)
					setPassEmail(email)
					setValidate()
				}else{
					setValidate("Oops! Something went wrong while sending email...")
				}
			}catch(err){
				setValidate("Oops! Something went wrong while sending email...")
			}
		}

	}
	// useEffect(useSelector((state) => {
	// 		setErrorEmail(state.user.error)
	// 	}), [])
	

	const handleModalBtn = () => {
		setOpenModal(false)
	}

	return (
		<Container>
			<Wrapper>
				<Title>CREATE AN ACCOUNT</Title>
				
				<Form encType='multipart/form-data'>
					<Label htmlFor="file" style={{cursor: "pointer"}}>
						<ImgContainer>
							<Img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}/>
						</ImgContainer>
					</Label>
					<Input type="file" id="file" style={{display: "none"}}
							placeholder="full name"
							onChange={handleFile}
						/>
					<Input
						placeholder="full name"
						onChange={(e) => setFullname(e.target.value)}
					/>
					<Input
						placeholder="gender"
						onChange={(e) => setGender(e.target.value)}
					/>
					<Input
						type="date"
						placeholder="date of birth"
						onChange={(e) => setBirth(e.target.value)}
					/>
					<Input
						placeholder="address"
						onChange={(e) => setAddress(e.target.value)}
					/>
					<Input
						placeholder="phone"
						onChange={(e) => setPhone(e.target.value)}
					/>
					<Input
						placeholder="email"
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						placeholder="password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Agreement>
						<InputCheck onChange={handleCheckBox} type="checkbox" />
						By creating an account, I consent to the processing of
						my personal data in accordance with the&nbsp;
						<b> PRIVATE POLICY</b>
					</Agreement>
					<Button onClick={handleModal} disabled={isFetching}>
						CREATE
					</Button>
					{validate && <Error>{validate}</Error>}
					{errorEmail && <Error>Oops! Username or email was in used.</Error>}

				</Form>
			</Wrapper>
			<Modal open={openModal} onClose={handleModalBtn} email={passEmail} success={success} customer={user}/>
		</Container>
	);
};

export default Register;
