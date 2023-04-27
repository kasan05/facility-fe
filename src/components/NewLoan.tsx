import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import { useParams,useNavigate} from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import RestService from '../service/RestService';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';

const NewLoan =()=>{
    let {applicantId} = useParams();
    const[loanType,setLoanType] = React.useState("");
    const[amount,setAmount] = React.useState("");
    const navigate = useNavigate();
    const onLoanTypeChange =(e:any)=>{
        setLoanType(e.target.value);
    }
    const onAmountChange = (e:any)=>{
        setAmount(e.target.value);
      }
    const createNewLoan = ()=>{
        (async()=>{
            try{
                const bankId  = localStorage.getItem("bankUserId");
                const loan = {
                    loanType:loanType,
                    amount:Number(amount),
                    bankId:Number(bankId),
                    applicantId:Number(applicantId)
                } 
              const response = await RestService.createLoanForNonExistingFacility(localStorage.getItem("token")||"",loan);     
            }catch(error){
                console.log(error);
            }
          })();
        
    }
    return(
<Card sx={{ maxWidth: 345,color:'blue' }}>
    <CardHeader
     avatar={
        <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
          <MonetizationOnIcon/>
        </Avatar>
      }
    sx={{
        color:'green'
    }}
title="New Loan"

/>
<CardContent>
<Box sx={{ minWidth: 120,mb:2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={loanType}
          label="Age"
          onChange={onLoanTypeChange}
        >
          <MenuItem value={"MORTGAGE"}>Mortgage Loan</MenuItem>
          <MenuItem value={"PERSONAL"}>Personal Loan</MenuItem>
          <MenuItem value={"STUDY"}>Study Loan</MenuItem>
        </Select>
      </FormControl>
    </Box>
<TextField
  label="Amount"
  type="number"
  fullWidth
  onChange={onAmountChange}
/>

</CardContent>
<CardActions>
<Button onClick={createNewLoan} sx={{color:green[500]}} variant="outlined" fullWidth>Create</Button>
</CardActions>
</Card>
    );
}

export default NewLoan;  
   