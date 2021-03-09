import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, {useState} from 'react';
import {TextField,Button,Typography} from '@material-ui/core';
import { useRouter } from 'next/router'

export default function Home() {








  return (
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
                  Access Denied
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  )
}
