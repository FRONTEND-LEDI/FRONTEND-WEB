import AppRouter from "./router";
import { Toaster } from "react-hot-toast";
import Navbar from './common/components/navbar';

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRouter />
      <Navbar/>
      
    </>
  );
}

export default App;