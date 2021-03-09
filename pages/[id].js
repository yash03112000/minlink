import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, {useState,useEffect} from 'react';
import {List,ListItem,ListItemText,ListItemIcon,Card,CardContent,Typography,Modal,Backdrop,Fade,TextField,Button,FormControl,Select,InputLabel,MenuItem} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { server } from '../config';

const useStyles = makeStyles((theme) => ({

}));


export default function Dashboard(props) {



  const [title,setTitle] = useState('');
  const [id,setID] = useState('');
  const [password,setPassword] = useState('');
  const [status,setStatus] = useState('');
  const [link,setLink] = useState('');
  const [open,setOpen] = useState(false);
  const [openedit,setOpenedit] = useState(false);
  const [editdone,setEditdone] = useState(false);
  const [fine,setFine] = useState(true);
  const [editid,setEditid] = useState('');
  const [editdetail,setEditdetail] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();



  const classes = useStyles();



  useEffect(() => {
    setIsRefreshing(false);
  }, [props.data]);

  console.log(router.query);
    

  return (
    <div className={styles.container}>
      <Head>
        <title>Minlinks</title>
      </Head>
    
    {!isRefreshing?
      <main className={styles.main}>

      </main>:<h1>Loading..</h1>
      }
    </div>
  )
}


export async function getServerSideProps(ctx) {
    var res = await fetch(`${server}/Link/${ctx.params.id}`,{method:"GET",headers: ctx.req ? { cookie: ctx.req.headers.cookie,'User-Agent': '*' } : undefined});
    if(res.status===404){
        return {
            redirect: {
              destination: '/404',
              permanent: false,
            },
          }
    }
    var data = await res.json();
    if(data.status === 'Public'){
      return {
        redirect: {
          destination: data.link,
          permanent: false,
        },
      }
    }else if(data.status === 'Friends'){
        return {
          redirect: {
            destination: `/Flog/${ctx.params.id}`,
            permanent: false,
          },
        }
    }else{
      if(data.result === 'Success'){
        return {
          redirect: {
            destination: data.link,
            permanent: false,
          },
        }
      }else if(data.result === 'Reject'){
        return {
          redirect: {
            destination: `/401`,
            permanent: false,
          },
        }
      }else{
        return {
          redirect: {
            destination: `/`,
            permanent: false,
          },
        }
      }
    }
    if (!data) {
        return {
            notFound: true,
        }
    }    

    console.log(data);
    
    return {
      props: {data}, // will be passed to the page component as props
    }
  }