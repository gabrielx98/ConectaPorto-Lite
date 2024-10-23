import React, { Component } from "react";
import { toast } from 'react-toastify';
import Main from "../template/Main";
import ClientesProvider from "../../providers/ClientesProvider";

export default class ClientesCadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cliente: { codigo: '', nome: '' },
            loading: true,
            error: null
        }
    }

    updateState(event) {
        const cliente = { ...this.state.cliente }
        cliente[event.target.name] = event.target.value
        document.getElementById(event.target.name).classList.remove("is-invalid")
        this.setState({ cliente })
    }

    async save(metodo) {
        const cliente = this.state.cliente;
        let valid = true;
        for (let key in cliente) {
            if (cliente[key] === '') {
                document.getElementById(key).classList.add("is-invalid")
                toast.error(`Preencha o campo ${key}`)
                valid = false
            }
        }
        if (valid) {
            await metodo(cliente);
        }
    }

    render() {
        return (
            <Main>
                <div className="d-flex justify-content-center">
                    <div className="card mb-3" style={{ width: "500px" }}>
                        <ClientesProvider>
                            {({ cadastrarCliente }) => {
                                return (
                                    <form className="d-flex flex-column text-start p-3">
                                        <div className="mb-3">
                                            <label htmlFor="codigo" className="form-label">Sigla: </label>
                                            <input type="text" id="codigo" maxLength={3} name="codigo" value={this.state.cliente.codigo} onChange={e => this.updateState(e)} className="form-control" placeholder="Digite a sigla do cliente" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="nome" className="form-label">Nome: </label>
                                            <input type="text" id="nome" name="nome" value={this.state.cliente.nome} onChange={e => this.updateState(e)} className="form-control" placeholder="Digite a nome do cliente" />
                                        </div>
                                        <button onClick={() => this.save(cadastrarCliente)} type="button" className="btn btn-primary btn-sm" style={{ width: "60px" }}>Enviar</button>
                                    </form>
                                )
                            }}
                        </ClientesProvider>
                    </div>
                </div>
            </Main>
        )
    }
}