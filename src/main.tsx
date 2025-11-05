// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// // ✅ PrimeReact imports
// import { PrimeReactProvider } from 'primereact/api'
// import 'primereact/resources/themes/lara-light-blue/theme.css'   // theme (you can change it)
// import 'primereact/resources/primereact.min.css'                 // core css
// import 'primeicons/primeicons.css'                               // icons
// import AppContextProvider from './context/AppContextProvider.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//  <AppContextProvider>

//       <App />
//  </AppContextProvider>
//   </StrictMode>,
// )
//

import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppContextProvider from "./context/AppContextProvider.tsx";
import "primereact/resources/themes/lara-light-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core
import "primeicons/primeicons.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>
);
