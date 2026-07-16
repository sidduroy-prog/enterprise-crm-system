import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const STATUS_OPTIONS = ["New", "Contacted", "Qualified", "Won", "Lost"];

const Leads = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "" });
  const [showForm, setShowForm] = useState(false);

  const fetchLeads = async () => {
    const { data } = await api.get("/leads");
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post("/leads", form);
    setForm({ name: "", company: "", email: "", phone: "" });
    setShowForm(false);
    fetchLeads();
  };

  const handleStatusChange = async (id, status) => {
    await api.put(`/leads/${id}`, { status });
    fetchLeads();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await api.delete(`/leads/${id}`);
    fetchLeads();
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Leads</h2>
          <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
            {showForm ? "Cancel" : "+ Add Lead"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} style={styles.form}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={styles.input} />
            <input name="company" placeholder="Company" value={form.company} onChange={handleChange} style={styles.input} />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} style={styles.input} />
            <button type="submit" style={styles.saveBtn}>Save Lead</button>
          </form>
        )}

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Status</th>
              {user.role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.company}</td>
                <td>{lead.email}</td>
                <td>
                  <select value={lead.status} onChange={(e) => handleStatusChange(lead._id, e.target.value)}>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                {user.role === "admin" && (
                  <td>
                    <button onClick={() => handleDelete(lead._id)} style={styles.deleteBtn}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "16px" }}>No leads yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  addBtn: { background: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" },
  form: { display: "flex", gap: "8px", margin: "16px 0", flexWrap: "wrap" },
  input: { padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" },
  saveBtn: { background: "#10b981", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" },
  deleteBtn: { background: "#ef4444", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "16px", background: "#fff" },
};

export default Leads;
