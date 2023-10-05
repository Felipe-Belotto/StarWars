import styles from './PaginaFavoritos.module.css'
import { useContext, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Card from '../../components/Card/Card';
import { FavoritosContext } from '../../context/FavoritadosContext';


function PaginaFavoritos () {

  const { listaFavoritos, setListaFavoritos, adicionarVideo } = useContext(FavoritosContext)

  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const scrollX = useMotionValue(0);

  useEffect(() => {
    setVideos(listaFavoritos)
    console.log(videos)
  }, []);

  const ajustarOpacidade = (corHex, fatorPreto, opacidade) => {
    const cleanedHex = corHex.replace('#', '');
    const [r, g, b] = cleanedHex.match(/.{1,2}/g).map((value) => parseInt(value, 16));

    const novoR = Math.round(r * (1 - fatorPreto));
    const novoG = Math.round(g * (1 - fatorPreto));
    const novoB = Math.round(b * (1 - fatorPreto));
  
    return `rgba(${novoR}, ${novoG}, ${novoB}, ${opacidade})`;
  };
  
  useEffect(() => {
    fetch('https://6516db6809e3260018ca679b.mockapi.io/Categorias')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setCategorias(
          dados.map((categoria) => ({
            ...categoria,
            corDeFundo: ajustarOpacidade(categoria.cor,0.9 , 0.9),
          }))
        );
      });
  }, []);

  
  const handleDrag = (_, info) => {
    scrollX.set(info.offset.x);
  };

  return (
    <>
    <h1 className={styles.titulo}>Videos favoritos</h1>

    <section className={styles.sectionVideos}>
      {categorias.map((categoria) => (
        <motion.section
          key={categoria.id}
          className={styles.categoriaContainer}
          style={{ backgroundColor: categoria.corDeFundo }}
        >
          <div className={styles.categoria__info}>
            <h1 className={styles.categoria__nome}>{categoria.nome}</h1>
          </div>

          <motion.div
            onDrag={handleDrag}
            style={{
              width: '100%',
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              x: scrollX,
              /* background: 'rgba(0, 0, 0, 0.293)', */
            }}
          >
            {videos
              .filter((video) => video.categoria === categoria.nome)
              .map((video) => (
                <Card key={video.id} {...video} />
              ))}
          </motion.div>
        </motion.section>
      ))}
    </section>
    </>
  );
};

export default PaginaFavoritos;
