import s from './style.module.css'
import cn from 'classnames';

function Input({label,value,type='text',name, required, onChange}) {
    
    const onLocalChange = (event) => {
        onChange && onChange(event);
    }
    return (
        <div className={s.root} name={name}>
            <input value={value} type={type} className={cn(s.input, {[s.valid] : value})} required onChange={onLocalChange}/>
            <span className={s.highlight}></span>
            <span className={s.bar}></span>
            <label className={s.label}>{label}</label>
        </div>
    )
}

export default Input;
