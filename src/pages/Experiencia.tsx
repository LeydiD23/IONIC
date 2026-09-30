import { useRef, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
} from '@ionic/react';
import {
  cloudUploadOutline,
  logoYoutube,
  refreshOutline,
  trashOutline,
  videocamOutline,
  warningOutline,
} from 'ionicons/icons';
import PageHeader from '../components/PageHeader';
import PageTitle from '../components/PageTitle';
import { VIDEO_YOUTUBE } from '../data/video';

/** Duración máxima permitida para el video, en segundos. */
const DURACION_MAXIMA_SEGUNDOS = 5 * 60;

/**
 * Saca el identificador de un video de YouTube a partir de un enlace completo
 * o de un identificador escrito directamente.
 */
const extraerIdYoutube = (texto: string): string | null => {
  const limpio = texto.trim();

  if (/^[\w-]{11}$/.test(limpio)) {
    return limpio;
  }

  const patrones = [
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/watch\?[^#]*v=([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
  ];

  for (const patron of patrones) {
    const coincidencia = limpio.match(patron);
    if (coincidencia) {
      return coincidencia[1];
    }
  }

  return null;
};

/** Convierte los bytes del archivo a megabytes con dos decimales. */
const aMegas = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

const Experiencia: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [infoVideo, setInfoVideo] = useState<{ nombre: string; peso: string } | null>(null);
  const [duracion, setDuracion] = useState<number | null>(null);
  const [youtube, setYoutube] = useState(VIDEO_YOUTUBE);
  const [idYoutube, setIdYoutube] = useState<string | null>(extraerIdYoutube(VIDEO_YOUTUBE));
  const [errorYoutube, setErrorYoutube] = useState('');
  const selectorVideo = useRef<HTMLInputElement>(null);

  const cargarVideo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = evento.target.files?.[0];
    if (!archivo) {
      return;
    }

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setDuracion(null);
    setVideoUrl(URL.createObjectURL(archivo));
    setInfoVideo({ nombre: archivo.name, peso: `${aMegas(archivo.size)} MB` });
  };

  const quitarVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoUrl(null);
    setInfoVideo(null);
    setDuracion(null);
    if (selectorVideo.current) {
      selectorVideo.current.value = '';
    }
  };

  const cargarYoutube = () => {
    const id = extraerIdYoutube(youtube);
    if (!id) {
      setIdYoutube(null);
      setErrorYoutube('No parece un enlace válido de YouTube. Pega el enlace o el ID del video.');
      return;
    }
    setErrorYoutube('');
    setIdYoutube(id);
  };

  const duracionTexto =
    duracion === null ? '' : `${Math.floor(duracion / 60)} min ${Math.round(duracion % 60)} s`;

  const videoMuyLargo = duracion !== null && duracion > DURACION_MAXIMA_SEGUNDOS;

  return (
    <IonPage>
      <PageHeader titulo="Experiencia Personal" />

      <IonContent fullscreen>
        <div className="pagina">
          <PageTitle
            titulo="Experiencia personal"
            subtitulo="En esta pantalla se reproduce el video donde explico cómo realicé esta tarea."
          />

          <div className="tarjeta">
            <h2 className="subtitulo-seccion">
              <IonIcon icon={videocamOutline} color="primary" /> Mi video
            </h2>

            <input
              ref={selectorVideo}
              type="file"
              accept="video/*"
              className="archivo-oculto"
              onChange={cargarVideo}
            />

            {videoUrl ? (
              <>
                <div className="zona-video">
                  <video
                    className="reproductor"
                    src={videoUrl}
                    controls
                    playsInline
                    onLoadedMetadata={(evento) => setDuracion(evento.currentTarget.duration)}
                  />
                </div>

                <div className="datos-video">
                  <IonLabel>
                    <strong>{infoVideo?.nombre}</strong>
                    <IonNote>
                      Peso: {infoVideo?.peso}
                      {duracionTexto && ` · Duración: ${duracionTexto}`}
                    </IonNote>
                  </IonLabel>
                  <IonButton fill="clear" color="danger" onClick={quitarVideo}>
                    <IonIcon slot="start" icon={trashOutline} />
                    Quitar
                  </IonButton>
                </div>

                {videoMuyLargo && (
                  <div className="caja-error">
                    <IonIcon icon={warningOutline} color="danger" />
                    <IonLabel>
                      El video dura más de 5 minutos. La tarea pide un video de máximo 5 minutos.
                    </IonLabel>
                  </div>
                )}
              </>
            ) : (
              <div className="zona-subida" onClick={() => selectorVideo.current?.click()}>
                <IonIcon icon={cloudUploadOutline} color="primary" />
                <strong>Toca aquí para subir tu video</strong>
                <IonNote>Selecciona el archivo de video desde tu computadora o celular.</IonNote>
              </div>
            )}

            <IonButton expand="block" onClick={() => selectorVideo.current?.click()}>
              <IonIcon slot="start" icon={cloudUploadOutline} />
              {videoUrl ? 'Cambiar el video' : 'Subir mi video'}
            </IonButton>

            <IonNote className="nota-campo">
              El video se reproduce dentro de la app mientras esta sesión esté abierta. Si recargas
              la página, selecciónalo otra vez.
            </IonNote>
          </div>

          <div className="tarjeta">
            <h2 className="subtitulo-seccion">
              <IonIcon icon={logoYoutube} color="danger" /> Video en YouTube
            </h2>
            <IonItem>
              <IonInput
                label="Enlace o ID del video de YouTube"
                labelPlacement="stacked"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtube}
                onIonInput={(evento) => setYoutube(evento.detail.value?.toString() ?? '')}
              />
            </IonItem>

            <div className="botones">
              <IonButton expand="block" color="danger" onClick={cargarYoutube}>
                <IonIcon slot="start" icon={logoYoutube} />
                Ver en YouTube
              </IonButton>
              <IonButton
                expand="block"
                fill="outline"
                color="medium"
                onClick={() => {
                  setYoutube(VIDEO_YOUTUBE);
                  setIdYoutube(extraerIdYoutube(VIDEO_YOUTUBE));
                  setErrorYoutube('');
                }}
              >
                <IonIcon slot="start" icon={refreshOutline} />
                Restaurar enlace
              </IonButton>
            </div>

            {errorYoutube && (
              <div className="caja-error">
                <IonLabel>{errorYoutube}</IonLabel>
              </div>
            )}

            {idYoutube && (
              <div className="zona-video">
                <iframe
                  className="reproductor"
                  src={`https://www.youtube.com/embed/${idYoutube}`}
                  title="Video de experiencia personal"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <IonNote className="nota-campo">
              Este video se muestra al abrir la página. También puedes escribir otro enlace o
              identificador y presionar el botón para cambiarlo.
            </IonNote>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Experiencia;