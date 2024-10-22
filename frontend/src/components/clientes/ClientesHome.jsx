'use client'
import React, { Component } from "react";
import Main from "../template/Main";
import ClientesProvider from "../../providers/ClientesProvider";

export default class ClientesHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientes: [],
            loading: true,
            error: null
        }

    }
    
    render() {
        return (
            <Main>
                <div className="d-flex flex-row justify-content-between">
                    <h4 className="text-start">Lista de Clientes</h4>
                    <button type="button" className="btn bg-default btn-sm" style={{ height: "30px" }}>
                        <i className="fa fa-user-plus pe-2" />
                        <a className="text-decoration-none text-white" href="/clientes/cadastro">Novo Cliente</a>
                    </button>
                </div>

                <ClientesProvider>
                    {({ clientes, loading, error, cadastrarCliente, atualizarCliente, deletarCliente }) => {

                        if (loading) {
                            return <div className="alert alert-info" role="alert">Carregando...</div>;
                        }

                        if (error) {
                            return <div className="alert alert-danger" role="alert">Erro ao carregar Clientes: {error.message}</div>;
                        }

                        return (

                            <div className="card p-1 mb-1">
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
                                        {clientes.map(cliente => (
                                            <tr key={cliente.id}>
                                                <td>{cliente.id}</td>
                                                <td>{cliente.codigo}</td>
                                                <td>{cliente.nome}</td>
                                                <td>
                                                    <button className="btn btn-warning btn-sm mx-2 mb-1"
                                                        onClick={() => console.log("rota de atualizar")}>
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-danger btn-sm ml-2 mb-1"
                                                        onClick={() => deletarCliente(cliente.id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    }}
                </ClientesProvider>
            </Main>
        )
    }
}
