import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from './Component/Base';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import SignUp from './pages/Signup';
import AboutUs from './pages/aboutUs';
import Login from './pages/Login';
import Create from './pages/create';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userdashboard from './pages/User-route/userdashboard';
import PrivateRoute from './Component/privateRoute';
import Profile from './pages/User-route/profile';
import CustomNavbar from './Component/CustomNavbar';
import PostPage from './pages/postPage';
import BlogCatogriesById from './Component/blogCatogriesById';

function App() {
  const [backendResponse, setBackendResponse] = useState('');

  useEffect(() => {
    // Corrected URL with proper colon before the port number
    fetch('http://54.237.217.57:8081/api/ping')
      .then(response => response.text())
      .then(data => setBackendResponse(data))
      .catch(error => console.error('Error connecting to backend:', error));
  }, []);

  return (
    <Base>
      <BrowserRouter>
        <CustomNavbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home backendResponse={backendResponse} />} />
          <Route path="/create" element={<Create />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/kartik" element={<SignUp />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/categoreis/:categoryId" element={<BlogCatogriesById />} />
          <Route path="/user" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Userdashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <div className="text-center mt-4">
        <h5>Backend Test:</h5>
        <p>{backendResponse ? backendResponse : 'Waiting for backend response...'}</p>
      </div>
    </Base>
  );
}

export default App;

