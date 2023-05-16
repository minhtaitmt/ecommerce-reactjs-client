import { createSlice } from "@reduxjs/toolkit";
import { startTransition } from "react";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		discount: 0,
		amount: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			state.quantity += 1;
			state.products.push(action.payload)
			state.discount += Number((action.payload.price*action.payload.quantity*action.payload.discount.toFixed(2)).toFixed(2));
			state.amount += action.payload.quantity;
			state.total += action.payload.price* action.payload.quantity;
		},
		removeProduct: (state, action) => {
			const payloadProduct = state.products[action.payload.index]
			state.products.splice(action.payload.index, 1);
			state.discount -= (payloadProduct.price*payloadProduct.quantity*payloadProduct.discount);
			state.amount -= payloadProduct.quantity;
			state.total -= (payloadProduct.price* payloadProduct.quantity);
			state.quantity -= 1;
		},
		resetCart: (state) => {
			state.products = [];
			state.quantity = 0;
			state.discount = 0;
			state.amount = 0;
			state.total = 0;
		},
	}
});


export const {addProduct, removeProduct, resetCart} = cartSlice.actions
export default cartSlice.reducer