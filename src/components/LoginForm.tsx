import * as React from 'react'; 
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import RestService from '../service/RestService';
import { useNavigate } from "react-router-dom";

const LoginForm=()=>{
  const [name,setName]=React.useState('');
  const [password,setPassword]=React.useState('');
  const navigate = useNavigate();
  const onChangeName = (e:any)=>{
    setName(e.target.value);
  }
  const onChangePass = (e:any)=>{
    setPassword(e.target.value);
  }
  const login = ()=>{
    (async()=>{
      try{
        const user = {name:name,password:password}
        const response = await RestService.login(user);
        
        console.log(response.data);
        if("BANK"===response.data.user.role){
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("bankUserId",(response.data.user.id || "").toString() );
            navigate("/dashboardBank");
        }
      }catch(error){

      }
    })();
  }
    return( <Card sx={{ maxWidth: 345,color:'blue' }}>
            <CardHeader
             avatar={
                <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                  <PersonIcon/>
                </Avatar>
              }
            sx={{
                color:'green'
            }}
        title="MyBank Login"
       
      />
<CardContent>
<TextField id="outlined-basic" label="User Name" onChange={onChangeName} variant="outlined" fullWidth sx={{
mb:2
}}/>
 <TextField
 onChange={onChangePass}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          fullWidth
        />

</CardContent>
<CardActions>
<Button onClick={login} sx={{color:green[500]}} variant="outlined" fullWidth>Login</Button>
</CardActions>
    </Card>);
};

export default LoginForm;