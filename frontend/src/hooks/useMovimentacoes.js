import { useState, useEffect } from 'react';
import axios, { HttpStatusCode } from "axios";
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_API_URL;

const useMovimentacoes = () => {
  const [Movimentacoes, setMovimentacoes] = useState([]);
  const [Clientes, setClientes] = useState([]);
  const [Conteineres, setConteineres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const carregarMovimentacoes = async () => {
      try {
        var movimentacao;
        if(id !== undefined){
          movimentacao = (await axios(baseURL + `/Movimentacao/Buscar/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }));
        }else{
          movimentacao = await axios(baseURL + "/Movimentacao/Listar", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
        }
        const conteiner = await axios(baseURL + "/conteiner/listar", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const cliente = await axios(baseURL + "/cliente/listar", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
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
  }, [id]);

  const navigate = useNavigate()

  const cadastrarMovimentacao = async (novoMovimentacao) => {
    setLoading(true);
    try {
      const response = await axios.post(baseURL + '/Movimentacao/Cadastrar', novoMovimentacao, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
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

  const atualizarMovimentacao = async (MovimentacaoAtualizado) => {
    setLoading(true);
    try {
      const response = await axios.patch(baseURL + `/movimentacao/atualizar`, MovimentacaoAtualizado, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMovimentacoes(response.data);
      if(response.status === HttpStatusCode.Ok){
        setLoading(false);
        navigate('/movimentacoes')
        toast.success("Movimentação atualizada com sucesso.")
      }
    } catch (err) {
      setError(err);
      console.log(err);
      toast.error("Erro ao Registrar.");
    }
  };

  const deletarMovimentacao = async (id) => {
    setLoading(true);
    try {
      await axios.delete(baseURL + `/Movimentacao/Remover/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }});
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