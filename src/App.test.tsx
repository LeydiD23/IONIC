import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('se monta sin errores', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
  });

  it('muestra el menú lateral con las cinco opciones', () => {
    render(<App />);
    expect(screen.getAllByText('Página Inicial').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sumadora').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Traductor a Letras').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Tabla de Multiplicar').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Experiencia Personal').length).toBeGreaterThan(0);
  });
});