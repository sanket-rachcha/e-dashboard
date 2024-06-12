
import './App.css';
import NavBar from './componats/NavBar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './componats/Footer';
import SignUp from './componats/SignUp';
import PrivateComponent from './componats/PrivateComponent';
import Login from './componats/Login';
import AddProduct from './componats/AddProduct';
import ProductList from './componats/ProductList';
import UpdateProduct from './componats/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>

      <Routes>

        <Route element={<PrivateComponent/>}>

        <Route path='/' element={<ProductList/>}></Route>
        <Route path='/add' element={<AddProduct/>}></Route>
        <Route path='/update/:id' element={<UpdateProduct/>}></Route>
        <Route path='/logout' element={<h1>Logout</h1>}></Route>
        <Route path='/profile' element={<h1>Profile Page</h1>}></Route>
        </Route>


        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

      </Routes>

      </BrowserRouter>
      <Footer/>
            
    </div>
  );
}

export default App;
