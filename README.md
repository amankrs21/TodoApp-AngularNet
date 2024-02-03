# Angular and Dotnet C# Todo Application

This is a simple Todo application built using Angular for the frontend and Dotnet C# for the backend. It provides full CRUD functionality for managing your tasks. Additionally, the application includes user authentication using JWT Tokens, allowing secure access to todo operations. It also supports user registration and login features.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Angular](#angular)
  - [Dotnet C#](#dotnet-c)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Todo Operations:** Full CRUD functionality for managing your todos.
- **User Authentication:** Secure access with JWT Tokens.
- **User Registration and Login:** Allows users to register and log in.

## Installation

### Angular

1. **Clone the repository:**

    ```bash
    git clone https://github.com/amankrs21/TodoAngularNet.git
    ```

2. **Navigate to the Angular frontend directory:**

    ```bash
    cd TodoAngularNet/frontend
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Run the Angular application:**

    ```bash
    ng serve
    ```

   The application will be available at `http://localhost:4200/`.

### Dotnet C#

1. **Navigate to the Dotnet C# backend directory:**

    ```bash
    cd TodoAngularNet/backend
    ```

2. **Restore dependencies:**

    ```bash
    dotnet restore
    ```

3. **Perform Migrations:**

    ```bash
    dotnet ef migrations add InitialCreate
    ```
    ```bash
    dotnet ef database update
    ```

4. **Run the Dotnet application:**

    ```bash
    dotnet run
    ```

   The backend will be available at `http://localhost:7101/`.

## Usage

Once both the Angular frontend and Dotnet C# backend are running, you can access the Todo application at `http://localhost:4200/`.

- Register a new user.
- Log in with your credentials.
- Perform CRUD operations on your todos.

## Contributing

Feel free to contribute to the development of this Todo application. Create a pull request, report bugs, or suggest new features.

## License

This project is licensed under the [MIT License](LICENSE).
