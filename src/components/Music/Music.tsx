
interface Props {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
}

export const Music = ({price, title, rating, types}: Props) => {
    const typesArr = ['тонке', 'традиційне'];

    return (
        <div className="flex-1/3 flex flex-col items-center">
            <div className=" ">
                <img className="" src="https://react-pizza-v2-psi.vercel.app/assets/img/products/15.png" alt="Pizza" />
            </div>
            <div className="font-bold text-4xl text-center">{title}</div>
            <div>{types.map(item => <div key={item} className="mr-1.5">{typesArr[item]}</div>)}</div>
            <div>{price}</div>
        </div>
    )
}