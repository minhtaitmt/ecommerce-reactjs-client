import styled from "styled-components";
import { useState } from "react";
import { publicRequest } from "../requestMethod"
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Overlay = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
    background: rgba(126, 121, 121, 0.7)
`;
const ModalContainer = styled.div`
	max-width: 400px;
	width: 100%;
	position: fixed;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
	text-align: center;
	background-color: #ffffff;
	box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
	border-radius: 8px;
`;


const ModalRight = styled.div`
    display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	width: 80%;
`;

const CloseButton = styled.button`
	position: fixed;
	top: 10px;
	right: 10px;
    cursor: pointer;
`;

const Button = styled.button`
	margin: 20px 0px;
	padding: 8px;
	border: 1px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	color: teal;
	&:hover {
		background-color: teal;
		color: white;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	padding: 20px;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;

	padding: 10px;
`;

const Title = styled.h3`
    margin-top: 15px;
	font-weight: 400;
`;

const Error = styled.span`
	color: red;
	font-size: 14px;
	padding: 0px 10px;
`;

const Success = styled.span`
	color: green
	font-size: 14px;
	padding: 0px 10px;
`;

const Modal = ({ open, onClose, email, customer, success }) => {
	const [otp, setOtp] = useState();
	const [errorOtp, setErrorOtp] = useState("");
	const { error } = useSelector((state) => state.user);
	const dispatch = useDispatch();
    const handleClick = async (e) =>{
        e.preventDefault()
        if(!otp){
			setErrorOtp("Please enter your OTP!")
		}else if(otp.length != 6){
			setErrorOtp("The OTP code must be 6 digits")
		}else{
			const formData = new FormData();

			formData.append('fullname', customer.fullname)
			formData.append('gender', customer.gender)
			formData.append('birth', customer.birth)
			formData.append('address', customer.address)
			formData.append('phone', customer.phone)
			formData.append('email', customer.email)
			formData.append('username', customer.username)
			formData.append('password', customer.password)
			formData.append('avatar', customer.avatar)
			try{ 
				const res = await publicRequest.post("/otp/check-otp", { email: email, otp: otp })
				if(res.status === 200){
					register(dispatch, formData)
					if(error){
						setErrorOtp("One of information is existing in system! Please check again!")
					}
				}
			}catch(err){
				setErrorOtp("Wrong OTP or OTP has been expired.")
				console.log(formData)
			}
		}
    }
    
	if (!open) return null;
	return (
		<Overlay onClick={onClose}>
			<ModalContainer onClick={(e) => {e.stopPropagation();}}>
				<ModalRight>
					<CloseButton onClick={onClose}>X</CloseButton>
                    <Title>VERIFY YOUR EMAIL</Title>
                    <Form>
                        <Input placeholder="Enter your otp..." onChange={(e) => setOtp(e.target.value)}/>
					{errorOtp && <Error>{errorOtp}</Error>}
					{success && !errorOtp && <Success>{success}</Success>}
					<Button onClick={handleClick}>Verify</Button>
                    </Form>
				</ModalRight>
			</ModalContainer>
		</Overlay>
	);
};

export default Modal;
