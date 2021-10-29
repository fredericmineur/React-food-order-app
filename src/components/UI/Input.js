import React from 'react';
import styles from './Input.module.css'

const Input = (props) => {
    return <div className={styles.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={props.inputRef} {...props.input}/>
    </div>
}

export default Input;