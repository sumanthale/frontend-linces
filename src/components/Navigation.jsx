import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Globe, Package, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import UserMenu from "./UserMenu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { isAuthenticated, logout, isAdmin, user } = useAuth();
  const { getCartItemsCount } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-semibold tracking-tight text-gray-900 group-hover:opacity-80 transition">
              Linces'CKF
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
            {["home", "products", "services", "about", "contact"].map((item) => (
              <Link
                key={item}
                to={item === "home" ? "/" : `/${item}`}
                className="relative text-gray-600 hover:text-black transition"
              >
                {t(`nav.${item}`)}

                {/* underline animation */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-3">

            {/* LANGUAGE */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition text-sm"
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>

            {/* USER ACTIONS */}
            {isAuthenticated && !isAdmin() && (
              <>
                {user?.accountType === "customer" && (
                  <>
                    {/* CART */}
                    <Link
                      to="/cart"
                      className="relative p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <ShoppingCart size={22} />

                      {getCartItemsCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                          {getCartItemsCount()}
                        </span>
                      )}
                    </Link>

                    {/* ORDERS */}
                    <Link
                      to="/orders"
                      className="hidden md:flex p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <Package size={22} />
                    </Link>
                  </>
                )}

                {user?.accountType === "brand" && (
                  <Link
                    to="/quotes"
                    className="hidden md:flex p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <FileText size={22} />
                  </Link>
                )}
              </>
            )}

            {/* AUTH */}
            {isAuthenticated ? (
              isAdmin() ? (
                <>
                  <Link
                    to="/admin/products"
                    className="hidden md:block px-4 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition"
                  >
                    {t("nav.admin")}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="hidden md:block text-sm text-gray-600 hover:text-black transition"
                  >
                    {t("nav.logout")}
                  </button>
                </>
              ) : (
                <div className="hidden md:block">
                  <UserMenu />
                </div>
              )
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:block text-sm text-gray-600 hover:text-black transition"
                >
                  {t("nav.login")}
                </Link>

                <Link
                  to="/register"
                  className="hidden md:block px-4 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition"
                >
                  {t("nav.register")}
                </Link>
              </>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 space-y-3 bg-white border-t">

          {["home", "products", "services", "about", "contact"].map((item) => (
            <Link
              key={item}
              to={item === "home" ? "/" : `/${item}`}
              onClick={toggleMenu}
              className="block text-gray-700 py-2 hover:text-black transition"
            >
              {t(`nav.${item}`)}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              {user?.accountType === "customer" && !isAdmin() && (
                <Link to="/orders" onClick={toggleMenu} className="block py-2">
                  My Orders
                </Link>
              )}

              {user?.accountType === "brand" && !isAdmin() && (
                <Link to="/quotes" onClick={toggleMenu} className="block py-2">
                  My Quotes
                </Link>
              )}

              {isAdmin() && (
                <Link
                  to="/admin/products"
                  onClick={toggleMenu}
                  className="block py-2"
                >
                  {t("nav.admin")}
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 text-gray-700"
              >
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="block py-2">
                {t("nav.login")}
              </Link>

              <Link to="/register" onClick={toggleMenu} className="block py-2">
                {t("nav.register")}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;