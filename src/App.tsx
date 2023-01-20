import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import { useState, useEffect } from "react";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          element={
            <Layout
              open={open}
              handleClickOpen={handleClickOpen}
              setOpen={setOpen}
            />
          }
        >
          <Route index path="/" element={<Home open={open} />} />
          <Route index path="/search" element={<Search open={open} />} />
          <Route index path="/watch/:id" element={<Watch open={open} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
