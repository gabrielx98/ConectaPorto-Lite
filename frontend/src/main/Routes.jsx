import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import ClientesHome from "../components/clientes/ClientesHome";
import ClientesCadastro from "../components/clientes/ClientesCadastro";
import ClientesAtualizar from "../components/clientes/ClientesAtualizar";
import ConteineresHome from "../components/conteineres/ConteineresHome";
import ConteineresCadastro from "../components/conteineres/ConteineresCadastro";
import MovimentacoesHome from "../components/movimentacoes/MovimentacoesHome";
import MovimentacoesCadastro from "../components/movimentacoes/MovimentacoesCadastro";
import ConteineresAtualizar from "../components/conteineres/ConteineresAtualizar";
import MovimentacoesAtualizar from "../components/movimentacoes/MovimentacoesAtualizar";

const AppRoutes = () => (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/clientes" element={<ClientesHome />} />
        <Route path="/clientes/cadastro" element={<ClientesCadastro />} />
        <Route path="/clientes/atualizar/:id" element={<ClientesAtualizar/>} />
        <Route path="/conteineres" element={<ConteineresHome />} />
        <Route path="/conteineres/cadastro" element={<ConteineresCadastro />} />
        <Route path="/conteineres/atualizar/:id" element={<ConteineresAtualizar/>} />
        <Route path="/movimentacoes" element={<MovimentacoesHome />} />
        <Route path="/movimentacoes/cadastro" element={<MovimentacoesCadastro />} />
        <Route path="/movimentacoes/atualizar/:id" element={<MovimentacoesAtualizar/>} />
        <Route path="*" element={<Home />} />
    </Routes>
);
export default AppRoutes;