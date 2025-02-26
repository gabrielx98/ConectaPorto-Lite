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
import Login from "../components/security/Login";
import Cadastrar from "../components/security/Cadastrar";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/clientes" element={<ProtectedRoute><ClientesHome /></ProtectedRoute>} />
        <Route path="/clientes/cadastro" element={<ProtectedRoute><ClientesCadastro /></ProtectedRoute>} />
        <Route path="/clientes/atualizar/:id" element={<ProtectedRoute><ClientesAtualizar/></ProtectedRoute>} />
        <Route path="/conteineres" element={<ProtectedRoute><ConteineresHome /></ProtectedRoute>} />
        <Route path="/conteineres/cadastro" element={<ProtectedRoute><ConteineresCadastro /></ProtectedRoute>} />
        <Route path="/conteineres/atualizar/:id" element={<ProtectedRoute><ConteineresAtualizar/></ProtectedRoute>} />
        <Route path="/movimentacoes" element={<ProtectedRoute><MovimentacoesHome /></ProtectedRoute>} />
        <Route path="/movimentacoes/cadastro" element={<ProtectedRoute><MovimentacoesCadastro /></ProtectedRoute>} />
        <Route path="/movimentacoes/atualizar/:id" element={<ProtectedRoute><MovimentacoesAtualizar/></ProtectedRoute>} />
        <Route path="*" element={<Home />} />
    </Routes>
);
export default AppRoutes;