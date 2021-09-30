import React, { useState } from 'react'
import Input from '../Input'

function LoginForm({onSubmit}) {
    const [email,setEmail] = useState(undefined);
    const [password,setPassword] = useState(undefined);

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit && onSubmit({
            email : email,
            password : password
        })
        setEmail(undefined);
        setPassword(undefined);
    }
    return (
        <form onSubmit={handleSubmit}>
            <Input value={email} label={'E-mail'} name='email' onChange={ (val) => setEmail(val.target.value)}/>
            <Input value={password} label={'Password'} name='password' type='password' onChange={ (val) => setPassword(val.target.value)}/>
            <button>
                Submit
            </button>
        </form>
    )
}

export default LoginForm
