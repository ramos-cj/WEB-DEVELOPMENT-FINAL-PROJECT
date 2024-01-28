
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LogninSignup } from './Pages/LogninSignup';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/guitar' element={<ShopCategory category="guitar"/>}/>
        <Route path='/accessories' element={<ShopCategory category="accessories"/>}/>
        <Route path='/amplifier' element={<ShopCategory category="amplifier"/>}/>
        <Route path='/effects' element={<ShopCategory category="effects"/>}/>
        <Route path="product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LogninSignup/>}/>
      </Routes>
      <Footer/>


      </BrowserRouter>
    </div>
  );
}

export default App;
