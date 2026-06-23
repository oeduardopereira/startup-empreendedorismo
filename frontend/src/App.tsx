import Navbar from "./components/NavBar/Navbar";
import Topbar from "./components/TopBar/Topbar";
import Investiments from "./pages/Investiments/Investiments";

function App() {

    return(

        <>
            <div className="flex bg-bg-blue overflow-hidden">
                <Navbar />
                <div className="flex-col w-[85%]">
                    <div className="w-full">
                        <Topbar />
                    </div>
                    <Investiments />
                </div>
                
            </div>
            
        
        </>

    );

}

export default App;