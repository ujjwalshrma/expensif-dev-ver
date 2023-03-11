import styles from './UserName.module.css'

import { useState, useEffect } from "react"

import logo from '../../../public/nobg-logo.svg'

const UserName = ({ userName }) => {
    const [enteredName, setEnteredName] = useState('')

    useEffect(() => {
        const storedUserName = JSON.parse(localStorage.getItem('name'))

        if (storedUserName) {
            localStorage.setItem('name', JSON.stringify(storedUserName))
            setEnteredName(storedUserName)
            userName(storedUserName)
        }
    }, [])

    const onEnteredNameHandler = (event) => {
        setEnteredName(event.target.value)
    }

    const onEnteredNameSubmit = (event) => {
        event.preventDefault()

        const firstName = enteredName.split(' ')[0]
        userName(firstName)
    }

    return (
        <>
            <div className={styles.logo__wrapper}>
                <img className={styles.logo} src={logo} alt="logo" />
            </div>
            <div className={styles.name__form__card}>
                <form onSubmit={onEnteredNameSubmit}>
                    <label className={styles.form__input__label}>Please Enter your name</label>
                    <input className={styles.input} type="name" onChange={onEnteredNameHandler} value={enteredName} />
                    <button type="submit">Add Account</button>
                </form>
            </div>
        </>
    )
}

export default UserName
