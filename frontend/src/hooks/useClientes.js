import { useState, useEffect } from 'react';
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_API_URL;

const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const data = await axios(baseURL + "/cliente/listar");
        setClientes(data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    carregarClientes();
  }, []);
  
  const navigate = useNavigate()
  
  const cadastrarCliente = async (novoCliente) => {
    setLoading(true);
    try {
      const response = await axios.post(baseURL + '/cliente/cadastrar', novoCliente);
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

  const atualizarCliente = async (id, clienteAtualizado) => {
    setLoading(true);
    try {
      const response = await axios.put(baseURL + `/cliente/atualizar/${id}`, clienteAtualizado);
      setClientes(clientes.map(cliente => cliente.id === id ? response.data : cliente));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deletarCliente = async (id) => {
    setLoading(true);
    try {
      await axios.delete(baseURL + `/cliente/remover/${id}`);
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