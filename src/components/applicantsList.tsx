import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableHead';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import User from '../types/User';
import RestService from '../service/RestService';
import { useNavigate } from "react-router-dom";

const ApplicantsList = ()=>{

  const navigate = useNavigate();
  const [applicantList,setApplicantList] = React.useState<User[]>([]);
    function createData(
        id: number,
        name: string
      ) {
        return { id, name };
      }

    const rows = [
        createData(1,'Frozen yoghurt'),
        createData(2,'Ice cream sandwich')
      ];

      useEffect(()=>{
        (async()=>{
          try {
            const response = await RestService.getAllApplicants(localStorage.getItem("token")||"");
            setApplicantList(response.data);
          } catch (error) {
            console.log(error);
          }
        })();
       
      },[]);

      const viewLoans =(id:number | undefined) =>{
        navigate("/applicant/"+id+"/loans");

      }
      return (
<Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2 }}>
    <h2>Applicants Details</h2>
    <TableContainer>
          <Table aria-label="simple table"
            sx={{ minWidth: 500 ,margin: "auto"}}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
        <TableHead>
        <TableRow>
            <TableCell width="50%" align="left">Applicant Id</TableCell>
            <TableCell  width="50%" align="left">Applicant Name</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {applicantList.map((row) => (
            <TableRow key={row.id}><TableCell width="50%" align="left" component="th" scope="row">{row.id}</TableCell>
            <TableCell  width="50%" align="left">{row.name}</TableCell>
            <TableCell><Button variant="text" startIcon={<VisibilityIcon />} onClick={()=>viewLoans(row.id)}>
        View
      </Button></TableCell>
            </TableRow>
        ))}
            </TableBody>
</Table>
</TableContainer>
        </Paper>
        </Box>
      );

    

}

export default ApplicantsList;