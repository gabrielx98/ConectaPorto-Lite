import { useState, useEffect } from 'react';
import axios, { HttpStatusCode } from "axios";
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_API_URL;

const useSecurity = () => {
    const [usuario, setUsuario] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const carregarUsuario = async () => {
            try {
                var data;
                if (id !== undefined) {
                    data = await axios(baseURL + `/usuario/buscar/${id}`)
                } else {
                    data = await axios(baseURL + "/usuario/listar");
                }
                setUsuario(data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        carregarUsuario();
    }, [id]); 
    
    const navigate = useNavigate()

    const login = async (usuario) => {
        setLoading(true);
        try {
            const response = await axios.post(baseURL + '/usuario/autenticar', usuario);
            if(response.status === HttpStatusCode.Created && response.data.access_token){
                setLoading(false);
                localStorage.setItem('token', response.data.access_token);
                navigate('/')
                toast.success("Login efetuado com sucesso.")
            }else{
                toast.error(response.data.message)
            }
        } catch (err) {
            setError(err);
            toast.error(err.response.data.message)
        }
    };

    const cadastrar = async (novoUsuario) => {
        const usuario = { "email": novoUsuario.email, "senha": novoUsuario.senha};
        setLoading(true);
        try {
            const response = await axios.post(baseURL + '/usuario/cadastrar', usuario);
            if(response.status === HttpStatusCode.Created){
                setLoading(false);
                navigate('/login')
                toast.success("Usuário cadastrado com sucesso.")
            }
        } catch (err) {
            setError(err);
            toast.error(err.response.data.message)
        }
    }

    return { usuario, login, cadastrar, loading, error }
};

export default useSecurity;