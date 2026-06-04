import { useState } from 'react';
import { useAuthStore } from '../stores/authStore.js';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(form);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        className="w-80 rounded bg-white p-6 shadow"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-xl font-bold">Login</h1>

        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
          className="mb-2 w-full border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-4 w-full border p-2"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-3 text-sm">
          No account?{' '}
          <Link to={'/signup'} className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
