# Event RSVP System

## 📌 Overview

The **Event RSVP System** is a full-stack web application that allows users to create, manage, and RSVP to events. It provides an intuitive interface for event hosts and attendees while ensuring secure data handling and email notifications.

## 🚀 Tech Stack

### Frontend:

- React.js
- Axios
- Tailwind CSS
- Vite
- WebSockets (for real-time updates)

### Backend:

- Spring Boot
- Spring Data JPA (MySQL Database)
- Firebase (Authentication & Authorization)
- Email Service (JavaMail API)
- WebSockets (Real-time notifications)

## 🎯 Features

### User Features:

- Register and log in securely
- Browse upcoming events
- RSVP to events
- Receive email confirmations

### Host Features:

- Create, update, and delete events
- View RSVPs for events
- Send event-related notifications

### Additional Features:

- Real-time updates via WebSockets
- Secure authentication & authorization
- Responsive UI with Tailwind CSS

## 📂 Project Structure

```
Event-RSVP/
│── backend/            # Spring Boot Backend
│   ├── src/main/java/com/example/eventrsvp
│   ├── src/main/resources
│   ├── pom.xml         # Maven dependencies
│── frontend/           # React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│── README.md           # Project Documentation
```

## 🛠️ Setup Instructions

### Backend (Spring Boot)

1. Clone the repository:
   ```sh
   git clone https://github.com/GouthamKumar025/FeastFlow.git
   cd FeastFlow/backend
   ```
2. Configure database (MySQL) in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/event_rsvp
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
3. Build & Run:
   ```sh
   mvn spring-boot:run
   ```

### Frontend (React.js)

1. Navigate to the frontend folder:
   ```sh
   cd FeastFlow/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm run dev
   ```

## 🔗 API Endpoints

### User Authentication

- `POST /api/auth/register` → User registration
- `POST /api/auth/login` → User login

### Events Management

- `GET /api/events` → Get all events
- `POST /api/events` → Create a new event
- `PUT /api/events/{id}` → Update an event
- `DELETE /api/events/{id}` → Delete an event

### RSVP Management

- `POST /api/rsvp/{eventId}` → RSVP to an event
- `GET /api/rsvp/{eventId}` → Get all RSVPs for an event

## 📧 Email Notifications

- Users receive RSVP confirmation emails.
- Hosts receive RSVP updates for their events.

## 📜 License

This project is licensed under the MIT License.

---

💡 **Contributions are welcome!** If you’d like to enhance this project, feel free to open a pull request. 🚀

