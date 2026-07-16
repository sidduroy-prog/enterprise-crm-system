import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "sales_rep" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={styles.input} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} required />
        <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
          <option value="sales_rep">Sales Rep</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={styles.button}>Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f1f5f9" },
  form: { background: "#fff", padding: "32px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", width: "320px", display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid #cbd5e1" },
  button: { padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  error: { color: "#ef4444", fontSize: "14px" },
};

export default Register;
