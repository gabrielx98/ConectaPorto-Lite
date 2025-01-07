import React, { Component } from "react";
import Main from "../template/Main";
import MovimentacaoProvider from "../../providers/MovimentacaoProvider";

export default class MovimentacoesHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movimentacoes: [],
            loading: true,
            error: null
        }
    }

    formateData(data) {
        let date = new Date(Date.parse(data));
        let formatter = new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        let formattedDate = formatter.format(date);
        return formattedDate;
    }

    renderRows(Movimentacoes, Conteineres, Clientes, atualizarMovimentacao, deletarMovimentacao) {
        return Movimentacoes.map(mov => {
            return (

                <tr key={mov.id}>
                    <td>{mov.id}</td>
                    <td>{mov.codigo}</td>
                    <td>{mov.categoria}</td>
                    <td>{Clientes.filter(cliente => cliente.id === mov.clienteId)[0].nome}</td>
                    <td>{Conteineres.filter(conteiner => conteiner.id === mov.conteinerId)[0].codigo}</td>
                    <td>{this.formateData(mov.dataInicio)}</td>
                    <td>{this.formateData(mov.dataFim)}</td>
                    <td>
                        <a className="btn btn-warning btn-sm mx-2 mb-1"
                            href={`/movimentacoes/atualizar/${mov.id}`}>
                            <i className="fa fa-pencil"></i>
                        </a>
                        <button className="btn btn-danger btn-sm ml-2 mb-1"
                            onClick={() => deletarMovimentacao(mov)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderTable(Movimentacoes, Conteineres, Clientes, atualizarMovimentacao, deletarMovimentacao) {
        return (
            <table className="table table-hover mb-0">
                <thead className="">
                    <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Categória</th>
                        <th>Cliente</th>
                        <th>Conteiner</th>
                        <th>Data de Início</th>
                        <th>Data de Finalização</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows(Movimentacoes, Conteineres, Clientes, atualizarMovimentacao, deletarMovimentacao)}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <Main>
                <div className="d-flex flex-row justify-content-between">
                    <h4 className="text-start">Lista de Movimentações</h4>
                    <button type="button" className="btn bg-default btn-sm" style={{ height: "30px" }}>
                        <i className="fa fa-globe pe-2" />
                        <a className="text-decoration-none text-white" href="/movimentacoes/cadastro">Nova Movimentação</a>
                    </button>
                </div>
                <MovimentacaoProvider>
                    {({ Movimentacoes, Conteineres, Clientes, loading, error, atualizarMovimentacao, deletarMovimentacao }) => {
                        if (loading) {
                            return <div className="alert alert-info" role="alert">Carregando...</div>;
                        }

                        if (error) {
                            return <div className="alert alert-danger" role="alert">Erro ao carregar Lista: {error.message}</div>;
                        }


                        return (

                            <div className="card p-1 mb-1">
                                {this.renderTable(Movimentacoes, Conteineres, Clientes, atualizarMovimentacao, deletarMovimentacao)}
                            </div>
                        )
                    }}
                </MovimentacaoProvider>
            </Main>
        )
    }
}