import "./App.css";

import React, { Suspense } from "react";

import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";

const Home = React.lazy(() => import("./pages/Home"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
        <header className="header">
          <Header />
        </header>
        <main className="main">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home title="HOME" />} />
              <Route path="/none" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="footer">It is ©2018 Created by BT Inc</footer>
      </div>
    </>
  );
}

export default App;
