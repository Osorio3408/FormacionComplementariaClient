# Aplicación de Registro y Administración de Usuarios - Cliente

Este es el cliente de la aplicación web que permite el registro y administración de usuarios. Los usuarios pueden registrarse, iniciar sesión, crear cuentas de empleados desde archivos Excel, y solicitar cursos de formación complementaria. La aplicación está construida utilizando tecnologías como React, React Router y Tailwind CSS.

## Características

- Interfaz de usuario intuitiva para el registro, inicio de sesión y administración de usuarios.
- Integración con el backend para el registro, autenticación y administración de usuarios.
- Formulario para cargar archivos Excel y crear cuentas de empleados.
- Interfaz para solicitar cursos de formación complementaria.

## Tecnologías Utilizadas

- React: Biblioteca JavaScript para la construcción de interfaces de usuario.
- React Router: Manejo de rutas y navegación en la aplicación.
- Tailwind CSS: Framework CSS para diseño rápido y responsive.

## Instalación y Uso

1. Clona este repositorio en tu máquina local.
2. Navega al directorio del proyecto (`client`).
3. Instala las dependencias utilizando el comando `npm install`.
4. Configura la URL del backend en el archivo `src/pages/SignUp`, `src/pages/SignIn`, `src/pages/Upload` `src/components/FormCreateEmployee`, `src/components/FormCreateManager`.
5. Inicia la aplicación con el comando `npm start`.

## Estructura del Directorio

La estructura de directorios del cliente se organiza de la siguiente manera:

- `public/`: Contiene archivos públicos accesibles desde el navegador.
- `src/`: Contiene el código fuente de la aplicación.
  - `components/`: Componentes reutilizables de la interfaz.
  - `pages/`: Componentes de páginas de la aplicación.
  - `Context/`: Contiene archivos relacionados con la implementación del contexto de la aplicación.
  - `styles/`: Archivos de estilos globales y configuración de Tailwind CSS.

## Autor

Yuliam Osorio - yuliamwow@gmail.com

## Enlaces

- [Enlace al Repositorio del Servidor](https://github.com/Osorio3408/FormacionComplementaria)
- [Enlace a la Aplicación en Vivo](https://formacion-complementaria.netlify.app/)
