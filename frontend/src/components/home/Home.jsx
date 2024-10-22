import React, { Component } from "react";
import Main from "../template/Main";

export default class Home extends Component {
    render() {
        return (
            <Main>

                <div>
                    <div className="card text-start mb-3 p-3">
                        <h4>Gerencie Seus Contêineres com Eficiência</h4>
                        <p className='m-3 card-text'>No mundo dinâmico dos negócios, a gestão eficiente de contêineres é fundamental. O ConectaPorto Lite é a solução completa para gerenciar seus contêineres, clientes e movimentações com facilidade e precisão.</p>
                    </div>
                    <div className="card mb-3 p-3 pt-0">
                        <h4 className="p-3">O Que Oferecemos:</h4>
                        <div className="row row-cols-4">
                            <div className="col">
                                <div className="card border-primary h-100">
                                    <h6 className="card-title card-header bg-default">Gerenciamento de Contêineres</h6>
                                    <p className="card-text card-body">Monitore a localização e o status de cada contêiner em tempo real, garantindo que você tenha sempre a informação que precisa na palma da sua mão.</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card border-primary h-100">
                                    <h6 className="card-title card-header bg-default">Cadastro de Clientes</h6>
                                    <p className="card-text card-body">Mantenha um registro detalhado de todos os seus clientes. Gerencie informações de contato, histórico de movimentações e preferências de forma organizada.</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card border-primary h-100">
                                    <h6 className="card-title card-header bg-default">Movimentações Simplificadas</h6>
                                    <p className="card-text card-body">Controle as movimentações de contêineres com um sistema intuitivo. Registre entradas e saídas rapidamente e acompanhe o fluxo de cada unidade.</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card border-primary h-100">
                                    <h6 className="card-title card-header bg-default">Relatórios Personalizados</h6>
                                    <p className="card-text card-body">Gere relatórios detalhados sobre o desempenho e a utilização dos contêineres, ajudando você a tomar decisões informadas e estratégicas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3 p-3 text-start">
                        <h4 className="ps-2 text-center">Por Que Escolher ConectaPorto Lite?</h4>
                        <hr className="mt-1"/>
                        <div className="row text-center justify-content-center">
                            <div className="col-3">
                                <div className="list-group" id="list-tab" role="tablist">
                                    <a className="list-group-item list-group-item-action border-primary active" id="list-interface-list" data-bs-toggle="list" href="#list-interface" role="tab" aria-controls="list-interface">Interface Intuitiva</a>
                                    <a className="list-group-item list-group-item-action border-primary" id="list-securit-list" data-bs-toggle="list" href="#list-securit" role="tab" aria-controls="list-securit">Segurança e Confiabilidade</a>
                                    <a className="list-group-item list-group-item-action border-primary" id="list-suporte-list" data-bs-toggle="list" href="#list-suporte" role="tab" aria-controls="list-suporte">Suporte Dedicado</a>
                                </div>
                            </div>
                            <div className="col-8 card bg-default text-center justify-content-center">
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade active show" id="list-interface" role="tabpanel" aria-labelledby="list-interface-list">Nossa plataforma é projetada para ser fácil de usar, permitindo que você e sua equipe naveguem com agilidade.</div>
                                    <div className="tab-pane fade" id="list-securit" role="tabpanel" aria-labelledby="list-securit-list">Priorizamos a segurança dos seus dados com tecnologia de ponta, garantindo que suas informações estejam sempre protegidas.</div>
                                    <div className="tab-pane fade" id="list-suporte" role="tabpanel" aria-labelledby="list-suporte-list">Nossa equipe está sempre pronta para ajudar. Oferecemos suporte técnico ágil e eficiente para que você tenha a melhor experiência possível.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3 p-3 text-start">
                        <h4>Comece Agora!</h4>
                        <p><strong>Transforme a forma como você gerencia seus contêineres.</strong> Experimente o ConectaPorto Lite e descubra como podemos ajudar sua empresa a operar com mais eficiência e organização. <br /> Entre em contato conosco ou crie sua conta agora mesmo para dar o primeiro passo em direção a uma gestão mais inteligente.</p>

                    </div>
                </div>
            </Main>
        )
    }
}