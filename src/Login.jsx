import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Navbar from "./assets/components/Navbar";
import Loader from "./assets/components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Artify | Login";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 animate-fadeIn">
  <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 font-semibold transition"
            >
              Login
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-3 p-3 bg-white text-black rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 font-semibold transition"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Login with Google</span>
          </button>

          <p className="mt-4 text-center text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
         </Link>
          </p>
    </div>
      </div>
    </>
  );
};

export default Login;
