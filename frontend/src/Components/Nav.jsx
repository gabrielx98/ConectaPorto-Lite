import React from "react";
import {showCadCliente,showCadContainer, showCadMov,showDashboard,showRegistros} from '../scripts'
export default function nav() {
    
    return (

        <nav className="container col-4 col-lg-2 ">
        <header >
          <h1 id='tituloEmpresa' className="fs-3  text-center"><a href="/" className="text-decoration-none text-white">PortControl</a></h1>
        </header>

      <ul className="nav flex-column">
        <h5 id='listItem' className="text-white">Cadastro</h5>
        <li className="nav-item"><button id='showCliente' onClick={showCadCliente} className="text-decoration-none text-white btn btn-link">Clientes</button></li>
        <li className="nav-item"><button id='showContainer' onClick={showCadContainer} className="text-decoration-none text-white btn btn-link">Container</button></li>
        <li className="nav-item"><button id='showmov' onClick={showCadMov} className="text-decoration-none text-white btn btn-link" >Movimentação</button></li>
      </ul>
      <ul className="nav flex-column mt-4">
        <h5 id='listItem' className="text-white">DashBoard</h5>
        <li className="nav-item"><button id='showDash' onClick={showDashboard} className="text-decoration-none text-white btn btn-link">Overview</button></li>
        <li className="nav-item"><button id='showReg' onClick={showRegistros} className="text-decoration-none text-white btn btn-link">Registros</button></li>
        
      </ul>
      
      </nav>
    )}