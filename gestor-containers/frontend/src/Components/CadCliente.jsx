import React from "react";
import { cadCliente } from "../scripts";

export default function Cliente() {
  return (

    <div id='cadastroCliente' className="border border-2 rounded-end border-light bg-light">

      <form onSubmit={cadCliente} className='bg-white'>
        <div className="form-group mx-5 py-1">
          <label htmlFor="nomeCliente" className='py-1'>Nome do Cliente</label>
          <input type="text" className="form-control" id="nomeCliente" placeholder="Nome do Cliente" required />
          <small className="form-text text-muted">Insira no nome do novo Cliente.</small>
        </div>
        <div className='d-flex flex-row-reverse p-4 mx-4 '>
          <button id="botaoEnviar" type="submit" className="btn btn-primary">Enviar</button>
          <button type="reset" className="btn btn-primary me-5">Limpar</button>
        </div>
      </form>

    </div>
  )


}