import {
  capitalizar,
  contarPalabras,
  numeroALetras,
  validarNumero,
} from './numeroALetras';

const CASOS: Array<[number, string]> = [
  [1, 'uno'],
  [5, 'cinco'],
  [10, 'diez'],
  [15, 'quince'],
  [16, 'dieciséis'],
  [17, 'diecisiete'],
  [19, 'diecinueve'],
  [20, 'veinte'],
  [21, 'veintiuno'],
  [22, 'veintidós'],
  [23, 'veintitrés'],
  [26, 'veintiséis'],
  [29, 'veintinueve'],
  [30, 'treinta'],
  [31, 'treinta y uno'],
  [40, 'cuarenta'],
  [45, 'cuarenta y cinco'],
  [50, 'cincuenta'],
  [55, 'cincuenta y cinco'],
  [60, 'sesenta'],
  [70, 'setenta'],
  [80, 'ochenta'],
  [90, 'noventa'],
  [99, 'noventa y nueve'],
  [100, 'cien'],
  [101, 'ciento uno'],
  [110, 'ciento diez'],
  [115, 'ciento quince'],
  [125, 'ciento veinticinco'],
  [199, 'ciento noventa y nueve'],
  [200, 'doscientos'],
  [201, 'doscientos uno'],
  [215, 'doscientos quince'],
  [300, 'trescientos'],
  [400, 'cuatrocientos'],
  [500, 'quinientos'],
  [600, 'seiscientos'],
  [700, 'setecientos'],
  [800, 'ochocientos'],
  [900, 'novecientos'],
  [999, 'novecientos noventa y nueve'],
  [1000, 'mil'],
];

describe('numeroALetras', () => {
  it.each(CASOS)('convierte %i en "%s"', (numero, esperado) => {
    expect(numeroALetras(numero)).toBe(esperado);
  });

  it('devuelve cero para el número 0', () => {
    expect(numeroALetras(0)).toBe('cero');
  });

  it('falla con números decimales', () => {
    expect(() => numeroALetras(12.5)).toThrow();
  });

  it('falla con números mayores a 1000', () => {
    expect(() => numeroALetras(1001)).toThrow();
  });
});

describe('validarNumero', () => {
  it('acepta un número dentro del rango', () => {
    expect(validarNumero('215')).toEqual({ valido: true, valor: 215, error: '' });
  });

  it('acepta espacios al rededor', () => {
    expect(validarNumero(' 42 ').valido).toBe(true);
  });

  it('rechaza el vacío', () => {
    expect(validarNumero('   ').valido).toBe(false);
  });

  it('rechaza letras', () => {
    expect(validarNumero('abc').valido).toBe(false);
  });

  it('rechaza decimales', () => {
    expect(validarNumero('12.5').valido).toBe(false);
  });

  it('rechaza el cero', () => {
    expect(validarNumero('0').valido).toBe(false);
  });

  it('rechaza los mayores a 1000', () => {
    expect(validarNumero('1001').valido).toBe(false);
  });
});

describe('capitalizar y contarPalabras', () => {
  it('pone la primera letra en mayúscula', () => {
    expect(capitalizar('ciento uno')).toBe('Ciento uno');
  });

  it('cuenta las palabras del resultado', () => {
    expect(contarPalabras('veintiuno')).toBe(1);
    expect(contarPalabras('doscientos quince')).toBe(2);
    expect(contarPalabras('novecientos noventa y nueve')).toBe(4);
  });
});