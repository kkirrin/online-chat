import React from 'react'
import styles from '../style/Main.module.css'

import { Link } from 'react-router-dom'
import { useState } from 'react'

const Main = () => {
  const fields = {
    USERNAME: 'username',
    ROOM: 'room'
  }
  const { USERNAME, ROOM} = fields
  const [values, setValues] = useState({[USERNAME]:'', [ROOM]:''})

  const handleChange = ({target: {value, name}}) => {
    setValues({...values, [name]: value})
  }

  const handleClick = (e) => {
    const isDisable = Object.values(values).some((value) => !value)

    if(isDisable) e.preventDefault()
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}> Join </h1>
        <form className={styles.form}>
          <div className={styles.group}>

              <input 
                type='text' 
                placeholder='Your name'
                name='username' 
                value={values[USERNAME]}
                className={styles.input} 
                onChange={handleChange} 
                autoComplete='off'
                required
              />
          </div>
          <div className={styles.group}>
          <input 
            type='text' 
            placeholder='Your room'
            name='room' 
            value={values[ROOM]} 
            className={styles.input} 
            onChange={handleChange} 
            autoComplete='off'
          />
          </div>
          
          <Link 
            className ={styles.group} 
            to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`}
            onClick={handleClick}
          >
              <button type='submit' className={styles.button} onChange={() => setValues()}>Войти</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Main