import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './modules/login_module/Login';
import RegisterUser from './modules/login_module/RegisterUser';
import Home from './home/Home';
import WfmLayout from './modules/wfm/wfmLayout';
import ApprovalPage from './modules/wfm/approvalPage';
import ExcelUploadPage from './modules/wfm/Import_Tab/ExcelUploadPage';

function App() {
  // Check if currentUser is in localStorage (persisted state)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || null
  );

  useEffect(() => {
    // Persist currentUser to localStorage whenever it changes
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // logout functionality 

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };
  
  return (
    <Router>
      <Routes>
        {/* Route: Login Page */}
        <Route
          path="/"
          element={
            !currentUser ? (
              <Login onLogin={(user) => setCurrentUser(user)} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        {/* Route: Home Page (After Login) */}
        <Route
          path="/home"
          element={
            currentUser ? (
              <Home currentUser={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Route: WFM */}
        <Route path="/wfm/*" element={ currentUser ? (
              <WfmLayout currentUser={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )}>
            <Route path="action/approve" element={<ApprovalPage />} />
            <Route path="import/excel_upload" element={<ExcelUploadPage />} />


          </Route>


        {/* Optional: Route to Register new user (Admins) */}
        {/* <Route
          path="/register"
          element={
            currentUser ? (
              <RegisterUser currentUser={currentUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}


      
      </Routes>
    </Router>
  );
}

export default App;
