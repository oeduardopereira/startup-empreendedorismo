import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Topbar from "./components/TopBar/Topbar";
import Home from "./pages/Home/Home";
import Finances from "./pages/Finances/Finances";
import Investiments from "./pages/Investiments/Investiments";

function App() {
    return(
        <BrowserRouter>
            <div className="flex bg-bg-blue overflow-hidden">
                <div className="h-screen w-[230px]">
                    <Navbar />
                </div>
                <div className="flex-col w-[85%]">
                    <div className="w-full">
                        <Topbar />
                    </div>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/financas" element={<Finances />} />
                        <Route path="/investimentos" element={<Investiments />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
