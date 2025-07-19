import { Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./modules/login/pages/Login";
import Home from "./modules/home/pages/Home";
import AuthGuard from "./modules/auth/AuthGuard";
import Signup from "./modules/signup/pages/Signup";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
