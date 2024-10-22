import React from 'react';
import useConteineres from '../hooks/useConteineres';

const Provider = ({children}) => {
    const { Conteineres, Clientes, loading, error, cadastrarConteiner, atualizarConteiner, deletarConteiner } = useConteineres();
    return (
        <React.Fragment>
            {children({ Conteineres, Clientes, loading, error, cadastrarConteiner, atualizarConteiner, deletarConteiner })}
        </React.Fragment>
    )
};

export default Provider;