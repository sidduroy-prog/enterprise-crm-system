import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>CRM System</div>
      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/leads" style={styles.link}>Leads</Link>
        <Link to="/deals" style={styles.link}>Deals</Link>
      </div>
      <div style={styles.userInfo}>
        <span>{user.name} ({user.role})</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#1e293b",
    color: "#fff",
  },
  logo: { fontWeight: "bold", fontSize: "18px" },
  links: { display: "flex", gap: "20px" },
  link: { color: "#cbd5e1", textDecoration: "none" },
  userInfo: { display: "flex", alignItems: "center", gap: "12px" },
  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Navbar;
