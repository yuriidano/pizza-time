import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setActiveCategirie } from "../../redux/filterSlice";


const Categories = () => {
  const activeCategorie = useSelector((state: RootState) => state.filterReducer.activeCategorie);
  const dispatch = useDispatch();

  const categorieHandler = (categorie: number) => {
    dispatch(setActiveCategirie(categorie))
  }


  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categorie, index) => <li className={index === activeCategorie ? 'active' : '' } key={index} onClick={() => categorieHandler(index)}>{categories[index]}</li>)
        }
      </ul>
    </div>
  );
};

export default Categories;
