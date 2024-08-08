# Movie Library API

Este repositorio contiene una API de biblioteca de películas construida en ASP.NET Core. La API permite a los usuarios buscar y comentar sobre películas. Si una película no se encuentra en la base de datos interna, se buscará a través de un servicio externo.

## Características

- **EF Code First + Migrations**: La base de datos se crea y se gestiona utilizando Entity Framework Code First. Las migraciones se utilizan para mantener la base de datos actualizada con los cambios en los modelos.
- **StyleCop Rules**: Se aplican reglas de StyleCop para asegurar un código limpio y consistente.
- **Lazy Loading, Eager Loading y Explicit Loading**: Se utilizan diferentes estrategias de carga para optimizar el acceso a los datos.
- **ASP.NET Identity**: Gestión de usuarios y autenticación integrada.
- **Arquitectura de Capas**: El proyecto está organizado en una arquitectura de cuatro capas para mejorar la mantenibilidad y la escalabilidad.
- **Inyección de Dependencias**: Uso de la inyección de dependencias para manejar las dependencias entre las diferentes capas del proyecto.
- **Tokens JWT y Refresh Tokens**: Implementación de autenticación basada en tokens JWT y manejo de refresh tokens para una autenticación segura y eficiente.

## Estructura del Proyecto

El proyecto está dividido en las siguientes capas:

- **Business Logic Layer (BLL)**: Contiene la lógica de negocio de la aplicación.
- **Data Access Layer (DAL)**: Maneja el acceso a la base de datos y las operaciones CRUD.
- **Efilm (ASP.NET Core Web API)**: Exposición de la API para ser consumida por clientes externos.
- **Models**: Definición de los modelos de datos utilizados en la aplicación.

## Requisitos Previos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

## Configuración del Proyecto

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu_usuario/movie-library-api.git
   cd movie-library-api
   ```

2. Configura la cadena de conexión en `appsettings.json` dentro del proyecto Efilm:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=your_server;Database=your_database;User Id=your_user;Password=your_password;"
   },
   "Jwt": {
     "Key": "your_secret_key",
     "Issuer": "your_issuer"
   }
   ```

3. Aplica las migraciones para crear la base de datos:
   ```sh
   dotnet ef database update --project DataAccessLayer
   ```

4. Ejecuta la aplicación:
   ```sh
   dotnet run --project Efilm
   ```

## Uso de la API

Una vez que la API esté en funcionamiento, puedes utilizar herramientas como Postman o Swagger para interactuar con los diferentes endpoints y realizar operaciones CRUD sobre las películas y los comentarios de los usuarios.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cualquier cambio que desees realizar.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme a través de [santiagors2611@gmail.com](mailto:santiagors2611@gmail.com).

---

¡Gracias por visitar mi repositorio y espero que encuentres útil este proyecto!