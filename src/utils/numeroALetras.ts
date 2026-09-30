/**
 * Conversión de números a letras en español (rango 1 a 1000).
 *
 * Algoritmo propio: no se utiliza ninguna API ni librería de terceros.
 */

/** Palabras de los números del 0 al 29 (incluye los 16-29 con acento correcto). */
const MENOR_30 = [
  'cero',
  'uno',
  'dos',
  'tres',
  'cuatro',
  'cinco',
  'seis',
  'siete',
  'ocho',
  'nueve',
  'diez',
  'once',
  'doce',
  'trece',
  'catorce',
  'quince',
  'dieciséis',
  'diecisiete',
  'dieciocho',
  'diecinueve',
  'veinte',
  'veintiuno',
  'veintidós',
  'veintitrés',
  'veinticuatro',
  'veinticinco',
  'veintiséis',
  'veintisiete',
  'veintiocho',
  'veintinueve',
];

/** Decenas exactas. El índice es el número dividido entre 10. */
const DECENAS = [
  '',
  '',
  'veinte',
  'treinta',
  'cuarenta',
  'cincuenta',
  'sesenta',
  'setenta',
  'ochenta',
  'noventa',
];

/** Centenas exactas. El índice es el número dividido entre 100. */
const CENTENAS = [
  '',
  'ciento',
  'doscientos',
  'trescientos',
  'cuatrocientos',
  'quinientos',
  'seiscientos',
  'setecientos',
  'ochocientos',
  'novecientos',
];

/** Número mínimo aceptado por el traductor. */
export const NUMERO_MINIMO = 1;

/** Número máximo aceptado por el traductor. */
export const NUMERO_MAXIMO = 1000;

/**
 * Convierte un número entero entre 0 y 1000 a palabras en español.
 * Ejemplos: 21 -> "veintiuno", 100 -> "cien", 215 -> "doscientos quince".
 *
 * @param numero Número entero a convertir.
 * @returns El número escrito en letras.
 * @throws Error si el número no es entero o está fuera del rango 0-1000.
 */
export function numeroALetras(numero: number): string {
  if (!Number.isInteger(numero)) {
    throw new Error('El número debe ser un número entero (sin decimales).');
  }

  if (numero < 0 || numero > NUMERO_MAXIMO) {
    throw new Error('El número debe estar entre 0 y 1000.');
  }

  if (numero < 30) {
    return MENOR_30[numero];
  }

  if (numero === 1000) {
    return 'mil';
  }

  if (numero < 100) {
    const decena = Math.floor(numero / 10);
    const resto = numero % 10;
    return resto === 0 ? DECENAS[decena] : `${DECENAS[decena]} y ${MENOR_30[resto]}`;
  }

  const centena = Math.floor(numero / 100);
  const resto = numero % 100;

  if (centena === 1 && resto === 0) {
    return 'cien';
  }

  const palabraCentena = centena === 1 ? 'ciento' : CENTENAS[centena];

  if (resto === 0) {
    return palabraCentena;
  }

  const palabraResto =
    resto < 30
      ? MENOR_30[resto]
      : resto % 10 === 0
        ? DECENAS[Math.floor(resto / 10)]
        : `${DECENAS[Math.floor(resto / 10)]} y ${MENOR_30[resto % 10]}`;

  return `${palabraCentena} ${palabraResto}`;
}

export interface ResultadoValidacion {
  /** Indica si el texto escrito es un número válido para traducir. */
  valido: boolean;
  /** El número convertido, disponible cuando `valido` es true. */
  valor: number;
  /** Mensaje de error, disponible cuando `valido` es false. */
  error: string;
}

/**
 * Valida y convierte el texto escrito por la persona en la pantalla.
 * Acepta espacios al inicio o al final, pero no decimales ni letras.
 *
 * @param texto Texto digitado en el campo de entrada.
 * @returns Objeto con el estado de la validación, el valor y el mensaje de error.
 */
export function validarNumero(texto: string): ResultadoValidacion {
  const limpio = texto.trim();

  if (limpio === '') {
    return { valido: false, valor: NaN, error: 'Escribe un número del 1 al 1000.' };
  }

  if (!/^-?\d+$/.test(limpio)) {
    return {
      valido: false,
      valor: NaN,
      error: 'Solo se permiten números enteros, sin letras ni decimales.',
    };
  }

  const valor = Number(limpio);

  if (valor < NUMERO_MINIMO || valor > NUMERO_MAXIMO) {
    return {
      valido: false,
      valor,
      error: `El número ${valor} está fuera del rango. Ingresa un valor entre ${NUMERO_MINIMO} y ${NUMERO_MAXIMO}.`,
    };
  }

  return { valido: true, valor, error: '' };
}

/**
 * Pone la primera letra en mayúscula, útil para mostrar el resultado
 * como una oración completa.
 *
 * @param texto Texto a capitalizar.
 * @returns El texto con la primera letra en mayúscula.
 */
export function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/**
 * Cuenta cuántas palabras tiene el resultado de la conversión.
 *
 * @param texto Texto ya convertido a letras.
 * @returns Cantidad de palabras.
 */
export function contarPalabras(texto: string): number {
  return texto.trim().split(/\s+/).filter(Boolean).length;
}