import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import { PawIcon, MenuIcon, CloseIcon, LogoutIcon } from "../icon";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/konsultasi", label: "Konsultasi" },
  { to: "/hewan", label: "HewanKu", role: "pelanggan" },
  { to: "/praktek", label: "PraktekKu", role: "dokter" },
  { to: "/riwayat-pembayaran", label: "Riwayat Pembayaran", role: "pelanggan" },
  { to: "/riwayat-pembayaran", label: "Riwayat Pembayaran", role: "dokter" },
  { to: "/artikel", label: "Artikel" },
];

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, message } = useSelector((state) => state.user);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, setMenuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const visibleLinks = NAV_LINKS.filter(
    (link) => !link.role || link.role === user?.role,
  );

  const firstName = user?.username ? user.username.split(" ")[0] : "";
  const initial = firstName ? firstName.charAt(0).toUpperCase() : "?";

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      className={`sticky top-0 z-50 bg-[#FBF8F2]/90 backdrop-blur-sm font-jakarta mb-4 ${menuOpen ? "" : "border-b border-[#E4E0D6]"}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/"
          className="flex items-center gap-2 shrink-0"
        >
          <PawIcon size={26} className="text-[#F0A93B]" />
          <span className="font-fredoka text-xl text-[#1E3A34] font-semibold">
            PetKu
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {visibleLinks.map((link) => (
            <li key={link.to}>
              <Link
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(link.to)
                    ? "text-[#1E3A34] bg-[#EAF2E9]"
                    : "text-[#6B7280] hover:text-[#1E3A34] hover:bg-[#EAF2E9]/60"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <Link
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                to="/setting"
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-[#EAF2E9] transition"
              >
                <span className="w-8 h-8 rounded-full bg-[#F0A93B] text-white flex items-center justify-center text-sm font-fredoka font-semibold">
                  {initial}
                </span>
                <span className="text-sm font-medium text-[#1E3A34]">
                  {firstName}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-[#1E3A34] border border-[#1E3A34]/20 hover:bg-[#1E3A34] hover:text-white transition rounded-xl px-4 py-2"
              >
                <LogoutIcon size={15} />
                Logout
              </button>
            </>
          ) : (
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to="/login"
              className="text-sm font-semibold text-white bg-[#F0A93B] hover:bg-[#DD9A30] transition rounded-xl px-5 py-2.5"
            >
              Masuk
            </Link>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-lg text-[#1E3A34] hover:bg-[#EAF2E9] transition"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div
            className="fixed inset-0 bg-[#1E3A34]/50 transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          <nav className="fixed top-0 right-0 bottom-0 h-dvh w-[80%] max-w-xs py-6 px-6 bg-[#FBF8F2] shadow-2xl flex flex-col overflow-y-auto z-50">
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={() => {
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <PawIcon size={24} className="text-[#F0A93B]" />
                <span className="font-fredoka text-lg text-[#1E3A34] font-semibold">
                  PetKu
                </span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-lg text-[#6B7280] hover:bg-[#EAF2E9] transition"
                aria-label="Close menu"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            {user && (
              <div className="flex items-center gap-3 mb-6 px-2">
                <span className="w-10 h-10 rounded-full bg-[#F0A93B] text-white flex items-center justify-center font-fredoka font-semibold shrink-0">
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-[#6B7280]">Halo,</p>
                  <p className="font-semibold text-[#1E3A34] truncate">
                    {firstName}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              {visibleLinks.map((link) => (
                <Link
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive(link.to)
                      ? "text-[#1E3A34] bg-[#EAF2E9]"
                      : "text-[#6B7280] hover:bg-[#EAF2E9]/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <Link
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  to="/setting"
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive("/setting")
                      ? "text-[#1E3A34] bg-[#EAF2E9]"
                      : "text-[#6B7280] hover:bg-[#EAF2E9]/60"
                  }`}
                >
                  Pengaturan
                </Link>
              )}
            </div>

            <div className="mt-auto pt-6">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium text-[#1E3A34] border border-[#1E3A34]/20 hover:bg-[#1E3A34] hover:text-white transition rounded-xl px-4 py-2.5"
                >
                  <LogoutIcon size={15} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center text-sm font-semibold text-white bg-[#F0A93B] hover:bg-[#DD9A30] transition rounded-xl px-4 py-2.5"
                >
                  Masuk
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
