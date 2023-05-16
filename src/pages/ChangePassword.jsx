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
			rgba(255, 255, 255, 0.3),
			rgba(255, 255, 255,0.3)
		),
		url("https://images.unsplash.com/photo-1517820195751-a94aac0ecb01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80")
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
	margin: 5px 0px;
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

const Success = styled.p`
	color: #00ff00
	font-size: 14px;
`;
const ChangePassword = () => {
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
                        <Title>CHANGE PASSWORD</Title>
                        <Form>
                            <Input
                                placeholder="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                placeholder="new password"
                                type="password"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <Input
                                placeholder="confirm password"
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button onClick={handleClick} disabled={isFetching}>CHANGE</Button>
                            {validate && <Error>{validate}</Error>}
                            {success && !validate && <Success>{success}</Success>}
                        </Form>
                    </Wrapper>
                </FormContainer>
                <Footer/>
            </Container>
        </div>
    )
}

export default ChangePassword
