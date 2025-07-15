import { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../App.css";
import avatar from "../assets/images/avatar.png";

function NavigationBar({ user, setUser }) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCartPopover, setShowCartPopover] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const cartRef = useRef(null);

  let dropdownTimeout;

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setShowDropdown(false);
    }, 300);
  };

  useEffect(() => {
    if (user && sessionStorage.getItem("justLoggedIn") === "true") {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
        sessionStorage.removeItem("justLoggedIn");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowLogoutConfirm(false);
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setShowLogoutConfirm(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartPopover(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Navbar expand="lg" className="orange-navbar custom-navbar-padding sticky-top" style={{ zIndex: 999 }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-white">
          Creative Store
        </Navbar.Brand>

        <Nav className="mx-auto gap-4">
          <Nav.Link as={Link} to="/" className="nav-link-custom">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/category" className="nav-link-custom">
            Category
          </Nav.Link>
          <Nav.Link as={Link} to="/product" className="nav-link-custom">
            Product
          </Nav.Link>
        </Nav>

        <div className="d-flex align-items-center gap-3 position-relative">
          {/* Keranjang Popover */}
          <div
            ref={cartRef}
            className="position-relative cursor-pointer"
            onMouseEnter={() => setShowCartPopover(true)}
            onMouseLeave={() => setShowCartPopover(false)}
          >
            <FaShoppingCart size={20} color="white" />
            {showCartPopover && (
              <div className="cart-popover position-absolute end-0 mt-2">
                <p className="m-0">Keranjang masih kosong nih?</p>
              </div>
            )}
          </div>

          {/* Avatar & Dropdown */}
          {user ? (
            <div
              className="position-relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={avatarRef}
                className="d-flex align-items-center gap-2 cursor-pointer"
              >
                <img
                  src={avatar}
                  alt="User"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%" }}
                />
                <span className="navbar-welcome">{user.name}</span>
              </div>

              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="position-absolute end-0 mt-2 bg-white rounded shadow"
                  style={{ minWidth: "160px", zIndex: 999 }}
                >
                  <div className="popover-item" onClick={() => navigate("/akun")}>
                    Akun Saya
                  </div>
                  <div className="popover-item" onClick={() => navigate("/keranjang")}>
                    Keranjang Saya
                  </div>
                  <div className="popover-item" onClick={() => setShowLogoutConfirm(true)}>
                    Log out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link-custom">
                Login
              </Link>
              <Link to="/signup" className="nav-link-custom">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </Container>

      {/* Notifikasi Selamat Datang */}
      {showWelcome && user && (
        <div className="welcome-notification">Selamat datang, {user.name}</div>
      )}

      {/* Logout Konfirmasi Modal */}
      {showLogoutConfirm && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h5>Yakin nih mau log out? 🤔</h5>
            <div className="d-flex justify-content-center">
              <button className="btn btn-danger me-2" onClick={handleLogout}>
                Iya
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Enggak
              </button>
            </div>
          </div>
        </div>
      )}
    </Navbar>
  );
}

export default NavigationBar;
