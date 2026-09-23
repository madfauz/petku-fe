import { useState } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F2]">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main className="flex flex-col w-full items-center justify-start min-h-screen mx-auto mb-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
