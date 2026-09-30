import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';

interface PageHeaderProps {
  /** Título que se muestra en la barra superior. */
  titulo: string;
}

/** Barra superior común de todas las páginas, con el botón que abre el menú lateral. */
const PageHeader: React.FC<PageHeaderProps> = ({ titulo }) => (
  <IonHeader className="app-header">
    <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton autoHide={false} />
      </IonButtons>
      <IonTitle>{titulo}</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default PageHeader;