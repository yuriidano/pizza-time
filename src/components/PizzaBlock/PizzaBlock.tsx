import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";

type PropsType = {
  id: number,
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  price: number,
  category: number,
  rating: number
};

const PizzaBlock = ({title, price, sizes, types, id}: PropsType) => {
  const dispatch = useDispatch();
  const itemsCart = useSelector((state: RootState) => state.cartReducer.items);
  const itemFind = itemsCart.find(item => item.id === id);
 
  const typeNames = ['тонкое' , 'традиційне'];
  const [activeType, setActiveType] = useState(0);
  const [activeTSize, setActiveSize] = useState(0);


  const addCartItemHandler = () => {
    const newCartItem = {
      id,
      title,
      types: typeNames[activeType],
      sizes: sizes[activeTSize],
      price,
      count: 1
  }

    dispatch(addItem(newCartItem))
  }

  return (
    <div className="pizza-block">
      <div className="pizza-block__image">
        <img src="https://react-pizza-v2-psi.vercel.app/assets/img/products/15.png" alt="Pizza" />
      </div>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {
            types.map((type, index) => <li onClick={() => setActiveType(index)} key={index} className={activeType === index ? 'active' : ''}>
              {typeNames[type]}</li>)
          }
        </ul>
        <ul>
          {
            sizes.map((size, index) => <li onClick={() => setActiveSize(index)} key={index} className={activeTSize === index ? "active" : ''}>
              {size}см.</li>)
          }
        </ul>
      </div>
      <div onClick={addCartItemHandler} className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} $</div>
        <div className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {itemFind?.count &&
            <i>{itemFind?.count}</i>
          }
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
