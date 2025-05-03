import './App.css'
import { useEffect } from 'react';
import { useSetRecoilState } from "recoil";
import LogIn from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Navbar from './components/navbar/Navbar';
import { userInfoState } from "./atom/userAtom";
import { ToastContainer } from 'react-toastify';
import Home from './components/landingPage/Home';
import { Route, Routes } from 'react-router-dom';
import UserPlan from './components/features/user/UserPlan';
import { getInitialUserInfo } from './services/storeUserInfo';
import Location from './components/features/location/Location';
import Schedule from './components/features/schedule/Schedule';
import AddLocation from './components/features/location/AddLocation';
import AddSchedule from './components/features/schedule/AddSchedule';
import UserPayment from './components/features/payment/UserPayment';
import UserDetails from './components/features/user/UserDetails';
import UserAttendance from './components/features/attendance/UserAttendance';


function App() {
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(()=>{
    let localData = getInitialUserInfo();
    if(localData){
        setUserInfo(localData);
    }
  },[]);

  return (
    <div className='h-screen flex flex-col items-center justify-center overflow-auto scroll-smooth [scrollbar-width:none]'>
      <Navbar/>
      <Routes>
          <Route path='/' element= {<Home/>}></Route>
          <Route path='/Signup' element= {<SignUp/>}></Route>
          <Route path='/Login' element= {<LogIn/>}></Route>
          <Route path='/Location' element= {<Location/>}></Route>
          <Route path='/AddLocation' element= {<AddLocation/>}></Route>
          <Route path='/Schedule' element={<Schedule/>}></Route>
          <Route path='/AddSchedule' element={<AddSchedule/>}></Route>
          <Route path='/UserPlan' element={<UserPlan/>}></Route>
          <Route path='/UserDetails' element={<UserDetails/>}></Route>
          <Route path='/Payments' element={<UserPayment/>}></Route>
          <Route path='/Attendance' element={<UserAttendance/>}></Route>
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
