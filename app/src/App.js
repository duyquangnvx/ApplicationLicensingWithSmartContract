import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PurchasePage from "./pages/purchase/PurchasePage";
import HomePage from "./pages/home/HomePage";

function App() {


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/purchase" element={<PurchasePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
