import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import {Navigate, useRoutes} from 'react-router-dom';
import BankDashBoard from './components/bankDashBoard';
import ApplicantLoansList from './components/applicantLoansList';
import FacilityDetails from './components/facilityDetails';
import NewLoan from './components/NewLoan';


const App:React.FC = ():JSX.Element=>{

  const mainRoutes = {
    path:'/',
    element: <LoginForm/>
  };
  const bankDashBoardRoutes = {
    path:'/dashboardBank',
    element: <BankDashBoard/>
  };
  const applicantLoansListRoutes = {
    path:'/applicant/:applicantId/loans',
    element: <ApplicantLoansList/>
  };
  const newLoanRoutes = {
    path:'/applicant/:applicantId/loan/new',
    element: <NewLoan/>
  };
  
  
  
  const routing = useRoutes([mainRoutes,bankDashBoardRoutes,applicantLoansListRoutes,newLoanRoutes]);
  return (
    <div 
    style={{
      display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
    }}
    >
    {routing}
    </div>
  ); 
}

export default App;
