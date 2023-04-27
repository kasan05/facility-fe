import RestTemplate from '../commons/RestTemplate';
import axios from 'axios';
import User from '../types/User'
import AuthResponse from '../types/AuthResponse';
import Loan from '../types/loan';

const login = (user:User)=>{
    return RestTemplate.post<AuthResponse>("/auth/authenticate",user);
}

const getAllApplicants =(token:string)=>{
    return RestTemplate.get<User[]>("/user/role/applicant",{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
}
const getAllLoansForApplicant =(token:string,applicantId:string)=>{
    return RestTemplate.get<Loan[]>("/facility/applicant/"+applicantId+"/loans",{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
}
const createLoanForNonExistingFacility =(token:string,loan:Loan)=>{
    return RestTemplate.post("/facility",loan,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
}


const RestService ={login,getAllApplicants,getAllLoansForApplicant,createLoanForNonExistingFacility}

export default RestService;