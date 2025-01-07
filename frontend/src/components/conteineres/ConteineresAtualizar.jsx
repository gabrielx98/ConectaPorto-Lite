import React, { Component } from "react";
import { toast } from 'react-toastify';
import Main from "../template/Main";
import ConteinerProvider from "../../providers/ConteinerProvider";
import { contCategoria, contEstado, contTamanho } from "../../enumerador";

export default class ConteineresAtualizar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conteineres: { id: 0, codigo: '', categoria: '', clienteId: 0, tamanho: '', estado: '' },
            loading: true,
            error: null
        }
    }

    updateState(event) {
        const conteineres = { ...this.state.conteineres }
        conteineres[event.target.name] = event.target.value
        document.getElementById(event.target.name).classList.remove("is-invalid")
        this.setState({ conteineres })
    }

    async save(metodo) {
        const conteiner = this.state.conteineres;
        let valid = true;
        for (let key in conteiner) {
            if (conteiner[key] === '') {
                document.getElementById(key).classList.add("is-invalid")
                toast.error(`Preencha o campo ${key}`)
                valid = false
            }
        }
        if (valid) {
            await metodo(conteiner);
        }
    }

    render() {
        return (
            <Main>
                <div className="d-flex justify-content-center">
                    <div className="card mb-3" style={{ width: "500px" }}>
                        <ConteinerProvider>
                            {({ Conteineres, Clientes, atualizarConteiner }) => {

                                if (Conteineres.id !== undefined && this.state.conteineres.id === 0) {
                                    this.setState({ conteineres: Conteineres })

                                }

                                return (
                                    <form className="d-flex flex-column text-start p-3">

                                        <div className="mb-3">
                                            <label htmlFor="codigo" className="form-label">Código: </label>
                                            <input type="text" id="codigo" maxLength={10} name="codigo" value={this.state.conteineres.codigo} onChange={e => this.updateState(e)} className="form-control" placeholder="Digite o código do conteiner. ex:ABC01234567" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="clienteId" className="form-label">Cliente: </label>
                                            <select id="clienteId" name="clienteId" value={this.state.conteineres.clienteId} onChange={e => this.updateState(e)} className="form-select" >
                                                <option>Selecione...</option>
                                                {Clientes.map((prop, index) => {
                                                    return <option key={index} value={prop.id}>{prop.nome}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="categoria" className="form-label">Categoria: </label>
                                            <select id="categoria" name="categoria" value={this.state.conteineres.categoria} onChange={e => this.updateState(e)} className="form-select" >
                                                <option>Selecione...</option>
                                                {contCategoria.map((prop, index) => {
                                                    return <option key={index} value={prop}>{prop}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="tamanho" className="form-label">Tamanho: </label>
                                            <select id="tamanho" name="tamanho" value={this.state.conteineres.tamanho} onChange={e => this.updateState(e)} className="form-select" >
                                                <option>Selecione...</option>
                                                {contTamanho.map((prop, index) => {
                                                    return <option key={index} value={prop}>{prop}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="estado" className="form-label">Volume: </label>
                                            <select id="estado" name="estado" value={this.state.conteineres.estado} onChange={e => this.updateState(e)} className="form-select" >
                                                <option>Selecione...</option>
                                                {contEstado.map((prop, index) => {
                                                    return <option key={index} value={prop}>{prop}</option>
                                                })}
                                            </select>
                                        </div>

                                        <button onClick={() => this.save(atualizarConteiner)} type="button" className="btn btn-primary btn-sm" style={{ width: "60px" }}>Enviar</button>
                                    </form>
                                )
                            }}
                        </ConteinerProvider>
                    </div>
                </div>
            </Main>
        )
    }
}