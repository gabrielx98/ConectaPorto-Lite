import React from "react";
import { cadMovimentacao } from "../scripts";

export default function cadMov(){
    return(

        <div id='cadastroMovimentacao' className="border border-2 rounded-end border-light bg-light">
          <form onSubmit={cadMovimentacao} className='bg-white'>
            <div className="form-group mx-5 py-1">


              <div className="form-group my-3">
                <label htmlFor="inputCodContainer2">Código do Container</label>
                <input type="text" className="form-control" id="inputCodContainer2" placeholder="Ex: ABCD1234567" required minLength="11" maxLength="11"/>
              </div>

              <div className='form-row'>

                <label className="my-1 mx-2 col-2" htmlFor="inputCategoria2">Categoria</label>
                <select className="custom-select my-1 mr-sm-2 col-lg-2 col" id="inputCategoria2" defaultValue="default" required>
                  <option disabled value="default">Escolher...</option>
                  <option value="Embarque">Embarque</option>
                  <option value="Descarga">Descarga</option>
                  <option value="Gate In">Gate In</option>
                  <option value="Gate Out">Gate Out</option>
                  <option value="Reposicionamento">Reposicionamento</option>
                  <option value="Pesagem">Pesagem</option>
                  <option value="Scanner">Scanner</option>
                </select>

                <label className="my-1 mx-2 col-2" htmlFor="inputCliente2">Cliente</label>
                        <select className="custom-select my-1 mr-sm-2 col-lg-2 col" id="inputCliente2" defaultValue="default" required>
                            <option disabled value="default">Escolher...</option>
                            
                        </select>


              </div>
              <div className='form-row'>
                  
                    
                <label className="my-1 mx-2 col-2" htmlFor="inputDataInicial">Data de Inicio</label>
                <input id="inputDataInicial" className="col-2" type="date" required/>
                


                <label className="my-1 mx-2 col-2" htmlFor="inputHoraInicial">Hora de Inicio</label>
                <input type="time" className="col-2" id="inputHoraInicial" required/>
                

              </div>

              <div className='form-row'>

                <label className="my-1 mx-2 col-2" htmlFor="inputDataFinal">Data de finalização</label>
                <input id="inputDataFinal" className="col-2" type="date" required/>

                <label className="my-1 mx-2 col-2" htmlFor="inputHoraFinal">Hora de finalização</label>
                <input type="time" className="col-2" id="inputHoraFinal" required/>

              </div>
              <div className='d-flex flex-row-reverse pb-3 pt-5'>
                <button type="submit"  className="btn btn-primary ">Enviar</button>
                <button type="reset" className="btn btn-primary me-5">Limpar</button>
              </div>


            </div>
          </form>
        </div>
    )
}