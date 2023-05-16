import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from 'react-redux';
import Validator from "../utils/validator";
import { userRequest } from "../requestMethod"


const Container = styled.div`

`;

const FormContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255,0.2)
		),
		url("https://images.unsplash.com/photo-1536009190979-329b94ad4d57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
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
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
	${mobile({ fontSize: "18px" })}
`;

const Content = styled.p`
    margin: 10px 0px;
`

const Button = styled.a`
	width: 35%;
	border: 1px solid black;
	padding: 10px 15px;
	background-color: black;
	color: white;
	cursor: pointer;
	margin-top: 30px;
    text-decoration: none;
    &:hover{
        background-color: white;
	    color: black;
    }
	&:disabled{
		opacity: 0.7;
		cursor: not-allowed;
	}
	${mobile({ padding: "10px" })}
`;

const Error = styled.span`
	color: red;
	font-size: 14px;
`;

const Success = () => {
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [validate, setValidate] = useState();
    const [success, setSuccess] = useState();
    const rules = [
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
		{
			field: "newPassword",
			method: "isEmpty",
			validWhen: false,
			message: "The new password field is required.",
		},
		{
			field: "newPassword",
			method: "isLength",
			args: [{ min: 6 }],
			validWhen: true,
			message: "The new password must be at least 6 characters.",
		},
        {
			field: "confirmPassword",
			method: "isEmpty",
			validWhen: false,
			message: "The confirm password field is required.",
		},
		{
			field: "confirmPassword",
			method: "isLength",
			args: [{ min: 6 }],
			validWhen: true,
			message: "The confirm password must be at least 6 characters.",
		},
	];
    const validateInfo = {
        password: password,
		newPassword: newPassword,
		confirmPassword: confirmPassword,
    }
	const validator = new Validator(rules);
    const {isFetching, error, currentUser } = useSelector(state => state.user)
    const handleClick = async (e) => {
		e.preventDefault();
		if(Object.values(validator.validate(validateInfo))[0] != undefined){
			setValidate(Object.values(validator.validate(validateInfo))[0]);
		}else if(newPassword != confirmPassword){
			setValidate("New password and confirm password must be the same");
		}else {
            userRequest.put("/user/change-password", {customerId: currentUser._id, password: password, newPassword: newPassword})
                .then((res) =>{
                    setValidate();
                    setSuccess(res.data)
                })
                .catch((err) =>{
                    setValidate(err.response.data);
                })
		}
        
        // localStorage.removeItem("persist:root")
	};

    return (
        <div>
            <Container>
                <Navbar/>
                <FormContainer>
                    <Wrapper>
                        <Title>SUCCESSFULLY ORDER!</Title>
                        <Content>Please check your email to get order detail.</Content>
                        <Button href="/" disabled={isFetching}>Go to Home page</Button>
                    </Wrapper>
                </FormContainer>
                <Footer/>
            </Container>
        </div>
    )
}

export default Success
