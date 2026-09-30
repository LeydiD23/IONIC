import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { bookOutline, calculatorOutline, gridOutline, homeOutline, videocamOutline } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { PERFIL } from '../data/perfil';

interface Seccion {
  titulo: string;
  ruta: string;
  icono: string;
  descripcion: string;
}

const SECCIONES: Seccion[] = [
  {
    titulo: 'Página Inicial',
    ruta: '/inicio',
    icono: homeOutline,
    descripcion: 'Mis datos personales',
  },
  {
    titulo: 'Sumadora',
    ruta: '/sumadora',
    icono: calculatorOutline,
    descripcion: 'Sumar dos números',
  },
  {
    titulo: 'Traductor a Letras',
    ruta: '/traductor',
    icono: bookOutline,
    descripcion: 'Del 1 al 1000',
  },
  {
    titulo: 'Tabla de Multiplicar',
    ruta: '/tabla',
    icono: gridOutline,
    descripcion: 'Multiplicar hasta el 13',
  },
  {
    titulo: 'Experiencia Personal',
    ruta: '/experiencia',
    icono: videocamOutline,
    descripcion: 'Mi video de presentación',
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="app-contenido" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>App Menú Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines="none">
          {SECCIONES.map((seccion) => {
            const activa = location.pathname === seccion.ruta;
            return (
              <IonItem
                key={seccion.ruta}
                routerLink={seccion.ruta}
                routerDirection="root"
                detail={false}
                className={activa ? 'menu-item-activo' : ''}
              >
                <IonIcon slot="start" icon={seccion.icono} color={activa ? 'primary' : 'medium'} />
                <IonLabel>
                  <h3>{seccion.titulo}</h3>
                  <IonNote>{seccion.descripcion}</IonNote>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>

        <div className="menu-pie">
          <p className="menu-pie-nombre">{PERFIL.nombreCompleto}</p>
          <p className="menu-pie-dato">Matrícula: {PERFIL.matricula}</p>
          <p className="menu-pie-dato">{PERFIL.correo}</p>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;