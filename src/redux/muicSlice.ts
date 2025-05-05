import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { sortType } from "../components/Music/MusicSort";

type PizzaType = {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
};

interface musicState {
    musicPop: PizzaType[],
    search: string,
    isLoading: boolean,
    activeCategories: number,
    activeType:  {name: string, nameProperty: string},
    currentPage: number,
    limit: number,
};

const getInitialState = ():musicState => {
    const parse = queryString.parse(window.location.search);
    const defaultType = {name: 'популярности (asc)', nameProperty: 'rating'}

    const musicPop = [] as PizzaType[];
    const isLoading = true;
    const limit = 3;
    const search = parse.search ? parse.search as string : '' ;
    const activeCategories = parse.activeCategories ? Number(parse.activeCategories) : 0;
    const activeType = parse.typeRequest ? sortType.find(type => type.nameProperty === parse.typeRequest) || defaultType : defaultType;
    const currentPage = parse.currentPage ? Number(parse.currentPage) : 1;


    return {
        musicPop,
        isLoading,
        limit,
        search,
        activeCategories,
        activeType,
        currentPage
    }

}

const initialState:musicState = getInitialState();


// {
//     musicPop: [],
//     search: '',
//     isLoading: true,
//     activeCategories: 0,
//     activeType: {name: 'популярности (asc)', nameProperty: 'rating'},
//     currentPage: 1,
//     limit: 3,

// }

export type TypePizza = typeof initialState.activeType;

const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        musicPopSucces(state, action) {
            state.musicPop = action.payload
        },
        searchSucces(state, action) {
            state.search = action.payload
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setActiveCategories(state, action) {
            state.activeCategories = action.payload
        },
        setType(state, action: PayloadAction<TypePizza>) {
            state.activeType = action.payload
        },
        setCurrentPage(state, ation) {
            state.currentPage = ation.payload
        }
    }
});

export const { musicPopSucces, searchSucces, setIsLoading, setActiveCategories, setType, setCurrentPage } = musicSlice.actions;

export default musicSlice.reducer;