import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (

    <BrowserRouter>
      <div className="app">

        <Header />

        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<Home />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;

// 2:55:04