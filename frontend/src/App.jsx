import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/frontend/Home'
import About from './components/frontend/About'
import './assets/css/style.scss'
import Services from './components/frontend/Services';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/About' element={<About/>} />
      <Route path='/services' element={<Services/>} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
