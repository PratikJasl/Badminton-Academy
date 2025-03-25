import './App.css'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <Navbar/>
      <SignUp/>
    </div>
  )
}

export default App
