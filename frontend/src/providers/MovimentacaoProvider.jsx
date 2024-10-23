import React from 'react';
import useMovimentacoes from '../hooks/useMovimentacoes';

const Provider = ({children}) => {
    const { Movimentacoes, Conteineres, Clientes, loading, error, cadastrarMovimentacao, atualizarMovimentacao, deletarMovimentacao } = useMovimentacoes();
    return (
        <React.Fragment>
            {children({ Movimentacoes, Conteineres, Clientes, loading, error, cadastrarMovimentacao, atualizarMovimentacao, deletarMovimentacao })}
        </React.Fragment>
    )
};

export default Provider;