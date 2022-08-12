import './App.css';
import CanvasComponent from './components/CanvasComponent';
import AuthPorver from './firebase/AuthProvider/AuthPorver';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import PrivateRoute from './PrivateRouter/PrivateRoute';
import Register from './Registration/Register';

function App() {


  return (
    <AuthPorver>
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute><CanvasComponent /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
        </Routes>
      </BrowserRouter>
      </div>
    </AuthPorver>
  );
}

export default App;
