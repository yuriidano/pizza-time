import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setActiveCategories } from "../../redux/muicSlice";


export const MusicCategiries = () => {
    const dispatch = useDispatch();
    const activeCategories = useSelector((state: RootState) => state.musicReducer.activeCategories);

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    const activeCategoriesChanged = (categorie: number) => {
        dispatch(setActiveCategories(categorie))
    }
    

    return (
        <div className="flex gap-x-5">
            {
                categories.map((item, index) => {
                    return (
                        <div key={index} onClick={() => activeCategoriesChanged(index)}
                         className={`text-1xl font-bold  min-h-12 flex justify-center items-center !px-8 rounded-2xl cursor-pointer
                         ${index === activeCategories ? `bg-amber-700` :  `bg-amber-300 hover:bg-amber-500 transition-colors duration-300`}`}
                        >{categories[index]}</div>
                    )
                })
            }
        </div>
    )
}