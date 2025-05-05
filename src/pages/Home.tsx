import { useEffect, useRef } from "react";
import Categories from "../components/Categories/Categories";
import Sort, { sortType } from "../components/Sort/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { itemsAPI } from "../api/api";
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setIsLoading } from "../redux/homeSlice";
import { setItems } from "../redux/homeSlice";
import { setCurrentPage, setFilter } from "../redux/filterSlice";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';


export type SortType = { name: string, nameProperty: string };


const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.homeReducer.items)
  const isLoading = useSelector((state: RootState) => state.homeReducer.isLoading)
  const { nameProperty } = useSelector((state: RootState) => state.filterReducer.selectedSortType);
  const currentPage = useSelector((state: RootState) => state.filterReducer.currentPage);
  const limit = useSelector((state: RootState) => state.homeReducer.limit);
  const activeCategorie = useSelector((state: RootState) => state.filterReducer.activeCategorie)
  const search = useSelector((state: RootState) => state.filterReducer.search);
  const order = nameProperty.includes('-') ? 'desc' : 'asc';
  const requestGategories = activeCategorie !== 0 ? activeCategorie : '';
  const requestSortType = nameProperty.replace('-', '');
  const skeleton = [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />);
  const itemsSerch = items.map((pizza) => <div className={'content__item'} key={pizza.id}><PizzaBlock {...pizza} /></div>);



  const navigate = useNavigate();
  const isMount = useRef(false)

  const funkFeach = () => {
    itemsAPI.getItems(requestSortType, requestGategories, order, search, currentPage, limit)
      .then(res => {
        dispatch(setItems(res))
        dispatch(setIsLoading(false))
      })
  }



  useEffect(() => {
    funkFeach()
  }, [requestSortType, requestGategories, order, search, currentPage]);


useEffect(() => { 
  if(isMount.current) {
    const query = queryString.stringify({
      requestSortType,
      requestGategories,
      currentPage
    });
  
    navigate({
      pathname: '/',
      search: query
    })
  }
  isMount.current = true;
 
}, [requestSortType, requestGategories, currentPage])


  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value))
  }


  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? skeleton : itemsSerch
        }
      </div>
      <div><Pagination onChange={handleChange} count={3} /></div>
    </>
  )
};


export default Home;