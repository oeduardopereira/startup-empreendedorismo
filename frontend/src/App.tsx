import Navbar from "./components/NavBar/Navbar";
import Topbar from "./components/TopBar/Topbar";
import Investiments from "./pages/Investiments/Investiments";

function App() {

    return(

        <>
            <div className="flex">
                <Navbar />
                <div className="flex-col">
                    <div className="w-screen">
                        <Topbar />
                    </div>
                    <Investiments />
                </div>
                
            </div>
            
        
        </>

    );

}

export default App;