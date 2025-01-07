import { useState, useEffect } from 'react';
import axios, { HttpStatusCode } from "axios";
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_API_URL;

const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  
  
  useEffect(() => {
    const carregarClientes = async () => {
      try {
        var data;
        if(id !== undefined){
          data = await axios(baseURL + `/Cliente/Buscar/${id}`)
        }else{
          data = await axios(baseURL + "/Cliente/listar");
        }
        setClientes(data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    carregarClientes();
  }, [id]);
  
  const navigate = useNavigate()
  
  const cadastrarCliente = async (novoCliente) => {
    setLoading(true);
    try {
      const response = await axios.post(baseURL + '/Cliente/cadastrar', novoCliente);
      setClientes([...clientes, response.data]);
      
      if(response.status === HttpStatusCode.Created){
        setLoading(false);
        navigate('/clientes')
        toast.success("Cliente cadastrado com sucesso.")
      }

    } catch (err) {
      setError(err);
      toast.error("Erro ao Registrar.")
    }
  };

  const atualizarCliente = async (clienteAtualizado) => {
    setLoading(true);
    try {
      const response = await axios.patch(baseURL + `/Cliente/atualizar`, clienteAtualizado);
      setClientes(response.data);
      if(response.status === HttpStatusCode.Ok){
        setLoading(false);
        navigate('/clientes')
        toast.success("Cliente atualizado com sucesso.")
      }
      
    } catch (err) {
      setError(err);
      toast.error("Erro ao Registrar.");
    }
  };

  const deletarCliente = async (id) => {
    setLoading(true);
    try {
      await axios.delete(baseURL + `/Cliente/remover/${id}`);
      setClientes(clientes.filter(cliente => cliente.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { clientes, loading, error, cadastrarCliente, atualizarCliente, deletarCliente };
};

export default useClientes;