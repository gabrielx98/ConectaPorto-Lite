import React from "react";
import { alterMov } from "../scripts";
import 'jquery/dist/jquery'


export default function Registros() {



    return (
        <div id='registros' className="border border-2 rounded-end border-light bg-light">
            <div className='container-fluid'>

                
                <div id='conteudoRegistros' className='row table-responsive mt-3'>
                    <table className='table table-hover table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Nº Movimentação</th>
                                <th>Código do Container</th>
                                <th>Tipo de Movimentação</th>
                                <th>Data de início</th>
                                <th>Data de Finalização</th>
                                <th><div>
                                    <button id='myInput' type='button' data-bs-toggle="modal" data-bs-target='#exampleModal' className='btn btn-warning mx-1'>Alterar Dados</button>

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Alterar Movimentação</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={alterMov}>
                                                        <div className=" mb-3">
                                                            <label htmlFor="inputCodContainer3">Código do Container</label>
                                                            <input type="text" className="form-control" id="inputCodContainer3" placeholder="Ex: ABCD1234567" required minLength="11" maxLength="11" />
                                                        </div>
                                                        <div className=" mb-3">
                                                            <label htmlFor="alterCodMov">Código da Movimentação</label>
                                                            <input type="number" className="form-control" id="alterCodMov" required />
                                                        </div>

                                                        <div className='mb-3  container '>
                                                            <div className="row">
                                                                <div className="col">

                                                                    <label className="row" htmlFor="alterCategoria">Categoria</label>
                                                                    <select className="custom-select row" id="alterCategoria" defaultValue="default" required>
                                                                        <option disabled value="default">Escolher...</option>
                                                                        <option value="Embarque">Embarque</option>
                                                                        <option value="Descarga">Descarga</option>
                                                                        <option value="Gate In">Gate In</option>
                                                                        <option value="Gate Out">Gate Out</option>
                                                                        <option value="Reposicionamento">Reposicionamento</option>
                                                                        <option value="Pesagem">Pesagem</option>
                                                                        <option value="Scanner">Scanner</option>
                                                                    </select>
                                                                </div>

                                                                <div className="col">
                                                                    <label className="row" htmlFor="alterCliente">Cliente</label>
                                                                    <select className="custom-select row" id="alterCliente" defaultValue="default" required>
                                                                        <option disabled value="default">Escolher...</option>

                                                                    </select>
                                                                </div>
                                                            </div>



                                                        </div>
                                                        <div className='mb-3 container'>
                                                            <div className="row">
                                                                <div className="col">

                                                                    <label className="row" htmlFor="alterDataInicial">Data de Inicio</label>
                                                                    <input className='row' id="alterDataInicial" type="date" required />


                                                                </div>
                                                                <div className="col">

                                                                    <label className="row" htmlFor="alterHoraInicial">Hora de Inicio</label>
                                                                    <input className="row" type="time" id="alterHoraInicial" required />


                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-3 container'>
                                                            <div className="row">
                                                                <div className="col">

                                                                    <label className="row" htmlFor="alterDataFinal">Data de Finalização</label>
                                                                    <input className='row' id="alterDataFinal" type="date" required />


                                                                </div>
                                                                <div className="col">

                                                                    <label className="row" htmlFor="alterHoraFinal">Hora de Finalização</label>
                                                                    <input className="row" type="time" id="alterHoraFinal" required />


                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex flex-row-reverse pb-3 pt-5'>
                                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                                            <button type="submit" className="btn btn-success mx-1">Enviar</button>
                                                            <button type="reset" className="btn btn-primary ">Limpar</button>
                                                        </div>
                                                    </form>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div></th>
                            </tr>
                        </thead>
                        <tbody id='tbody'>

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}