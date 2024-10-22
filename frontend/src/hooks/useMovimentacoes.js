import { useState, useEffect } from 'react';
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const useMovimentacoes = () => {
  const [Movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarMovimentacoes = async () => {
      try {
        const data = await axios(baseURL + "/Movimentacao/Listar");
        setMovimentacoes(data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    carregarMovimentacoes();
  }, []);

  const cadastrarMovimentacao = async (novoMovimentacao) => {
    setLoading(true);
    try {
      const response = await axios.post(baseURL + '/Movimentacao/Cadastrar', novoMovimentacao);
      setMovimentacoes([...Movimentacoes, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

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

  return { Movimentacoes, loading, error, cadastrarMovimentacao, atualizarMovimentacao, deletarMovimentacao };
};

export default useMovimentacoes;