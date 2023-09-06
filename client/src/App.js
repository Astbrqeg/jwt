import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/login"
import Signup from "./components/signup"
import Dashboard from "./components/dashboard"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
