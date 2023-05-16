import { authFailure, authStart, authSuccess } from "./userRedux"
import { publicRequest } from "../requestMethod"

export const login = async (dispatch, user) =>{
    dispatch(authStart());
    try{ 
        const res = await publicRequest.post("/auth/customer-login",user)
        dispatch(authSuccess(res.data))
    }catch(err){
        console.log(err)
        dispatch(authFailure())
    }
}

export const register = async (dispatch, customer) =>{
    dispatch(authStart());
    try{ 
        const res = await publicRequest.post("/auth/customer-register", customer)
        dispatch(authSuccess(res.data))
    }catch(err){
        dispatch(authFailure())
    }
}

