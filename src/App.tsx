import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Menu from './components/Menu';
import Inicio from './pages/Inicio';
import Sumadora from './pages/Sumadora';
import Traductor from './pages/Traductor';
import TablaMultiplicar from './pages/TablaMultiplicar';
import Experiencia from './pages/Experiencia';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Tema de la aplicación: solo se usa la paleta clara, por eso no se importa
   ninguna paleta oscura de Ionic. */
import './theme/variables.css';
import './theme/app.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="app-contenido" when="md">
        <Menu />
        <IonRouterOutlet id="app-contenido">
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/sumadora" element={<Sumadora />} />
          <Route path="/traductor" element={<Traductor />} />
          <Route path="/tabla" element={<TablaMultiplicar />} />
          <Route path="/experiencia" element={<Experiencia />} />
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;