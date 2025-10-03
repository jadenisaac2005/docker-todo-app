# Docker To-Do List App 📝

A simple To-Do list application built with Node.js and PostgreSQL, fully containerized using Docker and Docker Compose. This project serves as a practical example of a multi-container web application setup.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 🚀 Features

-   **Backend API**: A simple RESTful API to create and retrieve to-do items.
-   **Containerized**: The entire application stack (Node.js app + PostgreSQL database) is managed by Docker.
-   **Persistent Data**: Uses a Docker volume to ensure your to-do list data persists even after containers are removed.
-   **One-Command Startup**: Launch the entire application with a single `docker-compose` command.

---

## 🛠️ Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

You must have the following software installed:
-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/)
-   [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/jadenisaac2005/docker-todo-app.git](https://github.com/jadenisaac2005/docker-todo-app.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd docker-todo-app
    ```

3.  **Build and run the application:**
    ```bash
    docker-compose up --build
    ```
    This command will build the application image and start both the application and database containers. The app will be available at `http://localhost:3000`.

4.  **(First time only) Initialize the database table:**
    Open a **new terminal window** and run the following command to create the `todos` table inside the running database container:
    ```bash
    docker-compose exec db psql -U postgres -d todos -c "CREATE TABLE todos (id SERIAL PRIMARY KEY, description VARCHAR(255));"
    ```

### Stopping the Application

-   To stop the containers, press `Ctrl + C` in the terminal where `docker-compose up` is running.
-   To stop and remove the containers, network, and volumes, run:
    ```bash
    docker-compose down
    ```

---

## ⚙️ API Endpoints

You can interact with the API using a tool like `curl` or Postman.

### Get All To-Do Items

-   **Endpoint**: `GET /todos`
-   **Description**: Retrieves a list of all to-do items.
-   **Example `curl` command**:
    ```bash
    curl http://localhost:3000/todos
    ```

### Create a To-Do Item

-   **Endpoint**: `POST /todos`
-   **Description**: Adds a new to-do item to the list.
-   **Example `curl` command**:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"description": "Deploy my Docker project"}' http://localhost:3000/todos
    ```

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
