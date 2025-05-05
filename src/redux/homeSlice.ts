import { createSlice } from "@reduxjs/toolkit";

export type PizzaType = {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
  };

interface HomeState  {
    items: PizzaType[],
    limit: number,
    isLoading: boolean
};

const initialState: HomeState = {
    items: [],
    limit: 4,
    isLoading: true
};


const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
});


export const { setItems, setIsLoading } = homeSlice.actions;

export default homeSlice.reducer;