# App Menú Tareas

Aplicación móvil con menú lateral, desarrollada con **Ionic + React + TypeScript**. Contiene cinco secciones: página inicial con los datos del estudiante, sumadora, traductor de números a letras, tabla de multiplicar y una pantalla para mostrar un video de experiencia personal.

## Tecnologías

| Tecnología | Versión | Uso |
| --- | --- | --- |
| Ionic React | 9 | Componentes de interfaz y menú lateral |
| React | 19 | Interfaz |
| TypeScript | 5.9 | Tipado estricto |
| Vite | 8 | Servidor de desarrollo y compilación |
| Vitest | 4 | Pruebas unitarias |
| Capacitor | 8 | Empaquetado para Android/iOS |

## Puesta en marcha

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Scripts disponibles

```bash
npm run dev      # servidor de desarrollo
npm run build    # compila TypeScript y genera la app en dist/
npm run preview  # sirve la versión compilada
npm test         # pruebas unitarias
npm run lint     # análisis estático de código
```

## Secciones de la aplicación

| Sección | Ruta | Descripción |
| --- | --- | --- |
| Página Inicial | `/inicio` | Datos personales del estudiante y espacio para cargar la fotografía de 2×2 pulgadas |
| Sumadora | `/sumadora` | Suma dos números y muestra el resultado |
| Traductor a Letras | `/traductor` | Convierte un número del 1 al 1000 a letras en español |
| Tabla de Multiplicar | `/tabla` | Muestra la tabla de un número desde ×1 hasta ×13 |
| Experiencia Personal | `/experiencia` | Reproduce el video de experiencia (el de `src/data/video.ts`) y permite cargar uno propio o cambiar el enlace de YouTube |

## Algoritmo de conversión de números a letras

Implementado en `src/utils/numeroALetras.ts` sin ninguna librería de terceros ni llamadas a servicios externos.

- **0 a 29**: palabras escritas directamente en una tabla.
- **30 a 99**: decena unida con conjunción `y` más el resto (46 → `cuarenta y seis`).
- **100**: `cien`.
- **101 a 999**: centena más el resto (215 → `doscientos quince`).
- **1000**: `mil`.

La función `validarNumero` rechaza letras, decimales y valores fuera del rango 1 a 1000.

## Estructura del proyecto

```
src/
├── App.tsx                    Menú lateral y rutas
├── components/
│   ├── Menu.tsx               Ítems del menú
│   ├── PageHeader.tsx         Barra superior con el botón del menú
│   └── PageTitle.tsx          Encabezado de cada pantalla
├── data/
│   ├── perfil.ts              Datos del estudiante
│   └── video.ts               Enlace del video de experiencia personal
├── pages/
│   ├── Inicio.tsx
│   ├── Sumadora.tsx
│   ├── Traductor.tsx
│   ├── TablaMultiplicar.tsx
│   └── Experiencia.tsx
├── theme/
│   ├── variables.css          Paleta de colores
│   └── app.css                Estilos de la aplicación
└── utils/
    ├── numeroALetras.ts       Conversión de números a letras
    └── numeroALetras.test.ts  Pruebas del algoritmo
```

## Pruebas

```bash
npm test
```

Incluye 56 pruebas que verifican la conversión de números a letras, la validación de entradas y el montaje de la aplicación con su menú.

## Empaquetar para Android

```bash
npm run build
npx cap add android
npx cap sync
npx cap open android
```