import { useEffect, useRef, useState } from "react";
import { SortType } from "../../pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSelectedSortType } from "../../redux/filterSlice";


export const sortType = [
  {name: 'популярности (asc)', nameProperty: 'rating'},
  {name: 'популярности (desc)', nameProperty: '-rating'},
  {name: 'цене (asc)', nameProperty: 'price'},
  {name: 'цене (desc)', nameProperty: '-price'},
  {name: 'алфавиту (asc)', nameProperty: 'category'},
  {name: 'алфавиту (desc)', nameProperty: '-category'},
]

const Sort = () => {
  const dispatch = useDispatch();
  const selectedSortType = useSelector((state: RootState) => state.filterReducer.selectedSortType);
  const [openPopap, setOpenPopap] = useState(false);


  const selectedSortTypeHandler = (obj: SortType) => {
    setOpenPopap(false);
    dispatch(setSelectedSortType(obj))
  }
 
  const popapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const openPopapHandler = (e: MouseEvent) => {
      if(popapRef.current && !popapRef.current.contains(e.target as Node)) {
        setOpenPopap(false)
      } 
    }

    document.body.addEventListener('click', openPopapHandler);


    return () => {
      document.body.removeEventListener('click', openPopapHandler);
    }

  })

  return (
    <div ref={popapRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpenPopap(prev => !prev)}>{selectedSortType.name}</span>
      </div>
      { openPopap &&
        <div className="sort__popup">
          <ul>
              {
                sortType.map((obj, index) => <li onClick={() => selectedSortTypeHandler(obj)} 
                className={obj.nameProperty === selectedSortType.nameProperty ? 'active' : ''} key={index}>{obj.name}</li>)
              }
          </ul>
        </div>
      }
    </div>
  );
};

export default Sort;







