import React from 'react';
import useSecurity from '../hooks/useSecurity';

const Provider = ({children}) => {
    const { usuario, login, cadastrar, loading, error } = useSecurity();
    return (
        <React.Fragment>
            {children({ usuario, login, cadastrar, loading, error })}
        </React.Fragment>
    )
}

export default Provider;