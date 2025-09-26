import { useEffect } from "react";
import AppRouter from "./router";
import { Toaster } from "react-hot-toast";
import {io} from "socket.io-client"
const socket = io("http://localhost:3402")
// import { lazy } from 'react';

// const MarkdownPreview = lazy(() => import('/src/modules/landing/LandingPage.tsx'));

function App() {

  useEffect(() =>{
  socket.on("connect", () =>{
    console.log("conectado io");
  });
  return()=>{
    socket.disconnect();
  }
}, [])
  useEffect(() => {
  socket.on("new-message", (data) => {
    console.log(data);
  });

  return () => {
    socket.off("new-message");
  };
}, []);



  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <AppRouter />
    </>
  );
}

export default App;
