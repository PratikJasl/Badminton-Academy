import './App.css'
import SignUp from './components/SignUp'
import LogIn from './components/Login'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <Navbar/>
      <Routes>
        <Route path='/Signup' element= {<SignUp/>}></Route>
        <Route path='/Login' element= {<LogIn/>}></Route>
      </Routes>
    </div>
  )
}

export default App
