
import './App.css';
import Login from './modules/login_module/Login';
import RegisterUser from './modules/login_module/RegisterUser';
import { useState } from'react';

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  return (
  
    <div className="App">
      {!currentUser ? (
        <Login onLogin={(user) => setCurrentUser(user)} />
      ) : (
        <RegisterUser currentUser={currentUser} />
      )}
    </div>
    
  );
}

export default App;
