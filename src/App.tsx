import { useState, useEffect } from "react";
import "./App.css";
import SignInPage from "./pages/google-auth-page-fixed";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrandGuidelinesSetup from "./pages/brand-guidelines-setup-updated";
import ContentUploadScreen from "./pages/content-upload-screen";
import MarketingFlow from "./pages/marketing-flow";
import StrategySelection from "./pages/strategy-selection-screen";
import ChannelSelection from "./pages/channel-selection-screen";
import Dashboard from "./pages/refined-marketing-dashboard";
import Output from "./pages/output";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route  path="/guidlines" Component={BrandGuidelinesSetup} />
          <Route  path="/content-upload" Component={ContentUploadScreen} />
          <Route  path="/marketing" Component={MarketingFlow} /> 
          <Route  path="/channels" Component={ChannelSelection} />
          <Route  path="/strategy" Component={StrategySelection} />
          <Route  path="/" Component={Dashboard} />
          <Route  path="/login" Component={SignInPage} />
          <Route  path="/output" Component={Output} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
