import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios"
import { useAuth } from "../Context/AuthContext";


const Auth = () => {


//  useEffect(()=>{
 
//  },[])

const { login, setToken } = useAuth();

 const navigate = useNavigate(); //initialization

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
// handle submit for Registration
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    axios.post(
      "https://lc96ppln-8000.uks1.devtunnels.ms/api/company/register",
      formData, 
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      console.log(response.data);
      navigate('/login');  
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    
  

    if (isLogin) {
      if (!email || !password) {
        setError('Please fill in both fields.');
        return;
      }
      console.log('Logged in:', { email, password });
    } else {
      if (!name || !email || !password || !confirmPassword) {
        setError('All fields are required.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      console.log('Signed up:', { name, email, password });
    }

    setError(null);
  };
// login 
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password} = formData;

    axios.post(
      "https://lc96ppln-8000.uks1.devtunnels.ms/api/company/login",
      formData, 
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      setToken(response.data.data.access_token)
      console.log(response.data);
      setIsLogin(true)
      login() 
      navigate('/dashboard');
     
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    
  

    if (isLogin) {
      if (!email || !password) {
        setError('Please fill in both fields.');
        return;
      }
      console.log('Logged in:', { email, password });
    } else {
      if (!name || !email || !password || !confirmPassword) {
        setError('All fields are required.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      console.log('Signed up:', { name, email, password });
    }

    setError(null);
  };

  return (
    <div className="flex flex-col my-16 items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={!isLogin ? handleSubmit: handleLoginSubmit } className="space-y-4">
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <button
          onClick={toggleForm}
          className="mt-4 w-full text-blue-500 hover:text-blue-600 text-sm font-medium underline"
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
