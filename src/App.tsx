import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import './scss/app.scss';
import Home from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';
import React from 'react';
import Musics from './pages/Musics';
export type PizzaType = {
  id: number,
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  price: number,
  category: number,
  rating: number
};

export const SearchContext = React.createContext<{ search: string, setSearch: (search: string) => void } | undefined>(undefined)

function App() {

  return (
    <div className="wrapper">
      <div className='container'>
        <div className='main'>
          <Header />
          <div className="content">
            <Routes>
              <Route path='/*' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/music/*' element={<Musics />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
