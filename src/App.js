import React from "react";
import { QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Eror from "./Pages/Eror";
import Navbar from "./Components/Navbar";
import Detail from "./Components/Detail";
import queryClient from "./query";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <Navbar />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="Detail/:id" element={<Detail />} />
          <Route path="*" element={<Eror />} />
        </Routes>
      </main>
    </QueryClientProvider>
  );
};

export default App;
