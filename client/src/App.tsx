import './App.css'
import Home from './components/landingPage/Home';
import SignUp from './components/auth/SignUp'
import LogIn from './components/auth/Login'
import Navbar from './components/navbar/Navbar'
import AddLocation from './components/features/AddLocation';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';


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
      <ToastContainer
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Or "dark" or "colored"
        />
    </div>
  )
}

export default App
