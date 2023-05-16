import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false,
	},
	reducers: {
		authStart: (state)=>{
			state.isFetching = true;
		},
		authSuccess: (state, action)=>{
			state.isFetching = false;
			state.currentUser = action.payload;
		},
		authFailure: (state)=>{
			state.isFetching = false;
			state.error = true;
		},
		updateUser: (state, action) =>{
			state.currentUser = action.payload;
		},
		logoutUser: (state) =>{
			state.currentUser = null;
		},
}});


export const {authStart, authSuccess, authFailure, updateUser, logoutUser} = userSlice.actions
export default userSlice.reducer;