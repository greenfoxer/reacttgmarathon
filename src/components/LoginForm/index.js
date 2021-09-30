import React, { useState } from 'react'
import Input from '../Input'
import s from './style.module.css'

function LoginForm({onSubmit}) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit && onSubmit({
            email : email,
            password : password
        })
        setEmail('');
        setPassword('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <Input value={email} label={'E-mail'} name='email' onChange={ (val) => setEmail(val.target.value)}/>
            <Input value={password} label={'Password'} name='password' type='password' onChange={ (val) => setPassword(val.target.value)}/>
            <div className={s.wrapper}>
                <button>
                    Submit
                </button>
                {/* <button className={s.buttonChange} onClick={console.log("click")}>
                    Change
                </button> */}
                <div onClick={console.log("click")}> 
                    <span/>
                </div>
            </div>
        </form>
    )
}

export default LoginForm
