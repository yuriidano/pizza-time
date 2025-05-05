import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store";
import { useState } from "react";
import { setType, TypePizza } from "../../redux/muicSlice";



export const sortType = [
    {name: 'популярности (asc)', nameProperty: 'rating'},
    {name: 'популярности (desc)', nameProperty: '-rating'},
    {name: 'цене (asc)', nameProperty: 'price'},
    {name: 'цене (desc)', nameProperty: '-price'},
    {name: 'алфавиту (asc)', nameProperty: 'category'},
    {name: 'алфавиту (desc)', nameProperty: '-category'},
]

export const MusicSort = () => {
const dispatch = useDispatch();
const activeType = useSelector((state: RootState) => state.musicReducer.activeType);
const [activePopap, setActivePopap] = useState(false);

const activePopapHandler = (obg: TypePizza) => {
    setActivePopap(false)
    dispatch(setType(obg))
    }


    return (
        <div className="relative">
            <div className="!mb-3"><span className="font-bold !mr-2">Сортування по:</span> <span onClick={() => { setActivePopap(prev => !prev) }}
                className="!text-amber-500 underline cursor-pointer">{activeType.name}</span></div>
            <div className={`bg-amber-100 !py-4 rounded-2xl absolute  ${activePopap ? 'opacity-100' : 'opacity-0'}`}>
                <ul className="flex flex-col gap-y-3 !px-1.5 ">
                    {
                        sortType.map((type, index) => {
                            return (
                                <li key={index} onClick={(e) => activePopapHandler(type)} className={`text-lg !px-2.5 cursor-pointer rounded-xl hover:bg-amber-300 duration-300 
                                       ${type.nameProperty === activeType.nameProperty ? 'bg-amber-300' : ''} `}
                                >{sortType[index].name}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}