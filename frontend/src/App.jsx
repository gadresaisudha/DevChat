import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify"
import {Header} from './pages/Admin/Header'
import "react-toastify/dist/ReactToastify.css";
const App= () =>{

  return (
      <>
      <ToastContainer/>
      <Header/>
      <Outlet/>
      </>
  
  )
}

export default App
