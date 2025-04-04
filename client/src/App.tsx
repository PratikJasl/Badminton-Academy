import './App.css'
import Home from './components/landingPage/Home';
import SignUp from './components/auth/SignUp'
import LogIn from './components/auth/Login'
import Navbar from './components/navbar/Navbar'
import AddLocation from './components/features/AddLocation';
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <Navbar/>
      <Routes>
        <Route path='/' element= {<Home/>}></Route>
          <Route path='/Signup' element= {<SignUp/>}></Route>
          <Route path='/Login' element= {<LogIn/>}></Route>
          <Route path='/Location' element= {<AddLocation/>}></Route>
      </Routes>
    </div>
  )
}

export default App
