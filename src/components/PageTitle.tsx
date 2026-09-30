interface PageTitleProps {
  titulo: string;
  subtitulo: string;
}

/** Título grande con su descripción, mostrado al inicio del contenido de cada página. */
const PageTitle: React.FC<PageTitleProps> = ({ titulo, subtitulo }) => (
  <div className="titulo-pagina">
    <h1>{titulo}</h1>
    <p>{subtitulo}</p>
  </div>
);

export default PageTitle;