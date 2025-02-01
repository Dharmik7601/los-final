import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

//HOME PAGE
import HomePage from './pages/Home/HomePage';
import Home from './pages/Home/Home';
import Policy from './pages/Home/Policy';
import Forms from './pages/Register/Forms';
import Login from './pages/Login/Login';
import SetPassword from './pages/Password/SetPassword';
import ForgotPassword from './pages/Password/ForgotPassword';
import OTP from './pages/Password/OTP';
import UserVerification from './pages/Password/UserVerification';

//COMPONENTS
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/Sidebar/SideBar';
import AdminSideBar from './components/Sidebar/AdminSideBar';
import PostLoginNavBar from './components/NavBar/PostLoginNavBar';

//USER PANEL
import Dashboard from "./pages/UserPanel/UserDashboard";
import KYC from "./pages/UserPanel/KYC";
import CheckStatus from "./pages/UserPanel/CheckStatus";
import AddInquiry from './pages/UserPanel/AddInquiry';
import PersonalInfo from './pages/UserPanel/PersonalInfo';
import LoanInfo from './pages/UserPanel/LoanInfo';
import SanctionLetterUser from './pages/UserPanel/SanctionLetterUser';
import LinkBankDetails from "./pages/UserPanel/LinkBankDetails";
import DisplayBankDetails from "./pages/UserPanel/DisplayBankDetails";
import BankDetails from "./pages/UserPanel/BankDetails";

//ADMIN PANEL
import AdminDashboard from "./pages/AdminPanel/AdminDashboard";
import AddUser from "./pages/AdminPanel/AddUser";
import ClientData from "./pages/AdminPanel/ClientData";
import ClientDetails from "./pages/AdminPanel/ClientDetails";
import Statistics from "./pages/AdminPanel/Statistics";
import Analytics from "./pages/AdminPanel/Analytics";
import LoanData from './pages/AdminPanel/LoanData';
import SanctionLetterForm from './pages/AdminPanel/SanctionLetterForm';
import SanctionLetter from './pages/AdminPanel/SanctionLetter';

//TESTING
import Test from './pages/Register/Test';
import Practice from './pages/Register/Practice';
import SideBar2 from './components/SideBar2/SideBar2';
import Creators from './pages/Home/Creators';

function App() {
  const [sanctionDetails, setSanctionDetails] = useState({})
  return (
    <>
      <Routes>
        {/* HOME */}
        <Route exact path='/' element={<HomePage />} />
        <Route path='/home' element={<Home />} />
        <Route path='home/loan/business' element={<Forms loan_type={"Business"} country={"India"} />} />
        <Route path='home/loan/home' element={<Forms loan_type={"Home"} country={"India"} />} />
        <Route path='home/loan/education' element={<Forms loan_type={"Education"} country={"India"} />} />
        <Route path='home/loan/personal' element={<Forms loan_type={"Personal"} country={"India"} />} />
        <Route path='/otp' element={<OTP />} />
        <Route path='/set-password' element={<SetPassword />} />
        <Route path='/login/client' element={<Login />} />
        <Route path='/login/admin' element={<Login />} />
        <Route path='/forgot-password/:id' element={<ForgotPassword />} />
        <Route path='/user/verify/:userToken' element={<UserVerification />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/creators' element={<Creators />} />

        {/* COMPONENTS */}
        <Route path='/navbar' element={<NavBar />} />
        <Route path='/sidebar' element={<SideBar />} />
        <Route path='/new-navbar' element={<PostLoginNavBar />} />
        <Route path='/admin-sidebar' element={<AdminSideBar />} />

        {/* USER PANEL */}
        <Route path="/user-panel/user-dashboard" element={<Dashboard />} />
        <Route path="/user-panel/kyc-docs" element={<KYC />} />
        <Route path="/user-panel/check-status" element={<CheckStatus />} />
        <Route path="/user-panel/add-inquiry" element={<AddInquiry />} />
        <Route path="/user-panel/my-info/personal-info" element={<PersonalInfo />} />
        <Route path="/user-panel/my-info/loan-info/:loanId" element={<LoanInfo />} />
        <Route path="/user-panel/bank-details" element={<BankDetails />} />
        <Route path="/user-panel/sanction-letter/:loanId" element={<SanctionLetterUser />} />
        {/* <Route path="/user-panel/bank-details-final" element={<DisplayBankDetails />} /> */}

        {/* ADMIN PANEL */}
        <Route path="/admin-panel/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-panel/add-user" element={<AddUser />} />
        <Route path="/admin-panel/client-data" element={<ClientData />} />
        <Route path="/admin-panel/client-details/:id/:email" element={<ClientDetails />} />
        <Route path="/admin-panel/client-details/loan-data/:userId/:email/:loanId" element={<LoanData />} />
        <Route path="/admin-panel/statistics" element={<Statistics />} />
        <Route path="/admin-panel/analytics" element={<Analytics />} />
        {/* <Route path="/admin-panel/sanction-letter-form" element={<SanctionLetterForm />} />
        <Route path="/admin-panel/sanction-letter" element={<SanctionLetter />} /> */}

        {/* TESTING */}
        <Route path='/test' element={<Test />} />
        <Route path='/practice' element={<Practice />} />
        <Route path='/sidebar2' element={<SideBar2 />} />
        <Route path="/admin-panel/sanction/:userId/:email/:loanId" element={<SanctionLetterForm setSanctionDetails={setSanctionDetails} />} />
        <Route path="/admin-panel/sanction-letter/:userId/:email/:loanId" element={<SanctionLetter sanctionDetails={sanctionDetails}  />} />

      </Routes>
    </>
  );
}

export default App;
