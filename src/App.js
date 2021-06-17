import './App.css';
import Login from './components/Login';
import { GlobalProvider } from './context/GlobalState';
import { useAuthState } from 'react-firebase-hooks/auth';

import fire from './fire';
import Todo from './components/Todo';

const auth = fire.auth();


function App() {
  const [user] = useAuthState(auth);
  const username = user ? user.email.substr(0,user.email.indexOf('@')) : "";

  return (
    <GlobalProvider>
      <div className="App">        
        { user ? 
          <>
            <h2>{username}'s Todo List</h2>
            <Todo />
            <LogOut />
          </>   
          : <Login /> }
      </div>
    </GlobalProvider>
  );
}

const LogOut = () => {
  return auth.currentUser && (
    <div>
        <button className="logout" onClick={() => auth.signOut()}>Sign Out</button>
    </div>
    
  )
}

export default App;
