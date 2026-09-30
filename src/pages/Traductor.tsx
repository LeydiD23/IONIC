import { useState } from 'react';
import {
  IonButton,
  IonChip,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
} from '@ionic/react';
import { bookOutline, refreshOutline, sparklesOutline } from 'ionicons/icons';
import PageHeader from '../components/PageHeader';
import PageTitle from '../components/PageTitle';
import {
  capitalizar,
  contarPalabras,
  numeroALetras,
  NUMERO_MAXIMO,
  NUMERO_MINIMO,
  validarNumero,
} from '../utils/numeroALetras';

const EJEMPLOS = [7, 16, 21, 45, 100, 215, 500, 999, 1000];

const Traductor: React.FC = () => {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState<{ numero: number; letras: string } | null>(null);
  const [error, setError] = useState('');

  const traducir = (valor: string) => {
    const validacion = validarNumero(valor);

    if (!validacion.valido) {
      setResultado(null);
      setError(validacion.error);
      return;
    }

    setError('');
    setResultado({ numero: validacion.valor, letras: numeroALetras(validacion.valor) });
  };

  const limpiar = () => {
    setTexto('');
    setResultado(null);
    setError('');
  };

  return (
    <IonPage>
      <PageHeader titulo="Traductor a Letras" />

      <IonContent fullscreen>
        <div className="pagina">
          <PageTitle
            titulo="Traductor de números a letras"
            subtitulo={`Ingresa un número del ${NUMERO_MINIMO} al ${NUMERO_MAXIMO} y se mostrará escrito en español. La conversión se hace con un algoritmo propio, sin usar APIs.`}
          />

          <div className="tarjeta">
            <IonItem>
              <IonInput
                label="Número"
                labelPlacement="stacked"
                type="number"
                inputmode="numeric"
                placeholder="Ejemplo: 215"
                min={NUMERO_MINIMO}
                max={NUMERO_MAXIMO}
                value={texto}
                onIonInput={(evento) => setTexto(evento.detail.value?.toString() ?? '')}
              />
            </IonItem>

            <div className="botones">
              <IonButton expand="block" onClick={() => traducir(texto)}>
                <IonIcon slot="start" icon={bookOutline} />
                Traducir a letras
              </IonButton>
              <IonButton expand="block" fill="outline" color="medium" onClick={limpiar}>
                <IonIcon slot="start" icon={refreshOutline} />
                Limpiar
              </IonButton>
            </div>

            {error && (
              <div className="caja-error">
                <IonLabel>{error}</IonLabel>
              </div>
            )}

            {resultado && (
              <div className="caja-resultado">
                <span className="resultado-titulo">
                  <IonIcon icon={sparklesOutline} color="primary" /> En letras dice
                </span>
                <span className="resultado-texto grande">{capitalizar(resultado.letras)}</span>
                <span className="resultado-detalle">
                  {resultado.numero} = &ldquo;{resultado.letras}&rdquo; &middot;{' '}
                  {contarPalabras(resultado.letras)}{' '}
                  {contarPalabras(resultado.letras) === 1 ? 'palabra' : 'palabras'}
                </span>
              </div>
            )}
          </div>

          <div className="tarjeta">
            <h2 className="subtitulo-seccion">Ejemplos rápidos</h2>
            <div className="chips">
              {EJEMPLOS.map((ejemplo) => (
                <IonChip
                  key={ejemplo}
                  onClick={() => {
                    setTexto(String(ejemplo));
                    traducir(String(ejemplo));
                  }}
                >
                  {ejemplo} &rarr; {numeroALetras(ejemplo)}
                </IonChip>
              ))}
            </div>
            <IonNote className="nota-campo">
              Reglas usadas: 100 es &ldquo;cien&rdquo;, de 101 a 199 es &ldquo;ciento&rdquo;, 21 es
              &ldquo;veintiuno&rdquo; (sin tilde) y 1000 es &ldquo;mil&rdquo;.
            </IonNote>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Traductor;