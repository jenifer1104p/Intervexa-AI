# Intervexa AI

An AI-powered interview preparation platform built with **Java, Spring Boot, Spring AI, Ollama, and vanilla JavaScript**. It helps learners practise technical interview questions, receive AI-generated feedback, and track their preparation progress.

## Features

- **AI Interview Practice** – generate technology-specific questions by difficulty and optional topic.
- **Answer Evaluation** – submit an answer and receive AI-generated feedback and a score.
- **Mock Interview** – practise a multi-question interview flow.
- **Analytics** – review practice activity and score summaries.
- **Interview History** – revisit saved practice sessions.
- **Learning Roadmap** – track learning tasks across Java, Python, SQL, and React.
- **Settings** – manage local preferences and available data actions.

> **Current MVP note:** Interview history, analytics, roadmap progress, and preferences are stored in the browser using `localStorage`. They are not yet persisted to a server-side database. The application does not currently implement user authentication.

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java, Spring Boot 3.5.6, Spring Web |
| AI integration | Spring AI, Ollama |
| Local language model | `qwen2.5:3b` (configurable) |
| Frontend | HTML5, CSS3, JavaScript |
| Build | Maven |

## Prerequisites

- Java 21 or later
- Maven (or use the included Maven Wrapper)
- Ollama installed and running locally
- The model used by the default configuration pulled in Ollama

## Run Locally

1. Clone this repository:

   ```bash
   git clone https://github.com/<your-github-username>/Intervexa-AI.git
   cd Intervexa-AI
   ```

2. Pull and start the model in Ollama:

   ```bash
   ollama pull qwen2.5:3b
   ollama serve
   ```

   If Ollama is already running as a background service, the `ollama serve` command may not be needed.

3. Start the Spring Boot application:

   **Windows**
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

   **macOS / Linux**
   ```bash
   ./mvnw spring-boot:run
   ```

   Alternatively, import the project as an existing Maven project in Eclipse / Spring Tool Suite and run `AiOllamaApplication.java`.

4. Open the application:

   ```text
   http://localhost:8088/
   ```

## Configuration

Edit `src/main/resources/application.properties` to change the port, Ollama URL, model, or temperature:

```properties
spring.application.name=IntervexaAI
server.port=8088
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.options.model=qwen2.5:3b
spring.ai.ollama.chat.options.temperature=0.7
```

Make sure the configured model is available locally in Ollama.

## Project Structure

```text
Intervexa-AI/
├── src/
│   ├── main/
│   │   ├── java/com/example/demo/
│   │   │   ├── AiOllamaApplication.java
│   │   │   └── controller/InterviewController.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │           ├── index.html
│   │           ├── styles.css
│   │           └── app.js
│   └── test/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/interview/question` | Generate a question using `skill`, `difficulty`, and optional `customTopic` query parameters |
| `POST` | `/interview/evaluate` | Evaluate a submitted answer (JSON request body) |

## Notes & Limitations

- Ollama must be running and the selected model must be downloaded before AI features can work.
- AI-generated scores and feedback are suggestions; they should not be treated as an objective hiring assessment.
- Basic server-side answer screening is heuristic-based and may not correctly classify every valid or invalid answer.
- Browser-stored data is local to the browser profile and device. Clearing site data can remove it.
- This repository is an educational portfolio project / MVP, not a production hiring system.

## Future Improvements

- Persist users, interviews, and analytics in MySQL.
- Add authentication and per-user data isolation.
- Expand automated controller and integration tests.
- Improve answer-quality validation and structured AI responses.
- Add deployment configuration and CI checks.

## Author

**Jemima Mary P**

Java Full Stack & AI application development portfolio project.
