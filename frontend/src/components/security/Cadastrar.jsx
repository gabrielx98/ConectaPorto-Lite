import React, { Component } from "react";
import { toast } from 'react-toastify';
import Main from "../template/Main";
import SecurityProvider from "../../providers/SecurityProvider";
// eslint-disable-next-line
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: { email: '', senha: '', confirmaSenha: '' },
            loading: true,
            error: null
        }
    }

    updateState(event) {
        const usuario = { ...this.state.usuario }
        usuario[event.target.name] = event.target.value
        document.getElementById(event.target.name).classList.remove("is-invalid")
        this.setState({ usuario })
    }

    async cadastro(metodo) {
        const usuario = this.state.usuario;
        let valid = true;
        for (let key in usuario) {
            if (usuario[key] === '') {
                document.getElementById(key).classList.add("is-invalid")
                toast.error(`Preencha o campo ${key}`)
                valid = false
            }
        }
        if(usuario.password !== usuario.confirmPassword){
            document.getElementById("senha").classList.add("is-invalid")
            document.getElementById("confirmaSenha").classList.add("is-invalid")
            toast.error("As senhas não conferem")
            valid = false
        }
        if (valid) {
            await metodo(usuario);
        }
    }

    render() {
        return (
            <Main>
                <div className="d-flex justify-content-center">
                    <div className="card mb-3" style={{ width: "500px" }}>
                        <SecurityProvider>
                            {({ cadastrar }) => {
                                return (
                                    <form className="d-flex flex-column text-start p-3">

                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email: </label>
                                            <input type="email" id="email" name="email" className="form-control" value={this.state.usuario.email} onChange={e => this.updateState(e)} placeholder="Digite seu email" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="senha" className="form-label">Password: </label>
                                            <input type="password" id="senha" name="senha" className="form-control" value={this.state.usuario.senha} onChange={e => this.updateState(e)} placeholder="Digite sua senha" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="confirmaSenha" className="form-label">Confirm Password: </label>
                                            <input type="password" id="confirmaSenha" name="confirmaSenha" className="form-control" value={this.state.usuario.confirmaSenha} onChange={e => this.updateState(e)} placeholder="Digite sua senha" />
                                        </div>
                                        <div className="mb-3 d-flex justify-content-between">
                                            <button type="button" onClick={() => this.cadastro(cadastrar)} className="btn btn-success btn-sm">Cadastrar</button>
                                            <a type="button" href="/login" className="btn btn-primary btn-sm">Voltar</a>
                                        </div>
                                    </form>

                                )
                            }}
                        </SecurityProvider>
                    </div>
                </div>
            </Main>
        )
    }
}