import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore.js';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import MainLayout from './layout/MainLayout.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import EditRecipe from './pages/EditRecipe.jsx';
import MyDish from './pages/MyDish.jsx';
import Favorites from './pages/Favorites.jsx';
export default function App() {
  const authCheck = useAuthStore((state) => state.authCheck);

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateRecipe />
            </ProtectedRoute>
          }
        />

        <Route path="/mydish" element={<MyDish />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/recipe/:id/edit" element={<EditRecipe />} />
        <Route path="/favorites" element={<Favorites />}></Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
