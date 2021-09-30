import React, { useState } from 'react'
import s from './style.module.css'

function Input({label,value,type='text',name, required, onChange}) {
    
    const onLocalChange = (event) => {
        onChange && onChange(event.target.value);
    }
    return (
        <div className={s.root} name={name}>
            <input value={value} type={type} className={s.input} required onChange={(e) => onChange && onChange(e)}/>
            <span className={s.highlight}></span>
            <span className={s.bar}></span>
            <label className={s.label}>{label}</label>
        </div>
    )
}

export default Input;
