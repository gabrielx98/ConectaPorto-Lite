import React from "react";
import { cadContainer } from "../scripts";

export default function Container() {
    return (



        <div id='cadastroContainer' className="border border-2 rounded-end border-light bg-light">
            <form  onSubmit={cadContainer}  className='bg-white'>
                <div className="form-group mx-5 py-1">


                    <div className="form-group my-3">
                        <label htmlFor="inputCodContainer1">Código do Container</label>
                        <input type="text" className="form-control" id="inputCodContainer1" placeholder="Ex: ABCD1234567" required minLength="11" maxLength="11"/>
                    </div>

                    <div className='form-row'>

                        <label className="my-1 mx-2 col-2" htmlFor="inputCliente">Cliente</label>
                        <select className="custom-select my-1 mr-sm-2 col-lg-2 col" id="inputCliente" defaultValue="default" required>
                            <option disabled value="default">Escolher...</option>
                            
                        </select>
                        
                        <label className="my-1 mx-2 col-2" htmlFor="inputTamanho">Tamanho</label>
                        <select className="custom-select my-1 mr-sm-2 col-lg-2 col-3" id="inputTamanho" defaultValue="default" required>
                            <option disabled value="default">Escolher...</option>
                            <option value="20">20 pés</option>
                            <option value="40">40 pés</option>

                        </select>

                    </div>
                    <div className='form-row'>

                        <label className="my-1 mx-2 col-2" htmlFor="inputStatus">Volume</label>
                        <select className="custom-select my-1 mr-sm-2 col-lg-2 col" id="inputCondicao" defaultValue="default" required>
                            <option disabled value="default">Escolher...</option>
                            <option value="Cheio">Cheio</option>
                            <option value="Vazio">Vazio</option>

                        </select>

                        <label className="my-1 mx-2 col-2" htmlFor="inputCategoria">Categoria</label>
                        <select className="custom-select my-1 mr-sm-2 col-lg-2 col-3" id="inputCategoria" defaultValue="default" required>
                            <option disabled value="default">Escolher...</option>
                            <option value="Importação">Importação</option>
                            <option value="Exportação">Exportação</option>

                        </select>

                    </div>
                    <div className='d-flex flex-row-reverse pb-3 pt-5'>
                        <button type="submit" className="btn btn-primary ">Enviar</button>
                        <button type="reset"  className="btn btn-primary me-5">Limpar</button>
                    </div>


                </div>
            </form>
        </div>
    )
}