import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import React, {useState} from 'react';
import {TextField,Button,Typography} from '@material-ui/core';
import { useRouter } from 'next/router'
import { server } from '../../config';


export default function Home({data,a}) {

  const [Name,setName] = useState('');
  const [Password,setPassword] = useState('');
  const [status,setStatus] = useState(false);
  const [isWrong,setWrong] = useState(false);
  const router = useRouter()



  const login=(e)=>{
      e.preventDefault();
      fetch(`/Link/login`, {method: 'POST',headers: {
          'Content-Type': 'application/json'}, body: JSON.stringify({password:Password,id:a})})
          .then(res => {
              if(res.status === 200){
                res.json().then((res)=>{
                  if(res.status==='Failed'){
                    setWrong(true);
                  }else{
                    setWrong(false);
                      router.replace(res.link);
                  }
                })

              }
          })

    }








  return (
    <div className={styles.container}>
      <Head>
        <title>Minlinks</title>
      </Head>

      <main className={styles.main}>
        <div className= "container">
          <div className= "row">
            <div className= "col-8">
              <div className= "col-sm-8" style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                <Typography component="h4" color="primary" variant="h4" gutterBottom>
                  Enter Password for access to {data.username}'s {data.title}
                </Typography>
                  <form onSubmit={login}>
                    <div>
                      <TextField  type="password" required label="Password" name="Password" value={Password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div>
                      <Button color="primary" variant="contained" type="submit" style={{margin:20}} >SignIn</Button>
                    </div>
                  </form>
                  {isWrong?
                  <Typography component="span"  style={{color:'red'}} variant="span" gutterBottom>
                    Wrong Password
                </Typography>:<></>
                  }
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  )
}


export async function getServerSideProps(ctx) {
  var res = await fetch(`${server}/Link/Flog/${ctx.params.id}`,{method:"GET",headers: ctx.req ? { cookie: ctx.req.headers.cookie,'User-Agent': '*' } : undefined});
  if(res.status===404){
      return {
          redirect: {
            destination: '/404',
            permanent: false,
          },
        }
  }
  var data = await res.json();
  if (!data) {
      return {
          notFound: true,
      }
  }
  var a = ctx.params.id    

  // console.log(data);
  
  return {
    props: {data,a} // will be passed to the page component as props
  }
}
