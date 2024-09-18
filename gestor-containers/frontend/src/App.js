import React from 'react';
import Nav from './Components/Nav'
import CadCliente from './Components/CadCliente'
import CadContainer from './Components/CadContainer';
import CadMov from './Components/CadMovimentacao';
import Dashboard from './Components/Dashboard';
import Registros from './Components/Registros';
function App() {

  return (
    <div id='App' className="App row">

      <Nav />

      <section id='sectionContent' className="col-8 col-lg-10 ">
        <div id='headerSection' className="border border-2 rounded-end border-light bg-light my-4">
          <h1 id='pageTitle' className='mx-5'>Painel de Movimentações</h1>

        </div>
        <div>

          <div id='Home' className='border border-2 rounded-end border-light bg-light'>
            <div className='bg-white'>
              <div className='m-1'>

                <h3 className='m-3'>Bem vindo ao Painel de Movimentações!!!!</h3>
                <p className='m-3 '>Aqui você pode realizar cadastro de clientes, containers e movimentações de container. <br></br>
                  Cadastre primeiramente o cliente, em seguida o container do cliente e logo após, a movimentação do container.<br></br>
                  Depois de cadastrados você podera visualizar um dashboard com gráficos ilustrando as informações e um relátorio com todas as movimentações. <br></br>
                </p>
                <h6 className='m-3 mb-4'>Bom Trabalho!!!!</h6>
              </div>
            </div>

          </div>

          <CadCliente />
          <CadContainer />
          <CadMov />
          <Dashboard />
          <Registros />

        </div>


      </section>
    </div>

  );
}

export default App;
