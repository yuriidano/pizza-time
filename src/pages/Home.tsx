import { useEffect, useState } from "react";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";


const Home = () => {
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
    
      const [items, setItems] = useState<PizzaType[]>([]);
      const [isLoading, setIsLoading] = useState(true)

      useEffect(() => {
        fetch('https://67e4282e2ae442db76d34bc3.mockapi.io/items', {
          method: 'GET',
        })
          .then(res => res.json())
          .then((data: PizzaType[]) => {
            setItems(data);
            setIsLoading(false);
          });
          window.scrollTo(0, 0)
      }, [])

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
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