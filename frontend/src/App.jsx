import { Outlet } from "react-router"
import { Header } from "./pages/Header"

const App= () =>{

  return (
      <>
      <Header/>
      <Outlet/>
      </>
  
  )
}

export default App
