import React, { useState, useEffect } from 'react'
import Input from '../Input'
import s from './style.module.css'

function LoginForm({onSubmit, isOpenModal}) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isSignin, setIsSignin] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit && onSubmit({
            email : email,
            password : password,
            isSignin : isSignin
        })
        setEmail('');
        setPassword('');
    }


    useEffect( () => {
        setEmail('');
        setPassword('');
    }, [isOpenModal])

    const onClickToggler = () => {
        setIsSignin(prev => !prev);
    }
    return (
        <form onSubmit={handleSubmit}>
            <Input value={email} label={'E-mail'} name='email' onChange={ (val) => setEmail(val.target.value)}/>
            <Input value={password} label={'Password'} name='password' type='password' onChange={ (val) => setPassword(val.target.value)}/>
            <div className={s.wrapper}>
                <button>
                    {
                        isSignin ? "Sign In" : "Sign Up"
                    }
                </button>
                <span
                    className={s.question}
                    onClick={onClickToggler}
                    >
                        {
                            isSignin ? "Register?" : "Login?"
                        }
                </span>
            </div>
        </form>
    )
}

export default LoginForm
