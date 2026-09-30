import { useRef, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
} from '@ionic/react';
import { cameraOutline, mailOutline, personOutline, schoolOutline, trashOutline } from 'ionicons/icons';
import PageHeader from '../components/PageHeader';
import PageTitle from '../components/PageTitle';
import { FOTO_PERFIL, PERFIL } from '../data/perfil';

/** Convierte el archivo elegido por la persona en una imagen base64 para poder mostrarla. */
const leerComoDataUrl = (archivo: File, alTerminar: (dataUrl: string) => void) => {
  const lector = new FileReader();
  lector.onload = () => alTerminar(String(lector.result));
  lector.readAsDataURL(archivo);
};

const Inicio: React.FC = () => {
  const [foto, setFoto] = useState<string | null>(FOTO_PERFIL);
  const selectorFoto = useRef<HTMLInputElement>(null);

  const elegirFoto = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = evento.target.files?.[0];
    if (archivo) {
      leerComoDataUrl(archivo, setFoto);
    }
  };

  return (
    <IonPage>
      <PageHeader titulo="Página Inicial" />

      <IonContent fullscreen>
        <div className="pagina">
          <PageTitle
            titulo="Mis datos personales"
            subtitulo="Información del estudiante responsable de esta tarea."
          />

          <div className="tarjeta">
            <div className="perfil-fila">
              <div className="marco-foto">
                {foto ? (
                  <img className="foto-perfil" src={foto} alt="Foto de 2 por 2 pulgadas" />
                ) : (
                  <div className="foto-vacia" onClick={() => selectorFoto.current?.click()}>
                    <IonIcon icon={cameraOutline} color="medium" />
                    <span>Tu foto 2x2</span>
                    <small>Espacio reservado</small>
                  </div>
                )}
              </div>

              <div className="perfil-datos">
                <IonList lines="full">
                  <IonItem>
                    <IonIcon slot="start" icon={personOutline} color="primary" />
                    <IonLabel>
                      <h3>Nombre</h3>
                      <p>{PERFIL.nombres}</p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonIcon slot="start" icon={personOutline} color="primary" />
                    <IonLabel>
                      <h3>Apellido</h3>
                      <p>{PERFIL.apellidos}</p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonIcon slot="start" icon={mailOutline} color="primary" />
                    <IonLabel>
                      <h3>Correo electrónico</h3>
                      <p>{PERFIL.correo}</p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonIcon slot="start" icon={schoolOutline} color="primary" />
                    <IonLabel>
                      <h3>Matrícula</h3>
                      <p>{PERFIL.matricula}</p>
                    </IonLabel>
                  </IonItem>
                </IonList>

                <IonNote className="perfil-nota">
                  La foto se muestra en un recuadro de 2 x 2 pulgadas. Haz clic en el recuadro para
                  subirla desde tu computadora o celular.
                </IonNote>
              </div>
            </div>

            <div className="perfil-acciones">
              <input
                ref={selectorFoto}
                type="file"
                accept="image/*"
                className="archivo-oculto"
                onChange={elegirFoto}
              />
              <IonButton onClick={() => selectorFoto.current?.click()}>
                <IonIcon slot="start" icon={cameraOutline} />
                Subir foto 2x2
              </IonButton>
              {foto && (
                <IonButton fill="clear" color="danger" onClick={() => setFoto(null)}>
                  <IonIcon slot="start" icon={trashOutline} />
                  Quitar foto
                </IonButton>
              )}
            </div>
          </div>

          <div className="tarjeta">
            <h2 className="subtitulo-seccion">Opciones del menú</h2>
            <IonList lines="full">
              {[
                'Sumadora: suma dos números y muestra el resultado.',
                'Traductor de números a letras: convierte un número del 1 al 1000 a letras en español.',
                'Tabla de multiplicar: muestra la tabla de un número hasta el 13.',
                'Experiencia personal: aquí se reproduce mi video explicando la tarea.',
              ].map((texto, indice) => (
                <IonItem key={texto}>
                  <div className="opcion-item">
                    <span className="pastilla">{indice + 1}</span>
                    <span>{texto}</span>
                  </div>
                </IonItem>
              ))}
            </IonList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Inicio;