import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter } from 'react-router-dom'
import Header from './layout/Header'
import AppRouter from './layout/AppRouter'
import { Base_URL } from './contexts/UrlContext'
import { LoginStateProvider } from './contexts/LoginStateContext'
import Footer from './layout/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Base_URL.Provider value="http://localhost:81">
        <LoginStateProvider>
          
          <Header></Header>
          
          <AppRouter></AppRouter>

          <Footer></Footer>

        </LoginStateProvider>
      </Base_URL.Provider>
     </BrowserRouter>
    </>
  )
}

export default App
