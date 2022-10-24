import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from './components/Navbar';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import Store from './pages/Store';
import Cart from './pages/Cart';

function App() {

  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route exact path="" element={<Store />}/>
          <Route path="success" element={<Success />}/>
          <Route path="cancel" element={<Cancel />}/>
          <Route path="cart" element={<Cart />}/>
        </Routes>
    </div>
  );
}

export default App;
