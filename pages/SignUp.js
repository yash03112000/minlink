import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, {useState} from 'react';
import {TextField,Button,Typography} from '@material-ui/core';
import { useRouter } from 'next/router'
export default function SignUp() {



  const [Name,setName] = useState('');
  const [Password,setPassword] = useState('');
  const [status,setStatus] = useState(false);
  const router = useRouter()


  const login=(e)=>{
      e.preventDefault();
      fetch(`/SignUp`, {method: 'POST',headers: {
          'Content-Type': 'application/json'}, body: JSON.stringify({username:Name,password:Password})})
          .then(res =>{
              if(res.status === 200){
                  router.push('/')
              }
          })
          .catch((err)=>{throw err})

    }
    

  return (
    // status?<Link href="/"></Link>:
    <div className={styles.container}>
      <Head>
        <title>Minlinks</title>
      </Head>

      <main className={styles.main}>
        <div className= "container">
          <div className= "row">
            <div className= "col-8">
              <div className= "col-sm-8">
                <Typography component="h4" color="primary" variant="h4" gutterBottom>
                  SignUp
                </Typography>
                  <form onSubmit={login}>
                    <div>
                      <TextField  type="username" required label="Username" name="username" autoFocus value={Name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div>
                      <TextField  type="password" required label="Password" name="Password" value={Password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div>
                      <Button color="primary" variant="contained" type="submit" style={{margin:20}} >SignUp</Button>
                    </div>
                  </form>
                  <Typography component="h4" color="primary" variant="subtitle1" gutterBottom>Already a User?Sign In <Link href="/" >Here</Link></Typography>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  )
}
