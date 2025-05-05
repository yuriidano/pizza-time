import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface Item {
    id: number,
    title: string,
    types: string,
    sizes: number,
    price: number,
    count: number
}

interface cartState {
    items: Item[],
    totalPrice: number
};


const initialState: cartState = {
    items: [],
    totalPrice: 0
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Item>) {
            const findItem = state.items.find(item => item.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push(action.payload)
            };

            state.totalPrice = state.items.reduce((sum, item) => {
                return (
                    (sum + item.price) * item.count
                )
            }, 0)

        },

        minusItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload);
            if (findItem && findItem.count >= 2) {
                findItem.count--;
            }

            state.totalPrice = state.items.reduce((sum, item) => {
                return (
                    (sum + item.price) * item.count
                )
            }, 0)

        },

        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, item) => {
                return (
                    (sum + item.price) * item.count
                )
            }, 0)
            
        },

        clierCart(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});


export const { addItem, clierCart, removeItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;