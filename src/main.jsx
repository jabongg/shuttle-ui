import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
      <StrictMode>
          <GoogleOAuthProvider clientId="213622836179-i9suleorjuh54qp9enfqm6q7vc8rbi0d.apps.googleusercontent.com">
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </GoogleOAuthProvider>
    </StrictMode>
);
