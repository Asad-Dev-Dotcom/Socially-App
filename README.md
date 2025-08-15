# 🌐 Socially

**Socially** is a portfolio-level **MEAN Stack** social media application that enables users to connect through posts, likes, and comments.  
The project demonstrates **real-time communication**, **secure authentication**, and **media handling** for a rich, interactive experience.

---

## 🚀 Tech Stack

**Frontend**
- Angular **v16**
- RxJS (Services, Observables, Subjects)
- Angular Router (Guards & Interceptors)

**Backend**
- Node.js **v22**
- Express.js
- MongoDB **v8**
- Multer (File Uploads)
- Socket.IO (Real-Time Features)
- JSON Web Tokens (JWT)

---

## 🔑 Features

### 👤 Authentication
- **JWT-based authentication** for secure login and signup.
- Angular **Route Guards** to protect private routes.
- **Interceptors** for attaching auth tokens to HTTP requests.

### 📰 Feed
- View posts from all users.
- Posts can include:
  - **Text only**
  - **Single or multiple images**
  - **Videos** (with built-in video player support)

### ✍️ Post Management
- Create, edit, and delete your own posts.
- Upload images or videos using **Multer**.
- Posts instantly appear in feed (real-time updates via **Socket.IO**).

### ❤️ Likes & 💬 Comments
- **Single-tap toggle** for likes (like/unlike).
- Add comments to posts.
- Edit and delete **your own comments**.
- Real-time updates for likes and comments without page refresh.

---

## 🛠 Architecture
- **Frontend**: Angular SPA with **state management** via services, observables, and subjects.
- **Backend**: Node.js + Express following **MVC pattern**.
- **File Uploads**: Managed via **Multer**, stored locally.
- **Real-Time**: Socket.IO for instant feed updates.

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Asad-Dev-Dotcom/socially.git
cd socially
````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
ng serve
```

---

## ⚡ Real-Time Features

* **Socket.IO** handles real-time broadcasting for:

  * New posts
  * Likes
  * Comments
  * Post/Comment edits and deletions

---

## 📌 Notes

* Currently **not responsive** for mobile.
* No profile, search, or follow functionality (feed-only focus).
* Environment variables are not implemented; config values are inline in backend code.
* This is a **portfolio project** and not deployed publicly.

---

## ✍️ Author

Developed by **\[Asad Noor]**

