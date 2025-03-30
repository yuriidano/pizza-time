
type PropsType = {
  selectedCategory: number,
  setSelectedCategory: (index: number) => void
}

const Categories = ({setSelectedCategory, selectedCategory}: PropsType) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
          {
            categories.map((categori, index) => <li className={index === selectedCategory ? 'active' : ''} onClick={() => setSelectedCategory(index)} 
            key={index}>{categories[index]}</li>)
          }
      </ul>
    </div>
  ); 
};

export default Categories;
