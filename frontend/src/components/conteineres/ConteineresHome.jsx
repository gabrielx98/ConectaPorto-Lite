import React, { Component } from "react";
import Main from "../template/Main";
import ConteinerProvider from "../../providers/ConteinerProvider";

export default class ConteineresHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conteineres: [],
            loading: true,
            error: null
        }
    }
    
    render() {
        return (
            <Main>
                <div className="d-flex flex-row justify-content-between">
                    <h4 className="text-start">Lista de Contêineres</h4>
                    <button type="button" className="btn bg-default btn-sm" style={{ height: "30px" }}>
                        <i className="fa fa-truck pe-2" />
                        <a className="text-decoration-none text-white" href="/conteineres/cadastro">Novo Contêiner</a>
                    </button>
                </div>

                <ConteinerProvider>
                    {({ Conteineres, Clientes, loading, error, deletarConteiner }) => {

                        if (loading) {
                            return <div className="alert alert-info" role="alert">Carregando...</div>;
                        }

                        if (error) {
                            return <div className="alert alert-danger" role="alert">Erro ao carregar Lista: {error.message}</div>;
                        }
                        return (


                            <div className="card p-1 mb-1">
                                <table className="table table-hover mb-0">
                                    <thead className="">
                                        <tr>
                                            <th>ID</th>
                                            <th>Código</th>
                                            <th>Cliente</th>
                                            <th>Categoria</th>
                                            <th>Tamanho</th>
                                            <th>Estado</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            Conteineres.map(conteiner => (

                                                <tr key={conteiner.id}>
                                                    <td>{conteiner.id}</td>
                                                    <td>{conteiner.codigo}</td>
                                                    <td>{Clientes.filter(cliente => cliente.id === conteiner.clienteId)[0].nome}</td>
                                                    <td>{conteiner.categoria}</td>
                                                    <td>{conteiner.tamanho}</td>
                                                    <td>{conteiner.estado}</td>
                                                    <td>
                                                        <a className="btn btn-warning btn-sm mx-2 mb-1"
                                                            href={`/conteineres/atualizar/${conteiner.id}`}>
                                                            <i className="fa fa-pencil"></i>
                                                        </a>
                                                        <button className="btn btn-danger btn-sm ml-2 mb-1"
                                                            onClick={() => deletarConteiner(conteiner.id)}>
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>
                            </div>
                        )
                    }}
                </ConteinerProvider>
            </Main>)
    }
}