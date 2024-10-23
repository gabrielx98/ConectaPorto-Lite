import { useState, useEffect } from 'react';
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_API_URL;

const useMovimentacoes = () => {
  const [Movimentacoes, setMovimentacoes] = useState([]);
  const [Clientes, setClientes] = useState([]);
  const [Conteineres, setConteineres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarMovimentacoes = async () => {
      try {
        const movimentacao = await axios(baseURL + "/Movimentacao/Listar");
        const conteiner = await axios(baseURL + "/conteiner/listar");
        const cliente = await axios(baseURL + "/cliente/listar");
        setMovimentacoes(movimentacao.data);
        setClientes(cliente.data);
        setConteineres(conteiner.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    carregarMovimentacoes();
  }, []);

  const navigate = useNavigate()

  const cadastrarMovimentacao = async (novoMovimentacao) => {
    setLoading(true);
    try {
      const response = await axios.post(baseURL + '/Movimentacao/Cadastrar', novoMovimentacao);
      setMovimentacoes([...Movimentacoes, response.data]);

      if(response.status === HttpStatusCode.Created){
        setLoading(false);
        navigate('/movimentacoes')
        toast.success("Movimentação cadastrada com sucesso.")
      }
    } catch (err) {
      setError(err);
      toast.error("Erro ao Registrar.")
    }
    }

  const atualizarMovimentacao = async (id, MovimentacaoAtualizado) => {
    setLoading(true);
    try {
      const response = await axios.put(baseURL + `/Movimentacao/Atualizar/${id}`, MovimentacaoAtualizado);
      setMovimentacoes(Movimentacoes.map(Movimentacao => Movimentacao.id === id ? response.data : Movimentacao));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deletarMovimentacao = async (id) => {
    setLoading(true);
    try {
      await axios.delete(baseURL + `/Movimentacao/Remover/${id}`);
      setMovimentacoes(Movimentacoes.filter(Movimentacao => Movimentacao.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { Movimentacoes, Conteineres, Clientes, loading, error, cadastrarMovimentacao, atualizarMovimentacao, deletarMovimentacao };
};

export default useMovimentacoes;