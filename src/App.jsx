import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Page/Home'
import TextEditor from './Page/TextEditor'
import Documents from './Page/Documents'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" index element={<Home /> } />
          <Route path="/document/:id"  element={<TextEditor /> } />
          <Route path="/documents"  element={<Documents /> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
