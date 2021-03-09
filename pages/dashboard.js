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
    cardcon:{
        height:180,
        width:200
    },
    card:{
        cursor:'pointer'
    },
    icon:{
        height:'100%',
        width:'100%',
        color:'#1565c0'
    },
    text:{
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        fontSize:15,
        marginLeft:50

    },
    textdiv:{
        display:'flex',
        flexDirection:'row',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    green:{
        borderBottom:'green',
    },
    list:{
        width:'90vw',
        display:'flex',
        flexDirection:'column'
    },
    listitem:{
        width:'100%',
        backgroundColor:'#42a5f5',
        borderRadius:8,
        marginTop:3
    },
    listitemhead:{
        width:'100%',
        backgroundColor:'#e3f2fd',
        marginTop:3
        // borderRadius:8
    }
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



  const add=(e)=>{
      e.preventDefault();
      fetch(`/User/add`, {method: 'POST',headers: {
          'Content-Type': 'application/json'}, body: JSON.stringify({title,status,password,id,link})})
          .then(res => {
              if(res.status === 200){
                setOpen(false);
                router.replace(router.asPath);
                setTitle('')
                setID('');
                setPassword('')
                setStatus('')
                setLink('')
                setIsRefreshing(true);
              }else if(res.status === 401){
                  router.replace('/')
              }
          })
    }

    const idcheck = (e)=>{
        // setFine(false);
        fetch(`/User/IDcheck`, {method: 'POST',headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({id:e.target.value})})
            .then(res => {
                if(res.status === 200){
                    res.json().then((res)=>{
                        if(res.status){
                            setFine(true);
                            setID(e.target.value)
                            // setChecked(true);
                        }else{
                            setFine(false);
                            setID(e.target.value)

                            // setChecked(false);
                        }
                    })

                }else if(res.status === 401){
                    router.replace('/')
                }
            })


    }

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
        };

    const handleCloseedit = () => {
        setOpenedit(false);
        setEditdone(false);
        };
    const handleedit = ()=>{
        setEditdone(false);
        fetch(`/User/EditDetails`, {method: 'POST',headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({id:editid})})
            .then(res => {
                if(res.status === 200){
                    res.json().then((res)=>{
                        if(res.status==='Good'){
                            setEditdetail(res.link)
                            setTitle(res.link.title)
                            setStatus(res.link.status)
                            setID(res.link.uniqueid)
                            setLink(res.link.link)
                            // setPassword(res.link.password)
                            setEditdone(true);
                        }else{
                            // setFine(false);
                            // setChecked(false);
                        }
                    })

                }else if(res.status === 401){
                    router.replace('/')
                }
            })

    }    
    
    const edit=(e)=>{
        e.preventDefault();
        fetch(`/User/edit`, {method: 'PUT',headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({title,status,id,editid,link})})
            .then(res => {
                if(res.status === 200){
                    setOpenedit(false);
                    router.replace(router.asPath);
                    setIsRefreshing(true);
                }else if(res.status === 401){
                    router.replace('/')
                }
            })
      }

    const buttonfun = ()=>{
        if(fine&&title!==''&&id !==''&&status!==''&&link!==''){
            // console.log('here')
            if(status==='Friends'){
                if(password!==''){
                    return(
                        <Button color="primary" variant="contained" type="submit" style={{margin:20}} >Add</Button>
                    )
                }return <></>

            }return <Button color="primary" variant="contained" type="submit" style={{margin:20}} >Add</Button>
        }
        return <></>
    }
    const buttonfunedit = ()=>{
        if(fine&&title!==''&&id !==''&&status!==''&&link!==''){
            // console.log('here')
            return <Button color="primary" variant="contained" type="submit" style={{margin:20}} >Add</Button>
        }
        return <></>
    }
    
    const deletefun = (id)=>{
        fetch(`/User/delete`, {method: 'DELETE',headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({id})})
            .then(res => {
                if(res.status === 200){
                    router.replace(router.asPath);
                    setIsRefreshing(true);
                }else if(res.status === 401){
                    router.replace('/')
                }
            })
    }


  useEffect(() => {
    setIsRefreshing(false);
  }, [props.data]);
    

  return (
    <div className={styles.container}>
      <Head>
        <title>Minlinks</title>
      </Head>
    
    {!isRefreshing?
      <main className={styles.main}>
          <Card onClick={handleOpen} className={classes.card}>
              <CardContent className={classes.cardcon}>
                <AddCircleOutlineIcon className={classes.icon} />
              </CardContent>
              <div className={classes.textdiv}>
                  <Typography component="span" variant="subtitle1" className={classes.text} >Add Link</Typography>
              </div>
          </Card>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
            <Fade in={open}>
            <Card className={classes.paper}>
                <CardContent>
                <div >
                    <Typography component="h4" color="primary" variant="h4" gutterBottom>
                        Add Link
                    </Typography>
                    <form onSubmit={add}>
                        <div>
                            <TextField  type="username" required label="Title" name="title" autoFocus  onChange={(e)=>setTitle(e.target.value)}/>
                        </div>
                        <div>
                            <TextField  type="username" required label="UniqueId" name="Id"  onChange={(e)=>idcheck(e)} error={!fine} className={classes.green}  helperText={!fine?"Already Taken!":''} />
                        </div>
                        <div>
                            <TextField  type="username" required label="Link" name="Link"  onChange={(e)=>setLink(e.target.value)}  />
                        </div>
                        <FormControl className={classes.formControl} required>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue=""
                                onChange={(e)=>{setStatus(e.target.value)}}
                            >
                                <MenuItem value="Private">Private</MenuItem>
                                <MenuItem value="Friends">Friends</MenuItem>
                                <MenuItem value="Public">Public</MenuItem>
                            </Select>
                        </FormControl>
                        {status==='Friends'?
                            <div>
                                <TextField  type="password" required label="Password" name="Password"  onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            :<></>}
                        <div>
                            {
                                buttonfun()
                            }
                        </div>
                    </form>
                </div>
                </CardContent>
            </Card>
            </Fade>
        </Modal>

        <List component="ul" className={classes.list}>
            <ListItem className={classes.listitemhead} component="li">
                <ListItemText>
                    Title
                </ListItemText>
                <ListItemText>
                    UniqueId
                </ListItemText>
                <ListItemText>
                    Status
                </ListItemText>
                <ListItemIcon >

                </ListItemIcon>
                <ListItemIcon>

                </ListItemIcon>
            </ListItem>
            {props.data.links.map((link,i)=>{
                return(
                    <ListItem className={classes.listitem} component="li" key={i}>
                        <ListItemText>
                            {link.title}
                        </ListItemText>
                        <ListItemText>
                            {link.uniqueid}
                        </ListItemText>
                        <ListItemText>
                            {link.status}
                        </ListItemText>
                        <ListItemIcon >
                            <Button onClick={()=>{setEditid(link._id); setOpenedit(true)}}>
                                <EditTwoToneIcon className={classes.editicon} />
                            </Button>
                        </ListItemIcon>
                        <ListItemIcon>
                            <Button onClick={()=>{deletefun(link._id)}}>
                                <DeleteTwoToneIcon />
                            </Button>
                        </ListItemIcon>
                    </ListItem>
                )
            })}

        </List>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openedit}
            onRendered={handleedit}
            onClose={handleCloseedit}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
            <Fade in={openedit}>
            <Card className={classes.paper}>
                {editdone?
                <CardContent>
                <div >
                    <Typography component="h4" color="primary" variant="h4" gutterBottom>
                        Edit Link
                    </Typography>
                    <form onSubmit={edit}>
                        <div>
                            <TextField  type="username" required label="Title" name="title" autoFocus defaultValue={editdetail.title}  onChange={(e)=>setTitle(e.target.value)}/>
                        </div>
                        <div>
                            <TextField  type="username" required label="UniqueId" name="Id"  defaultValue={editdetail.uniqueid} onChange={(e)=>idcheck(e)} error={!fine} className={classes.green}  helperText={!fine?"Already Taken!":''} />
                        </div>
                        <div>
                            <TextField  type="username" required label="Link" name="Link" autoFocus defaultValue={editdetail.link}  onChange={(e)=>setLink(e.target.value)}/>
                        </div>
                        <FormControl className={classes.formControl} required>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(e)=>{setStatus(e.target.value)}}
                                defaultValue={editdetail.status}
                            >
                                <MenuItem value="Private">Private</MenuItem>
                                <MenuItem value="Friends">Friends</MenuItem>
                                <MenuItem value="Public">Public</MenuItem>
                            </Select>
                        </FormControl>
                        {/* {status==='Friends'?
                            <div>
                                <TextField  type="password" required label="Password" name="Password" defaultValue={editdetail.password}  onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            :<></>} */}
                        <div>
                            {
                                buttonfunedit()
                            }
                        </div>
                    </form>
                </div>
                </CardContent>:
                <Typography component="h4" color="primary" variant="h4" gutterBottom>
                    Loading...
                </Typography>
                }
            </Card>
            </Fade>
        </Modal>
      </main>:<h1>Loading..</h1>
      }


    </div>
  )
}


export async function getServerSideProps(ctx) {
    var res = await fetch(`${server}/User/Dashboard`,{method:"GET",headers: ctx.req ? { cookie: ctx.req.headers.cookie,'User-Agent': '*' } : undefined});
    if(res.status===401){
        return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          }
    }
    var data = await res.json()
    if (!data) {
        return {
            notFound: true,
        }
    }    

    // console.log(data);
    
    return {
      props: {data}, // will be passed to the page component as props
    }
  }