import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import Edit from './pages/Edit';
import Profile from './pages/Profile';
function App() {
  return (
    <div className="App">
    
      <Routes>

        <Route path='/' element=<Home/>/>
        <Route path='/addUser' element=<AddUser/>/>
        <Route path='/edit/:id' element=<Edit/>/>
        <Route path='/profile/:id' element=<Profile/>/>
      </Routes>
    </div>
  );
}

export default App;
