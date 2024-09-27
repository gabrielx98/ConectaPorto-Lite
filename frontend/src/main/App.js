import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Nav from '../components/template/Nav';
import Routes from './Routes';
import Footer from '../components/template/Footer';

export default props =>
  <BrowserRouter>
    <div className="App">
      <Nav />
      <Routes />
      <Footer />
    </div>
  </BrowserRouter>




