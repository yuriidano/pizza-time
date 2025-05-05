import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortType } from "../pages/Home";
import queryString from "query-string";
import { sortType } from "../components/Sort/Sort";



interface FilterState  {
    activeCategorie: number,
    selectedSortType: {name: string, nameProperty: string},
    search: string,
    currentPage: number,
}

const getInitialState = () => {
    const parse = queryString.parse(window.location.search);
    const activeCategorie = Number(parse.requestGategories) || 0;
    const selectedSortType = sortType.find(type => type.nameProperty === parse.requestSortType) ||  {name: 'популярности (asc)', nameProperty: 'rating'};
    const search = '';
    const currentPage = Number(parse.currentPage) || 1;

    return {
        activeCategorie,
        selectedSortType,
        search,
        currentPage
    }
}

const initialState:FilterState = getInitialState();

type selectedSortType = typeof initialState.selectedSortType;


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveCategirie: (state, action: PayloadAction<number>) => {
            state.activeCategorie = action.payload;
        },
        setSelectedSortType: (state, action: PayloadAction<SortType>) => {
            state.selectedSortType = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilter: (state, action: PayloadAction<{activeCategorie: number, selectedSortType: selectedSortType, currentPage: number}>) => {
            state.activeCategorie = action.payload.activeCategorie;
            state.selectedSortType = action.payload.selectedSortType;
            state.currentPage = action.payload.currentPage
        }
    }
});


export const { setActiveCategirie, setSelectedSortType, setSearch, setCurrentPage, setFilter} = filterSlice.actions;


export default filterSlice.reducer;