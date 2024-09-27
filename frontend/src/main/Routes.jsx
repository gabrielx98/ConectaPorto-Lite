import React from "react";
import { Routes, Route} from "react-router-dom";

//import ConteinerCadastro from "../components/conteiner/Cadastro";
//import Dashboard from "../components/dashboard/Dashboard";
//import MovimentacaoCadastro from "../components/movimentacao/Cadastro";
//import Registros from "../components/registros/Registros";
import Home from "../components/home/Home";
//import ClienteCadastro from "../components/cliente/Cadastro";

export default props =>
    <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/conteiner/cadastro" element={ConteinerCadastro} />
        <Route path="/dashboard" element={Dashboard} />
        <Route path="/movimentacao/cadastro" element={MovimentacaoCadastro} />
        <Route path="/registros" element={Registros} />
        <Route path="/cliente/cadastro" element={ClienteCadastro} /> */}
        {/* <Route path="*" element={Home} /> */}
    </Routes>
    
