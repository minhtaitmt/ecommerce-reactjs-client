import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import Validator from "../utils/validator";
import { userRequest } from "../requestMethod";
import { updateUser, logoutUser } from "../redux/userRedux";
import { PermMediaOutlined } from "@material-ui/icons";

const Container = styled.div``;

const FormContainer = styled.div`
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255, 0.2)
		),
		url("https://images.unsplash.com/photo-1597408702421-951a121ffc86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1146&q=80")
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
	/* gap: 50px; */
`;

const Wrapper = styled.div`
	width: 50%;
	padding: 10px 20px;
	background-color: white;
	${mobile({ width: "75%" })}//o day
`;

const ImgContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Img = styled.img`
	width: 120px;
	height: 120px;
	border-radius: 50%;
	object-fit: cover;
	${mobile({ width: "80px", height: "80px" })}
`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
	${mobile({ fontSize: "18px" })}
`;

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
	${mobile({ gap: "5px" })}
`;

const Input = styled.input`
	min-width: 50%;
	margin: 5px 0px;
	padding: 10px;
	${mobile({ minWidth: "80%", padding: "3px" })}
`;

const Label = styled.label`
	${mobile({ fontSize: "14px" })}
`;

const InputContainer = styled.div`
	flex: 1 0 45%;
	display: flex;
	flex-direction: column;
	margin: 5px 0px ${mobile({ margin: "0" })};
`;

const Button = styled.button`
	width: 20%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	margin: 5px 0px;
	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
	${mobile({ padding: "10px", width: "100%" })}
`;

const Error = styled.span`
	color: red;
	font-size: 14px;
`;

const Success = styled.p`
	color: #00ff00
	font-size: 14px;
`;

const BtnContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Information = () => {
	const { isFetching, error, currentUser } = useSelector(
		(state) => state.user
	);
	const splitedBirth = currentUser.birth.split("-");
	const dateOfBirth =
		splitedBirth[2] + "-" + splitedBirth[1] + "-" + splitedBirth[0];

	const [fullname, setFullname] = useState(currentUser.fullname);
	const [gender, setGender] = useState(currentUser.gender);
	const [birth, setBirth] = useState(dateOfBirth);
	const [address, setAddress] = useState(currentUser.address);
	const [phone, setPhone] = useState(currentUser.phone);
	const [email, setEmail] = useState(currentUser.email);
	const [_id, setId] = useState(currentUser._id);
	const [username, setUsername] = useState(currentUser.username);
	const [accessToken, setAccessToken] = useState(currentUser.accessToken);
	const [avatar, setAvatar] = useState(currentUser.avatar);
	const [file, setFile] = useState("");

	const [validate, setValidate] = useState();
	const [success, setSuccess] = useState();
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
			args: ["1-1-2009"],
			validWhen: true,
			message: "You must be at least 14 years old!.",
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
	];
	const validator = new Validator(rules);

	const information = {
		fullname: fullname,
		gender: gender,
		birth: birth,
		address: address,
		phone: phone,
	};
	const dispatch = useDispatch();

	const handleFile = (e) => {
		if (!e.target.files[0].name.match(/\.(jpg|jpeg|png)$/)) {
			setValidate("Only jpg / jpeg / png file supported!");
		} else if (e.target.files[0].size > 1024 * 1024 * 2) {
			setValidate("The image size is too large");
		} else {
			setFile(e.target.files[0]);
			setValidate("");
		}
	};

	const handleClick = async (e) => {
		e.preventDefault();
		if (Object.values(validator.validate(information))[0] != undefined) {
			setValidate(Object.values(validator.validate(information))[0]);
		} else {
			const { birth, ...others } = information;
			const newBirth =
				birth.split("-")[2] +
				"-" +
				birth.split("-")[1] +
				"-" +
				birth.split("-")[0];

			const formData = new FormData();
			formData.append("fullname", fullname);
			formData.append("gender", gender);
			formData.append("birth", newBirth);
			formData.append("address", address);
			formData.append("phone", phone);
			if (file) {
				formData.append("avatar", file);
			} else {
				formData.append("avatar", avatar);
			}
			userRequest
				.put("/user/update/" + _id, formData)
				.then((res) => {
					console.log(res.data);
					dispatch(
						updateUser({
							birth: newBirth,
							avatar: res.data,
							...others,
							_id,
							email,
							username,
							accessToken,
						})
					);
					setValidate();
					setSuccess("Successfully update information!");
				})
				.catch((err) => {
					setValidate(err.response.data);
				});
		}
		/* dispatch(logoutUser()) */
	};

	// localStorage.removeItem("persist:root")
	// };

	return (
		<div>
			<Container>
				<Navbar />
				<FormContainer>
					<Wrapper>
						<Title>INFORMATION</Title>
						<ImgContainer>
							<Img
								src={
									file
										? URL.createObjectURL(file)
										: avatar
										? avatar
										: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
								}
							/>
						</ImgContainer>
						<Form encType="multipart/form-data">
							<InputContainer
								style={{
									alignItems: "center",
									justifyContent: "center",
									gap: "10px",
								}}
							>
								<Label
									htmlFor="file"
									style={{
										cursor: "pointer",
										fontWeight: "600",
										color: "#656565",
										display: "flex",
										alignItems: "center",
										gap: "8px",
									}}
								>
									Upload your avatar <PermMediaOutlined />
								</Label>
								<Input
									type="file"
									id="file"
									style={{ display: "none" }}
									onChange={handleFile}
								/>
							</InputContainer>
							<InputContainer>
								<Label>Full name</Label>
								<Input
									placeholder="full name"
									onChange={(e) =>
										setFullname(e.target.value)
									}
									value={fullname}
								/>
							</InputContainer>
							<InputContainer>
								<Label>Phone number</Label>
								<Input
									placeholder="phone number"
									onChange={(e) => setPhone(e.target.value)}
									value={phone}
								/>
							</InputContainer>
							<InputContainer>
								<Label>Gender</Label>
								<Input
									placeholder="gender"
									onChange={(e) => setGender(e.target.value)}
									value={gender}
								/>
							</InputContainer>
							<InputContainer>
								<Label>Address</Label>
								<Input
									placeholder="address"
									onChange={(e) => setAddress(e.target.value)}
									value={address}
								/>
							</InputContainer>
							<InputContainer>
								<Label>Date of birth</Label>
								<Input
									placeholder="date of birth"
									type="date"
									onChange={(e) => setBirth(e.target.value)}
									value={birth}
								/>
							</InputContainer>
							<InputContainer>
								<Label>Username</Label>
								<Input
									placeholder="username"
									disabled={true}
									value={username}
								/>
							</InputContainer>
							<InputContainer>
								<Label>Email</Label>
								<Input
									placeholder="email"
									disabled={true}
									value={email}
								/>
							</InputContainer>

							<BtnContainer>
								{success && !validate && (
									<Success>{success}</Success>
								)}
								{validate && <Error>{validate}</Error>}
								<Button
									onClick={handleClick}
									disabled={isFetching}
								>
									UPDATE
								</Button>
							</BtnContainer>
						</Form>
					</Wrapper>
				</FormContainer>
				<Footer />
			</Container>
		</div>
	);
};

export default Information;
