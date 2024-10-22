import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import ClientesHome from "../components/clientes/ClientesHome";
import ClientesCadastro from "../components/clientes/ClientesCadastro";
import ConteineresHome from "../components/conteineres/ConteineresHome";
import ConteineresCadastro from "../components/conteineres/ConteineresCadastro";
import MovimentacoesHome from "../components/movimentacoes/MovimentacoesHome";
import MovimentacoesCadastro from "../components/movimentacoes/MovimentacoesCadastro";

export default props =>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/clientes" element={<ClientesHome />} />
        <Route path="/clientes/cadastro" element={<ClientesCadastro />} />
        <Route path="/conteineres" element={<ConteineresHome />} />
        <Route path="/conteineres/cadastro" element={<ConteineresCadastro />} />
        <Route path="/movimentacoes" element={<MovimentacoesHome />} />
        <Route path="/movimentacoes/cadastro" element={<MovimentacoesCadastro />} />
        <Route path="*" element={<Home />} />
    </Routes>

