
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,45:312E81,100:06B6D4&height=190&section=header&text=INTERVEXA%20AI&fontSize=48&fontColor=FFFFFF&fontAlignY=38&animation=fadeIn&desc=AI-Powered%20Technical%20Interview%20Preparation&descAlignY=60&descSize=16" width="100%" alt="Intervexa AI animated header" />

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=19&pause=1100&color=22D3EE&center=true&vCenter=true&width=650&lines=Prepare+smarter.+Practice+with+AI.;Generate+technical+questions.;Get+instant+AI-powered+feedback.;Build+confidence+one+answer+at+a+time." alt="Typing animation" />

<br/>

![Java](https://img.shields.io/badge/Java-21%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring AI](https://img.shields.io/badge/Spring%20AI-Integration-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-Local%20AI-black?style=for-the-badge)

**An interactive interview preparation platform powered by a locally running AI model.**


</div>

---

## ✨ About Intervexa AI

Intervexa AI is an AI-powered technical interview preparation platform designed to help learners improve their interview skills through intelligent question generation, answer evaluation, mock interviews, and preparation tracking.

Built using **Java, Spring Boot, Spring AI, Ollama, and JavaScript**, the application integrates a locally running language model to provide interactive interview practice and AI-generated feedback.

## 🚀 Key Features

| Feature | Description |
|---|---|
| 🎯 AI Interview | Generate technical questions based on skill and difficulty |
| 🧠 AI Evaluation | Receive answer feedback and scores |
| 🎤 Mock Interview | Practise a multi-question interview session |
| 📊 Analytics | Track practice activity and performance |
| 🗂️ Interview History | Review previous interview attempts |
| 🧭 Learning Roadmap | Track Java, Python, SQL, and React learning tasks |
| ⚙️ Settings | Manage preferences and local data |

## 🛠️ Tech Stack

<div align="center">

![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Spring AI](https://img.shields.io/badge/Spring_AI-6DB33F?style=flat-square&logo=spring&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-111827?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=flat-square&logo=apachemaven&logoColor=white)

</div>

| Layer | Technology |
|---|---|
| Backend | Java, Spring Boot 3.5.6, Spring Web |
| AI Integration | Spring AI, Ollama |
| AI Model | Qwen 2.5 3B |
| Frontend | HTML5, CSS3, JavaScript |
| Build Tool | Maven |

## ⚡ Getting Started

### Prerequisites

- Java 21 or later
- Ollama installed
- Maven or included Maven Wrapper
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/jenifer1104p/Intervexa-AI.git
cd Intervexa-AI
```

### 2. Download the AI Model

```bash
ollama pull qwen2.5:3b
```

Make sure Ollama is running. If needed:

```bash
ollama serve
```

### 3. Run the Application

**Windows**

```powershell
.\mvnw.cmd spring-boot:run
```

**macOS / Linux**

```bash
./mvnw spring-boot:run
```

Alternatively, import the project into Eclipse or Spring Tool Suite as an existing Maven project and run `AiOllamaApplication.java`.

### 4. Open the Application

<div align="center">

### 🌐 http://localhost:8088/

</div>

## 🔧 Configuration

Update `src/main/resources/application.properties`:

```properties
spring.application.name=IntervexaAI
server.port=8088

spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.options.model=qwen2.5:3b
spring.ai.ollama.chat.options.temperature=0.7
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/interview/question` | Generate an interview question |
| POST | `/interview/evaluate` | Evaluate a candidate's answer |

### Sample Evaluation Request

```json
{
  "skill": "Java",
  "difficulty": "Beginner",
  "question": "What is inheritance in Java?",
  "expectedAnswer": "Inheritance allows a class to acquire properties and methods from another class.",
  "candidateAnswer": "Inheritance allows one class to reuse the fields and methods of another class."
}
```

## 📁 Project Structure

```text
Intervexa-AI/
├── src/
│   ├── main/
│   │   ├── java/com/example/demo/
│   │   │   ├── AiOllamaApplication.java
│   │   │   └── controller/
│   │   │       └── InterviewController.java
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

## 📌 Current Scope & Limitations

- Ollama and the selected local model must be running for AI features.
- Interview history, analytics, roadmap progress, and preferences are stored in browser `localStorage`.
- Server-side database persistence and user authentication are not currently implemented.
- Answer screening uses heuristic checks and may not classify every answer correctly.
- AI-generated scores are practice guidance, not objective hiring assessments.
- This project is an educational portfolio MVP, not a production hiring system.

## 🔮 Future Enhancements

- MySQL database integration.
- User authentication and authorization.
- Improved answer validation.
- More automated backend and integration tests.
- Deployment and CI/CD integration.

---

## 👩‍💻 Author

<div align="center">

**Jenifer P**

Java Full Stack & AI Application Development

[![GitHub](https://img.shields.io/badge/GitHub-jenifer1104p-181717?style=for-the-badge&logo=github)](https://github.com/jenifer1104p)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06B6D4,50:312E81,100:0F172A&height=100&section=footer" width="100%" alt="Footer" />

</div>
