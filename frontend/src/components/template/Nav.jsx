import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';

// eslint-disable-next-line
export default props => {
    const navigate = useNavigate()

    const isLoggedIn = !!localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (

        <nav className="navbar navbar-expand navbar-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-white">ConectaPorto Lite</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {isLoggedIn ? (
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/"><i className="fa fa-home pe-1" />Início</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/clientes"><i className="fa fa-gg pe-1" />Clientes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/conteineres"><i className="fa fa-truck pe-1" />Contêineres</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/movimentacoes"><i className="fa fa-globe pe-1" />Movimentações</Link>
                            </li>
                        </ul>

                        <div className="align-items-center d-flex">
                            <span className="align-items-center d-flex badge p-1 ps-3 me-3 bg-white border border-info rounded-pill">
                                <label className="pe-2 text-dark" >Usuário Logado</label>
                                <i width="24" height="24" className="fa fa-user px-2 py-1 bg-dark rounded-pill" />
                            </span>
                            <button className="btn btn-danger" onClick={logout}>Logout</button>
                        </div>
                    </div>
                ) : <a className="btn btn-success ms-auto" onClick={logout} href="/login">Login</a>}
            </div>

        </nav >
    )
}