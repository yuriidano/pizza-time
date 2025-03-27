import { useState } from "react";

const Categories = () => {
  const [active, setActive] = useState(0)

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
          {
            categories.map((categorie, index) => <li onClick={() => setActive(index)} className={active === index ? "active" : ''} key={index}>{categorie}</li>)
          }
      </ul>
    </div>
  );
};

export default Categories;
