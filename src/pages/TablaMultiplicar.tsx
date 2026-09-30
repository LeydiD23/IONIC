import { useState } from 'react';
import {
  IonChip,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
} from '@ionic/react';
import { gridOutline, refreshOutline } from 'ionicons/icons';
import PageHeader from '../components/PageHeader';
import PageTitle from '../components/PageTitle';

/** La tabla siempre llega hasta el número 13. */
const LIMITE = 13;

const TablaMultiplicar: React.FC = () => {
  const [numero, setNumero] = useState('');
  const [error, setError] = useState('');

  const esNumeroValido = numero.trim() !== '' && /^-?\d+$/.test(numero.trim());

  const valor = esNumeroValido ? Number(numero) : 0;
  const filas = Array.from({ length: LIMITE }, (_, indice) => {
    const multiplicador = indice + 1;
    return { multiplicador, producto: valor * multiplicador };
  });

  const escribirNumero = (texto: string) => {
    setNumero(texto);

    if (texto.trim() !== '' && !/^-?\d+$/.test(texto.trim())) {
      setError('Escribe solo números enteros, por ejemplo 7.');
    } else {
      setError('');
    }
  };

  return (
    <IonPage>
      <PageHeader titulo="Tabla de Multiplicar" />

      <IonContent fullscreen>
        <div className="pagina">
          <PageTitle
            titulo="Tabla de multiplicar"
            subtitulo={`Escribe un número y se mostrará su tabla de multiplicar hasta el ${LIMITE}.`}
          />

          <div className="tarjeta">
            <IonItem>
              <IonInput
                label="Número"
                labelPlacement="stacked"
                type="number"
                inputmode="numeric"
                placeholder="Ejemplo: 7"
                value={numero}
                onIonInput={(evento) => escribirNumero(evento.detail.value?.toString() ?? '')}
              />
            </IonItem>

            {error && (
              <div className="caja-error">
                <IonLabel>{error}</IonLabel>
              </div>
            )}

            <div className="chips">
              {[2, 3, 5, 7, 9, 12].map((sugerido) => (
                <IonChip key={sugerido} onClick={() => escribirNumero(String(sugerido))}>
                  {sugerido}
                </IonChip>
              ))}
              <IonChip color="medium" onClick={() => escribirNumero('')}>
                <IonIcon icon={refreshOutline} /> Limpiar
              </IonChip>
            </div>
          </div>

          {esNumeroValido && (
            <div className="tarjeta">
              <h2 className="subtitulo-seccion">
                <IonIcon icon={gridOutline} color="primary" /> Tabla del {valor}
              </h2>

              <div className="tabla-envoltura">
                <table className="tabla-multiplicar">
                  <thead>
                    <tr>
                      <th scope="col">Multiplicación</th>
                      <th scope="col">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filas.map((fila) => (
                      <tr key={fila.multiplicador}>
                        <td>
                          {valor} &times; {fila.multiplicador}
                        </td>
                        <td className="celda-producto">{fila.producto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <IonNote className="nota-campo">
                La tabla contiene {LIMITE} filas: desde {valor} &times; 1 hasta {valor} &times; {LIMITE}.
              </IonNote>
            </div>
          )}

          {!esNumeroValido && !error && (
            <div className="tarjeta vacia">
              <IonLabel>
                Escribe un número arriba para ver su tabla de multiplicar hasta el {LIMITE}.
              </IonLabel>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TablaMultiplicar;