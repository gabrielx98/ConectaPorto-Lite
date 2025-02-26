import { useState, useEffect } from 'react';
import axios, { HttpStatusCode } from "axios";
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_API_URL;

const useConteineres = () => {
  const [Conteineres, setConteineres] = useState([]);
  const [Clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const carregarConteineres = async () => {
      var conteiner;
      try {
        if(id !== undefined){
          conteiner = await axios(baseURL + `/Conteiner/Buscar/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
        }else{
          conteiner = await axios(baseURL + "/conteiner/listar",{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
        }
        const cliente = await axios(baseURL + "/cliente/listar",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }});
        setConteineres(conteiner.data);
        setClientes(cliente.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    carregarConteineres();
  }, [id]);

  const navigate = useNavigate()

  const cadastrarConteiner = async (novoConteiner) => {
    setLoading(true);
    try {
      const response = await axios.post(baseURL + '/conteiner/cadastrar', novoConteiner,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }});
      
      setConteineres([...Conteineres, response.data]);
      
      if(response.status === HttpStatusCode.Created){
        setLoading(false);
        navigate('/conteineres')
        toast.success("Conteiner cadastrado com sucesso.")
      }
    } catch (err) {
      setError(err);
      toast.error(err.response.data.message)
    }
  };

  const atualizarConteiner = async (ConteinerAtualizado) => {
    setLoading(true);
    try {
      const response = await axios.patch(baseURL + `/conteiner/atualizar`, ConteinerAtualizado,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }});
      setConteineres(response.data);
      if(response.status === HttpStatusCode.Ok){
        setLoading(false);
        navigate('/conteineres')
        toast.success("Conteiner atualizado com sucesso.")
      }
    } catch (err) {
      setError(err);
      toast.error("Erro ao Registrar.");
    }
  };

  const deletarConteiner = async (id) => {
    setLoading(true);
    try {
      await axios.delete(baseURL + `/Conteiner/Remover/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }});
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