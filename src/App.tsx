
import AppRouter from "./router";
import { Toaster } from "react-hot-toast";


// import { lazy } from 'react';

// const MarkdownPreview = lazy(() => import('/src/modules/landing/LandingPage.tsx'));

function App() {



  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <AppRouter />
    </>
  );
}

export default App;
