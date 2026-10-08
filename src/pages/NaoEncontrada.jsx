import Azulejos from '../components/Azulejos.jsx';
import Botao from '../components/Botao.jsx';

export function meta() {
  return {
    titulo: 'Página não encontrada',
    descricao: 'O endereço acessado não existe ou mudou de lugar. Veja as páginas principais da clínica.',
    caminho: '/404/',
    indexar: false,
  };
}

export default function NaoEncontrada() {
  return (
    <div className="secao">
      <div className="conteiner nao-encontrada">
        <div className="nao-encontrada__painel" aria-hidden="true">
          <Azulejos colunas={4} linhas={4} semente={404} paleta="misto" vazio={9} />
        </div>
        <div className="nao-encontrada__texto">
          <h1>Página não encontrada</h1>
          <p className="secao__apoio">
            Como um azulejo fora do lugar: o endereço que você acessou não existe ou mudou. Que tal recomeçar
            por aqui?
          </p>
          <div className="grupo-botoes">
            <Botao para="/">Ir para o início</Botao>
            <Botao para="/tratamentos/" variante="contorno">
              Ver tratamentos
            </Botao>
            <Botao para="/contato/" variante="texto">
              Falar com a clínica
            </Botao>
          </div>
        </div>
      </div>
    </div>
  );
}
