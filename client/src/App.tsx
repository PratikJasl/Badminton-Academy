import './App.css';
import { lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
const LogIn = lazy(() => import("./components/auth/Login"));
const SignUp = lazy(() => import('./components/auth/SignUp'));
import Navbar from './components/navbar/Navbar';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifyResetPasswordOTP from './components/auth/VerifyResetPasswordOtp';
const Home = lazy(() => import('./components/landingPage/Home'));
const UserPlan = lazy(() => import('./components/features/user/UserPlan'));
const Location = lazy(() => import('./components/features/location/Location'));
const Schedule = lazy(() => import('./components/features/schedule/Schedule'));
const AddLocation = lazy(() => import('./components/features/location/AddLocation'));
const AddSchedule = lazy(() => import('./components/features/schedule/AddSchedule'));
const UserPayment = lazy(() => import('./components/features/payment/UserPayment'));
const UserDetails = lazy(() => import('./components/features/user/UserDetails'));
const UserAttendance = lazy(() => import('./components/features/attendance/UserAttendance'));
const VerifyEmail = lazy(() => import('./components/auth/VerifyEmail'));
const VerifyEmailOtp = lazy(() => import('./components/auth/VerifyEmailOtp'));
import ObserverProvider from './services/ObserverProvider';

function App() {
    return (
        <ObserverProvider>
        <div className='h-screen flex flex-col items-center justify-center overflow-auto scroll-smooth [scrollbar-width:none]'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Signup' element={<SignUp />} />
                <Route path='/Login' element={<LogIn />} />
                <Route path='/Location' element={<Location />} />
                <Route path='/AddLocation' element={<AddLocation />} />
                <Route path='/Schedule' element={<Schedule />} />
                <Route path='/AddSchedule' element={<AddSchedule />} />
                <Route path='/UserPlan' element={<UserPlan />} />
                <Route path='/UserDetails' element={<UserDetails />} />
                <Route path='/Payments' element={<UserPayment />} />
                <Route path='/Attendance' element={<UserAttendance />} />
                <Route path='/ForgotPassword' element={<ForgotPassword/>} />
                <Route path='/Verification' element={<VerifyResetPasswordOTP/>} />
                <Route path='/VerifyEmail' element={<VerifyEmail/>} />
                <Route path='/VerifyEmailOtp' element={<VerifyEmailOtp/>} />
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
                theme="dark"
            />
        </div>
        </ObserverProvider>
    );
}

export default App;
