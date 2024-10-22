import { useState, useEffect } from 'react';
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_API_URL;

const useConteineres = () => {
  const [Conteineres, setConteineres] = useState([]);
  const [Clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarConteineres = async () => {
      try {
        const conteiner = await axios(baseURL + "/conteiner/listar");
        const cliente = await axios(baseURL + "/cliente/listar");
        setConteineres(conteiner.data);
        setClientes(cliente.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    carregarConteineres();
  }, []);

  const navigate = useNavigate()

  const cadastrarConteiner = async (novoConteiner) => {
    setLoading(true);
    try {
      const response = await axios.post(baseURL + '/conteiner/cadastrar', novoConteiner);
      
      setConteineres([...Conteineres, response.data]);
      
      if(response.status === HttpStatusCode.Created){
        setLoading(false);
        navigate('/conteineres')
        toast.success("Conteiner cadastrado com sucesso.")
      }
    } catch (err) {
      setError(err);
      toast.error("Erro ao Registrar.")
    }
  };

  const atualizarConteiner = async (id, ConteinerAtualizado) => {
    setLoading(true);
    try {
      const response = await axios.put(baseURL + `/conteiner/atualizar/${id}`, ConteinerAtualizado);
      setConteineres(Conteineres.map(Conteiner => Conteiner.id === id ? response.data : Conteiner));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deletarConteiner = async (id) => {
    setLoading(true);
    try {
      await axios.delete(baseURL + `/Conteiner/Remover/${id}`);
      setConteineres(Conteineres.filter(Conteiner => Conteiner.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { Conteineres, Clientes, loading, error, cadastrarConteiner, atualizarConteiner, deletarConteiner };
};

export default useConteineres;