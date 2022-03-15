import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate replace to="/register" />}
        />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        /> */}
        {/*
        <Route path="/profile/:username">
          <Profile />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
