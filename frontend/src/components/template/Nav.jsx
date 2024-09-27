import React from "react";
import { Link } from "react-router-dom";

export default props =>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <Link to="/" class="navbar-brand">ConectaPorto Lite</Link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link class="nav-link" to="/">Início</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/">Clientes</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/">Conteineres</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/">Movimentações</Link>
                    </li>
                </ul>

                <div class="">
                <span class="align-items-center d-flex badge p-1 ps-3 me-3 bg-info border border-info rounded-pill">
                    <label class="pe-3" >Usuário Logado</label>
                    <i width="24" height="24" className="fa fa-user pe-2" />
                </span>
            </div>
            </div>
        </div>
    </nav>