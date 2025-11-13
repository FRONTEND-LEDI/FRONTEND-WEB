
import AppRouter from "./router";
import { Toaster } from "react-hot-toast";

function App() {



  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <AppRouter />
    </>
  );
}

export default App;
