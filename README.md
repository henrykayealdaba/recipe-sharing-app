RECIPE SHARING APP - HENRY KAYE

- 🌐 Live Deployment

- Frontend: https://recipe-sharing-app-one.vercel.app/
- Backend API: https://recipe-sharing-app-tit1.onrender.com/

🚀 Development Process

1. Project Setup
   I started by structuring the project into a monorepo:
   backend – Node.js + Express API
   frontend – React (Vite) application
   Shared root for development scripts

2. Backend Development
   I built a RESTful API using Express and MongoDB:
   Implemented user authentication (signup, login, logout)
   Used JWT stored in HTTP-only cookies
   Built recipe CRUD operations (create, read, update, delete)
   Added favorite/unfavorite system per user
   Implemented protected routes using middleware

3. Frontend Development
   I built a responsive UI using React and TailwindCSS:
   Implemented routing using React Router
   Managed global state using Zustand
   Used Axios for API communication
   Built reusable components (RecipeCard, Skeleton loaders, Pagination)
   Added sidebar navigation layout

4. Advanced Features
   Real-time search with debounce optimization
   Optimistic UI updates for favorites
   Skeleton loading states for better UX
   Pagination for large recipe lists
   Ownership-based access control (edit/delete recipes)

5. Challenges Faced
   CORS & Cookie Authentication Issues
   Fixed by configuring credentials: true and proper sameSite cookie settings.
   Real-time Search Performance
   Solved using debounce with setTimeout inside useEffect.
   State Syncing Between Favorites & User Data
   Solved using Zustand global state updates for immediate UI feedback.
   Deployment Planning (Vercel constraints)
   Learned to separate frontend and backend deployment strategies.

🧰 Tools & Libraries

- Frontend -
  React
  Vite
  React Router
  Zustand (state management)
  Axios
  TailwindCSS
  Lucide React (icons)

- Backend -
  Node.js
  Express.js
  MongoDB + Mongoose
  JWT Authentication
  bcryptjs
  cookie-parser
  cors
  dotenv
  helmet
  morgan
  Dev Tools
  VS Code
  Thunder Client (API testing)
  Git & GitHub
  Nodemon

AI Tools Used
ChatGPT – Used for debugging, architecture guidance, and feature implementation suggestions

📚 External Resources

- MongoDB Documentation
  https://www.mongodb.com/docs/
- Express.js Documentation
  https://expressjs.com/
- React Router Docs
  https://reactrouter.com/
- TailwindCSS Docs
  https://tailwindcss.com/docs
- JWT Authentication Guide
  https://jwt.io/introduction
- MDN Web Docs (general JavaScript reference)
  https://developer.mozilla.org/

⚙️ Setup Instructions

1. Clone the repository
   git clone this repository
   cd recipe-sharing-app

2. Install dependencies
   npm install

3. Add inside backend folder .env
   - PORT=3000
   - MONGO_URI=your_mongodb_connection_string (Needs new database)
   - JWT_SECRET=your_secret_key e.g AnythingYouWant
   - NODE_ENV=development
   - CLIENT_URL=http://localhost:5173

4. Add inside frontend folder .env
   - VITE_API_BASE_URL=http://localhost:3000/api

5. Run the project (development) from the root folder.
   npm run dev

6. Build for production
   npm run build

🎯 Features Summary

User authentication (JWT + cookies)
Recipe CRUD system
Add Favorites
Real-time search with debounce
Pagination
Protected routes middleware
Responsive UI
Skeleton loading states

📌 Notes

This project was built as part of a take-home assessment focusing on:
Asynchronous JavaScript handling
Full-stack architecture
State management
API design
UI/UX responsiveness
