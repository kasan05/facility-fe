import React,{useEffect}  from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableHead';
import { useParams,useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import RestService from '../service/RestService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NewLoan from './NewLoan';
import Loan from '../types/loan';

const ApplicantLoansList = ()=>{
  const navigate = useNavigate();
  let {applicantId} = useParams();
  const [loans,setLoans] = React.useState<Loan[]>([]);
  const createNewLoan = ()=>{
    navigate("/applicant/"+applicantId+"/loan/new");
  }
  useEffect(()=>{
    (async()=>{
      try {
        const response = await RestService.getAllLoansForApplicant(localStorage.getItem("token")||"",applicantId || "");
        if(response.data){
          setLoans(response.data);
        }else{
          navigate("/applicant/"+applicantId+"/loan/new");
        }
      } catch (error) {
        console.log(error);
      }
    })();
   
  },[]);

      return (<div>
<Box sx={{ width: '100%' }}>
    <Paper  sx={{ width: '100%', mb: 2 }}>
    <Grid container direction="row"
    justifyContent="center"
    alignItems="center">
      <Grid item xs={6}>
      <h2>Loan Details </h2>
      </Grid>
      <Grid item xs={6}>
      <Button onClick={createNewLoan}>Create New Loan</Button>
      </Grid>
      </Grid>

  <TableContainer>
          <Table aria-label="simple table"
            sx={{ minWidth: 600 ,margin: "auto"}}
            aria-labelledby="tableTitle"
           
          >
        <TableHead>
        <TableRow>
            <TableCell  width="20%" align="left" >Loan Id</TableCell>
            <TableCell  width="20%" align="left">Loan Type</TableCell>
            <TableCell  width="20%" align="left">Loan Amount</TableCell>
            <TableCell  width="20%" align="left">Paid Amount</TableCell>
            <TableCell  width="20%" align="left">Due Amount</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {loans.map((row) => (
            <TableRow key={row.id}><TableCell width="20%" align="center" component="th" padding="none" scope="row">{row.id}</TableCell>
            <TableCell  width="20%" align="center">{row.loanType}</TableCell>
            <TableCell  width="20%" align="center">{row.amount}</TableCell>
            <TableCell  width="20%" align="center">{row.paidAmount}</TableCell>
            <TableCell  width="20%" align="center">{row.dueAmount}</TableCell>
            </TableRow>
        ))}
            </TableBody>
</Table>
    </TableContainer>
        </Paper>
        </Box></div>
      );

    
}

export default ApplicantLoansList;