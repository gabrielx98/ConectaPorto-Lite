import React from 'react';
import 'jquery/dist/jquery'

export default function dashboard() {



  return (

    <div id='dashboard' className="border border-2 rounded-end border-light bg-light">
      <div className='dashContainer container-fluid'>
        <div className='row'>

          <label className="col-2 mx-5" htmlFor="inputCliente3"><h1 className='row'>Cliente</h1></label>
          <select className="custom-select col-4" id="inputCliente3" defaultValue="default" required>
            <option disabled value="default">Escolher...</option>

          </select>
        </div>

        <div id='conteudoSumario' className='row m-4 table-responsive'>
          
          <table className='table table-hover table-striped table-bordered caption-top text-center'>
           <caption><h4 className='text-success'>Importação</h4></caption>
            <thead>
              
              <tr>
                <th>REPOSICIONAMENTO</th>
                <th>EMBARQUE</th>
                <th>DESCARGA</th>
                <th>GATE IN</th>
                <th>GATE OUT</th>
                <th>PESAGEM</th>
                <th>SCANNER</th>
                <th>TOTAL</th>
              </tr>

            </thead>
            <tbody>
              <tr id='Iconteudo'>

              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              </tr>

            </tbody>
          </table>
          
          <table className='table table-hover table-striped table-bordered caption-top text-center'>
           <caption><h4 className='text-danger'>Exportação</h4></caption>
            <thead>
              
              <tr>
                <th>REPOSICIONAMENTO</th>
                <th>EMBARQUE</th>
                <th>DESCARGA</th>
                <th>GATE IN</th>
                <th>GATE OUT</th>
                <th>PESAGEM</th>
                <th>SCANNER</th>
                <th>TOTAL</th>
              </tr>

            </thead>
            <tbody>
              <tr id='Econteudo'>

              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              </tr>

            </tbody>
          </table>


        </div>
      </div>




    </div>

  )
}