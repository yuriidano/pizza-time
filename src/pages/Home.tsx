import { useEffect, useState } from "react";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { itemsAPI } from "../api/api";
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

export type SortType = {name: string, nameProperty: string}

const Home = () => {
      const [items, setItems] = useState<PizzaType[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [selectSortType, setSelectSortType] = useState({name: 'популярности (asc)', nameProperty: 'rating'});
      const [selectedCategory, setSelectedCategory] = useState(0);

      const order = selectSortType.nameProperty.includes('-') ? 'desc' : 'asc';
      const requestSortType = selectSortType.nameProperty.replace('-', '');
      const requestCategory = selectedCategory !== 0 ? selectedCategory : '';

      useEffect(() => {
        itemsAPI.getItems(requestSortType, requestCategory, order)
          .then(res => {
            setItems(res);
            setIsLoading(false)
          })
      }, [requestSortType, requestCategory, order])


    return (
        <>
            <div className="content__top">
                <Categories selectedCategory={selectedCategory} setSelectedCategory={(index: number) => setSelectedCategory(index)} />
                <Sort selectSortType={selectSortType} setSelectSortType={(obj: SortType) => setSelectSortType(obj)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />)
                              : items.map((pizza) => <div className={'content__item'} key={pizza.id}><PizzaBlock {...pizza} /></div>)
                }
            </div>
        </>
    )
};


export default Home;