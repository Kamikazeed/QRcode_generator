import './App.css'
import Generator from './component/Generator'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Generator />
    </>
  )
}

export default App
