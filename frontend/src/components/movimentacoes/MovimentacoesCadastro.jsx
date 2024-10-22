import React, { Component } from "react";
import Main from "../template/Main";
import {movCategoria} from "../../enumerador";
//import axios from "axios";

//const baseURL = process.env.REACT_APP_API_URL;

/* const [clientes, setClientes] = useState(null);

const [conteineres, setConteineres] = useState(null); */

/* useEffect(() => {
    const fetchData = async () => {
        const response = await axios(baseURL + "/Cliente/Listar");
        const data = await response.data;
        setClientes(data)
    };
    fetchData();
}, []); */

export default class MovimentacoesCadastro extends Component {


    renderOptionCategoria(){
        return movCategoria.map((prop, index) =>{
            return <option key={index} value={prop}>{prop}</option>
        })
     }

    renderOptionCliente(){}
        
    
    renderOptionConteiner(){}

    renderForm() {
        return (
            <form className="d-flex flex-column text-start p-3">
                <div className="mb-3">
                    <label htmlFor="cliente" className="form-label">Cliente</label>
                    <select id="cliente" className="form-select" >
                    <option>Selecione...</option>
                        {this.renderOptionCliente()}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="conteiner" className="form-label">Conteiner</label>
                    <select id="conteiner" className="form-select">
                        <option>Selecione...</option>
                        {this.renderOptionConteiner()}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Categoria</label>
                    <select id="categoria" className="form-select">
                    <option>Selecione...</option>
                        {this.renderOptionCategoria()}
                    </select>
                </div>
                
                <button type="submit" className="btn btn-primary btn-sm" style={{ width: "60px" }}>Enviar</button>
            </form>
        )
    }

    render() {
        return (<Main>
            <div className="d-flex justify-content-center">
                
            <div className="card mb-3" style={{ width: "500px" }}>
                {this.renderForm()}
            </div>

            </div>
        </Main>)
    }
}