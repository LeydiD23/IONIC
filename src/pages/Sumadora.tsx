import { useState } from 'react';
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
import { addOutline, calculatorOutline, refreshOutline } from 'ionicons/icons';
import PageHeader from '../components/PageHeader';
import PageTitle from '../components/PageTitle';

const Sumadora: React.FC = () => {
  const [primerNumero, setPrimerNumero] = useState('');
  const [segundoNumero, setSegundoNumero] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);
  const [error, setError] = useState('');

  const sumar = () => {
    if (primerNumero.trim() === '' || segundoNumero.trim() === '') {
      setResultado(null);
      setError('Escribe los dos números para poder sumarlos.');
      return;
    }

    const a = Number(primerNumero);
    const b = Number(segundoNumero);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      setResultado(null);
      setError('Los valores escritos no son números válidos.');
      return;
    }

    setError('');
    setResultado(a + b);
  };

  const limpiar = () => {
    setPrimerNumero('');
    setSegundoNumero('');
    setResultado(null);
    setError('');
  };

  return (
    <IonPage>
      <PageHeader titulo="Sumadora" />

      <IonContent fullscreen>
        <div className="pagina">
          <PageTitle
            titulo="Sumadora"
            subtitulo="Escribe dos números y obtén su suma al instante."
          />

          <div className="tarjeta">
            <IonItem>
              <IonInput
                label="Primer número"
                labelPlacement="stacked"
                type="number"
                inputmode="numeric"
                placeholder="Ejemplo: 25"
                value={primerNumero}
                onIonInput={(evento) =>
                  setPrimerNumero(evento.detail.value?.toString() ?? '')
                }
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Segundo número"
                labelPlacement="stacked"
                type="number"
                inputmode="numeric"
                placeholder="Ejemplo: 18"
                value={segundoNumero}
                onIonInput={(evento) =>
                  setSegundoNumero(evento.detail.value?.toString() ?? '')
                }
              />
            </IonItem>

            <IonNote className="nota-campo">
              También se pueden escribir números negativos, por ejemplo -5.
            </IonNote>

            <div className="botones">
              <IonButton expand="block" onClick={sumar}>
                <IonIcon slot="start" icon={addOutline} />
                Sumar
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

            {resultado !== null && (
              <div className="caja-resultado">
                <span className="resultado-titulo">
                  <IonIcon icon={calculatorOutline} color="primary" /> Resultado
                </span>
                <span className="resultado-numero">{resultado}</span>
                <span className="resultado-texto">
                  {primerNumero} + {segundoNumero} = {resultado}
                </span>
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Sumadora;