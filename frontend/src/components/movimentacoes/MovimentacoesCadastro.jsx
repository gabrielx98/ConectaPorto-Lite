import React, { Component } from "react";
import Main from "../template/Main";
import { movCategoria } from "../../enumerador";
import MovimentacaoProvider from "../../providers/MovimentacaoProvider";
import { toast } from 'react-toastify';

export default class MovimentacoesCadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movimentacao: { categoria: '', clienteId: 0, conteinerId: 0, dataInicio: '', dataFim: '' },
            loading: true,
            error: null
        }
    }

    updateState(event) {
        const movimentacao = { ...this.state.movimentacao }
        if (event.target.name === "clienteId" || event.target.name === "conteinerId") {
            movimentacao[event.target.name] = +event.target.value
        } else {
            movimentacao[event.target.name] = event.target.value
        }
        document.getElementById(event.target.name).classList.remove("is-invalid")
        this.setState({ movimentacao })
    }

    renderOptionCategoria() {
        return movCategoria.map((prop, index) => {
            return <option key={index} value={prop}>{prop}</option>
        })
    }

    renderOptionCliente(Clientes) {
        return Clientes.map((prop, index) => {
            return <option key={index} value={prop.id}>{prop.nome}</option>
        })
    }

    renderOptionConteiner(Conteiner) {
        const filtrado = Conteiner.filter(conteiner => conteiner.clienteId === this.state.movimentacao.clienteId);
        return filtrado.map((prop, index) => {
            return <option key={index} value={prop.id}>{prop.codigo}</option>
        })
    }

    async save(metodo) {
        const mov = this.state.movimentacao;
        let valid = true;
        for (let key in mov){
            if (mov[key] === '' || mov[key] === 0){
                document.getElementById(key).classList.add("is-invalid")
                toast.error(`Preencha o campo ${key}`)
                valid = false
            }
        }
        if(valid){
            await metodo(mov);
        }
    }

    render() {
        return (
            <Main>
                <MovimentacaoProvider>

                    {({ Conteineres, Clientes, cadastrarMovimentacao }) => {
                        return (

                            <div className="d-flex justify-content-center">

                                <div className="card mb-3" style={{ width: "500px" }}>
                                    <form className="d-flex flex-column text-start p-3">
                                        <div className="mb-3">
                                            <label htmlFor="clienteId" className="form-label">Cliente:</label>
                                            <select id="clienteId" name="clienteId" value={this.state.clienteId} onChange={e => this.updateState(e)} className="form-select" >
                                                <option>Selecione...</option>
                                                {this.renderOptionCliente(Clientes)}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="conteinerId" className="form-label">Conteiner:</label>
                                            <select id="conteinerId" name="conteinerId" value={this.state.conteinerId} onChange={e => this.updateState(e)} className="form-select">
                                                <option>Selecione...</option>
                                                {this.renderOptionConteiner(Conteineres)}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="categoria" className="form-label">Categoria:</label>
                                            <select id="categoria" name="categoria" value={this.state.categoria} onChange={e => this.updateState(e)} className="form-select">
                                                <option>Selecione...</option>
                                                {this.renderOptionCategoria()}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="dataInicio" className="form-label">Data Inicio:</label>
                                            <input type="date" id="dataInicio" name="dataInicio" value={this.state.dataInicio} onChange={e => this.updateState(e)} className="form-select" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="dataFim" className="form-label">Data Final:</label>
                                            <input type="date" id="dataFim" name="dataFim" value={this.state.dataFim} onChange={e => this.updateState(e)} className="form-select" />
                                        </div>

                                        <button onClick={() => this.save(cadastrarMovimentacao)} type="button" className="btn btn-primary btn-sm" style={{ width: "60px" }}>Enviar</button>
                                    </form>
                                </div>

                            </div>
                        )
                    }}
                </MovimentacaoProvider>
            </Main>
        )
    }
}