
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Main, Messages, Chat } from '../pages'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Main /> }/>
      <Route path='/messages' element={<Messages /> }/>
      <Route path='/chat' element={<Chat /> }/>
    </Routes>
  )
}

export default AppRouter