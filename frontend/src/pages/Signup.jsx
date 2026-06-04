import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const signup = useAuthStore((state) => state.signup);
  const loading = useAuthStore((state) => state.loading);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
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

    await signup(form);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-80 rounded bg-white p-6 shadow"
      >
        <h1 className="mb-4 text-xl font-bold">Signup</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="mb-2 w-full border p-2"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mb-2 w-full border p-2"
          onChange={handleChange}
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
          className="w-full rounded bg-green-500 p-2 text-white"
        >
          {loading ? 'Creating...' : 'Signup'}
        </button>

        <p className="mt-3 text-sm">
          Already have an account?{' '}
          <Link to={'/login'} className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
