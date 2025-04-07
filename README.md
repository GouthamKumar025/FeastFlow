# FeastFlow - A Event RSVP Management Application

FeastFlow, a Real-Time Event RSVP Application that I built using React for the frontend and Spring Boot for the backend. The goal of this project was to create a scalable platform where users can create, manage, and respond to event invitations in real time.

## Tech Stack

**Client:** HTML5, TailwindCSS, ShadCN, JavaScript, React JS

**Server:** Java, SpringBoot, SpringData JPA, Hibernate

**Websocket:** Socket IO

**Authentication:** Firebase

**Database:** MySQL

**Mail Service:** JavaMailSender

## Features

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

## Run Locally

Clone the project

```bash
  git clone https://github.com/GouthamKumar025/FeastFlow.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## API Reference

### User API

#### Saving User Details

```http
  POST /api/userDetails/user
```

| Parameter | Type   | Description                   |
| :-------- | :----- | :---------------------------- |
| `user`    | `User` | Details of the user as a list |

### Event API

#### Get events by user

```http
  GET /api/events/user/{userId}
```

| Parameter | Type      | Description                                |
| :-------- | :-------- | :----------------------------------------- |
| `userId`  | `Integer` | Get the event created by a particular user |

#### Get event details

```http
  GET /api/events/{eventId}/eventDetails
```

| Parameter | Type      | Description                      |
| :-------- | :-------- | :------------------------------- |
| `eventId` | `Integer` | Get the particular event details |

#### Get the event responses

```http
  GET /api/events/guestRSVP/{eventId}
```

| Parameter | Type      | Description                      |
| :-------- | :-------- | :------------------------------- |
| `eventId` | `Integer` | Get the particular event details |

#### Creating a event

```http
  POST /api/events/eventDetails
```

| Parameter | Type    | Description            |
| :-------- | :------ | :--------------------- |
| `event`   | `Event` | Save the event details |

#### Updating the event RSVP (for guests)

```http
  GET /api/events/{guestId}/rsvp
```

| Parameter | Type      | Description                        |
| :-------- | :-------- | :--------------------------------- |
| `guestId` | `Integer` | Get the particular guest responses |

### Contact API

#### Save the queries and reports of users

```http
  POST /api/contacts/submit
```

| Parameter | Type      | Description                         |
| :-------- | :-------- | :---------------------------------- |
| `contact` | `Contact` | Saves the queries and reports to DB |

## Screenshots

![LoginPage](.assets/Loginform.png)
![SignUpPage](.assets/Signup_Page.png)
![About](.assets/About.png)
![Home](.assets/Homepage.png)
![EventForm](.assets/EventForm.png)
![EventPage](.assets/EventPage.png)
![Contact](.assets/Contact.png)
