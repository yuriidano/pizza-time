import { Link } from "react-router-dom"


export const CartEmpty = () => {


    return (
        <div>
            <div className="mx-auto flex flex-col items-center gap-10 !mb-10">
                <div>
                    <img src="https://xl-static.rozetka.com.ua/assets/img/design/modal-cart-dummy.svg" alt="" />
                </div>
                <h2>Корзина пуста</h2>

            </div>
            <Link className="text-2xl font-bold" to={'/'}>Повернутись</Link>
        </div>
    )
}