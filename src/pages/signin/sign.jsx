
import { useNavigate } from 'react-router-dom'
import styles from './signin.module.css'

import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import Swal from 'sweetalert2'

const SignIn = () => {
  const [name, setName] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const singnUp_for_text = async (e) => {
    e.preventDefault();
    await localStorage.setItem('data',name)
    Swal.fire({
    icon:'success',
    title:'successfully logged In !!'
    })
    navigate('/dashboard')
  }
  
  return (
    <div className={styles.container}>
        <form className={styles.form} autoComplete="off" onSubmit={singnUp_for_text}>

            <div className={styles.text}>Sign In </div>
            <center className={styles.email}>
                <TextField label='Name' type='text' value={name}
                 onChange={(e) => setName(e.target.value)} required/>
            </center>

            <center className={styles.password}>
                <TextField  label='Password' type='password' value={password}
                 onChange={(e) => setPassword(e.target.value)} required/>
            </center>

            <center className={styles.btn}>
                <Button type='submit' style={{color:'white',backgroundColor:"red"}}>Sign in</Button>
            </center>
            
        </form>
    </div>
  )
}

export default SignIn;