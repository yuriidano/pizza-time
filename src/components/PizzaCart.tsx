import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../redux/cartSlice';


interface Props {
    id: number,
    title: string,
    types: string,
    sizes: number,
    price: number,
    count: number
}


export const PizzaCart = ({title, price, sizes, types, count, id}: Props) => {
    const dispatch = useDispatch();
    const itemCartTotalPrice = price * count;

    const plusItemCountHandler = () => {
        dispatch(addItem({title, price, sizes, types, count, id}))
    }
    const minusItemCountHandler = () => {
        dispatch(minusItem(id))
    }

    const removeItemHandler = () => {
        dispatch(removeItem(id))
    }

    return (
        <>
            <div className="cart__item">
                <div className="cart__item-img">
                    <img className="pizza-block__image" src="https://react-pizza-v2-psi.vercel.app/assets/img/products/15.png" alt="Pizza" />
                </div>
                <div className="cart__item-info">
                    <h3>{title}</h3>
                    <p>{types}, {sizes} см.</p>
                </div>
                <div className="cart__item-count">
                    <div className="border border-me-orange cursor-pointer w-8 h-8 rounded-4xl hover:bg-me-orange transition-colors duration-300
          flex justify-center items-center ">
                        <div onClick={minusItemCountHandler} className='text-me-orange hover:text-white transition-colors duration-300'><RemoveIcon /></div>
                    </div>
                    <b>{count}</b>
                    <div className="border border-me-orange cursor-pointer w-8 h-8 rounded-4xl hover:bg-me-orange transition-colors duration-300
           flex justify-center items-center ">
                        <div onClick={plusItemCountHandler} className='text-me-orange hover:text-white transition-colors duration-300'><AddIcon /></div>
                    </div>
                </div>
                <div className="cart__item-price">
                    <b>{itemCartTotalPrice} ₽</b>
                </div>
                <div onClick={removeItemHandler} className="cart__item-remove">
                    <div className="border border-gray-400 cursor-pointer w-8 h-8 rounded-4xl hover:bg-gray-400 transition-colors duration-300
           flex justify-center items-center ">
                        <div className=''><AddIcon /></div>
                    </div>
                </div>
            </div>
        </>
    )
}



