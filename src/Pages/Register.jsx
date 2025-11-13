import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../assets/components/Loader";
import Navbar from "../assets/components/Navbar";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Artify | Register";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      toast.error("Password must have uppercase, lowercase & min 6 chars");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
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
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">Create Account</h2>

          <form onSubmit={handleRegister} className="space-y-4">
  <input
    type="text"
    placeholder="Full Name"
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
  <input
    type="email"
    placeholder="Email"
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <input
    type="text"
    placeholder="Photo URL (optional)"
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    value={photoURL}
    onChange={(e) => setPhotoURL(e.target.value)}
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
    Register
  </button>
</form>
<button
  onClick={handleGoogleSignup}
  className="w-full mt-3 p-3 bg-white text-black rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 font-semibold transition"
>
  <FcGoogle className="w-5 h-5" />
  <span>Sign up with Google</span>
</button>
          <p className="mt-4 text-center text-gray-700">
            Already have an account?{" "}
    <Link to="/login" className="text-indigo-600 hover:underline">
      Login
   </Link>
      </p>
        </div>
           </div>
    </>
  );
};

export default Register;
