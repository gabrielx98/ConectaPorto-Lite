import React, { Component } from "react";
import Main from "../template/Main";

export default class Home extends Component {
    render() {
        return (
            <Main>
                <div className="card">
                    <div className="card-body">

                    <h3 className='m-3 card-title'>Bem vindo ao ConectaPorto Lite</h3>
                    
                    <h4>Gerencie Seus Contêineres com Eficiência</h4>
                    <p className='m-3 card-text'>No mundo dinâmico dos negócios, a gestão eficiente de contêineres é fundamental. O ConectaPorto Lite é a solução completa para gerenciar seus contêineres, clientes e movimentações com facilidade e precisão.</p>
                    
                    <h4 className='m-3 mb-4'>O Que Oferecemos:</h4>
                    <ul>
                        <li>Gerenciamento de Contêineres: Monitore a localização e o status de cada contêiner em tempo real, garantindo que você tenha sempre a informação que precisa na palma da sua mão.</li>
                        <li>Cadastro de Clientes: Mantenha um registro detalhado de todos os seus clientes. Gerencie informações de contato, histórico de movimentações e preferências de forma organizada.</li>
                        <li>Movimentações Simplificadas: Controle as movimentações de contêineres com um sistema intuitivo. Registre entradas e saídas rapidamente e acompanhe o fluxo de cada unidade.</li>
                        <li>Relatórios Personalizados: Gere relatórios detalhados sobre o desempenho e a utilização dos contêineres, ajudando você a tomar decisões informadas e estratégicas.</li>
                    </ul>
                    
                    <h4>Por Que Escolher ConectaPorto Lite?</h4>
                    <ul>
                        <li>Interface Intuitiva: Nossa plataforma é projetada para ser fácil de usar, permitindo que você e sua equipe naveguem com agilidade.</li>
                        <li>Segurança e Confiabilidade: Priorizamos a segurança dos seus dados com tecnologia de ponta, garantindo que suas informações estejam sempre protegidas.</li>
                        <li>Suporte Dedicado: Nossa equipe está sempre pronta para ajudar. Oferecemos suporte técnico ágil e eficiente para que você tenha a melhor experiência possível.</li>
                    </ul>

                    <h4>Comece Agora!</h4>
                    <p>Transforme a forma como você gerencia seus contêineres. Experimente o ConectaPorto Lite e descubra como podemos ajudar sua empresa a operar com mais eficiência e organização.</p>
                    <p>Entre em contato conosco ou crie sua conta agora mesmo para dar o primeiro passo em direção a uma gestão mais inteligente</p>
                    </div>
                </div>
            </Main>
        )
    }
}