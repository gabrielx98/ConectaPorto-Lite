import React from 'react';
import useClientes from '../hooks/useClientes';

const Provider = ({children}) => {
    const { clientes, loading, error, cadastrarCliente, atualizarCliente, deletarCliente } = useClientes();
    return (
        <React.Fragment>
            {children({ clientes, loading, error, cadastrarCliente, atualizarCliente, deletarCliente })}
        </React.Fragment>
    )
};

export default Provider;