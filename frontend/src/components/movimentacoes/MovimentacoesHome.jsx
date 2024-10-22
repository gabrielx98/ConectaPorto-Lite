import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
const initialState = {
    movimentacao: { id: '', codigo: '', categoria: '', cliente: {}, conteiner: {}, dataInicio: '', dataFim: '' },
    list: []
}

export default class MovimentacoesHome extends Component {
    state = { ...initialState }

    componentDidMount() {
        axios(baseURL + "/Movimentacao/Listar").then(resp => {
            this.setState({ list: resp.data })
        })
    }

    getUpdatedList(mov, add = true) {
        const list = this.state.list.filter(u => u.id !== mov.id)
        if (add) list.unshift(mov)
        return list
    }

    remove(mov) {
        axios.delete(`${baseURL}/Movimentacao/Remover/${mov.id}`).then(resp => {
            const list = this.getUpdatedList(mov, false)
            this.setState({ list })
        })
    }

    renderRows() {
        return this.state.list.map(mov => {
            return (

                <tr key={mov.id}>
                    <td>{mov.id}</td>
                    <td>{mov.codigo}</td>
                    <td>{mov.nome}</td>
                    <td>
                        <button className="btn btn-warning btn-sm mx-2 mb-1"
                            onClick={() => console.log("atualizar")}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger btn-sm ml-2 mb-1"
                            onClick={() => this.remove(mov)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderTable() {
        return (
            <table className="table table-hover mb-0">
                <thead className="">
                    <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    render() {
        return (<Main>
            <div className="d-flex flex-row justify-content-between">
                <h4 className="text-start">Lista de Movimentações</h4>
                <button type="button" className="btn bg-default btn-sm" style={{ height: "30px" }}>
                    <i className="fa fa-globe pe-2" />
                    <a className="text-decoration-none text-white" href="/movimentacoes/cadastro">Nova Movimentação</a>
                </button>
            </div>
            <div className="card p-1 mb-1">
                {this.renderTable()}
            </div>
        </Main>)
    }
}