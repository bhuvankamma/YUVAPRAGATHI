import React, { useState, useEffect, useCallback } from "react";
import {
  FaTachometerAlt,
  FaPlus,
  FaBriefcase,
  FaBuilding,
  FaBars,
  FaTimes,
  FaUserTie,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// =================================================================
// API CONFIG
// =================================================================
const JOB_API_URL =
  "https://0qmiqmhmw3.execute-api.eu-north-1.amazonaws.com/prod";
const RECRUITER_API_URL =
  "https://fzg3o0pgy4.execute-api.eu-north-1.amazonaws.com/prod";
const ANALYTICS_API_BASE_URL =
  "https://azim0h8wr7.execute-api.eu-north-1.amazonaws.com/prod";

// Helper for job API
const jobApiRequest = async (method, path, body = null) => {
  const role = "employer";
  const headers = {
    "Content-Type": "application/json",
    "x-role": role,
  };
  const config = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
  try {
    const response = await fetch(`${JOB_API_URL}${path}`, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || data.detail || `HTTP ${response.status}`);
    }
    return data;
  } catch (err) {
    console.error("Job API error:", err);
    throw err;
  }
};

// Helper for recruiter API
const recruiterApiRequest = async (method, path, body = null) => {
  const role = "employer";
  const headers = {
    "Content-Type": "application/json",
    "x-role": role,
  };
  const config = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
  try {
    const response = await fetch(`${RECRUITER_API_URL}${path}`, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || data.detail || `HTTP ${response.status}`);
    }
    return data;
  } catch (err) {
    console.error("Recruiter API error:", err);
    throw err;
  }
};

// Helper for analytics
const analyticsApiRequest = async (path) => {
  const headers = { "Content-Type": "application/json" };
  try {
    const response = await fetch(`${ANALYTICS_API_BASE_URL}${path}`, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || data.detail || `HTTP ${response.status}`);
    }
    return data;
  } catch (err) {
    console.error("Analytics API error:", err);
    throw err;
  }
};

// =================================================================
// Utilities & styles
// =================================================================
const makeId = () => "id-" + Math.random().toString(36).slice(2, 9);

const formatDateTime = (isoString) => {
  if (!isoString) return "Not Available";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    console.error("Invalid date string:", isoString, e);
    return "Invalid Date";
  }
};

const buttonStyle = (type = "primary", full = false) => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: full ? "10px 14px" : "8px 10px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
    transition: "background 0.2s, color 0.2s",
  };
  if (type === "primary") return { ...base, background: "#2563eb", color: "#fff" };
  if (type === "danger") return { ...base, background: "#ef4444", color: "#fff" };
  if (type === "success") return { ...base, background: "#16a34a", color: "#fff" };
  if (type === "ghost") return { ...base, background: "transparent", color: "#334155", border: "1px solid #e2e8f0" };
  return base;
};

const labelStyle = { display: "block", marginBottom: 4, fontWeight: 700, color: "#334155" };
const inputStyle = { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 14 };
const thStyle = { padding: "10px 8px", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase" };
const tdStyle = { padding: "8px", fontSize: 14, color: "#1e293b" };

const SideItem = ({ label, icon, active, onClick, open }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
      borderRadius: 8,
      width: "100%",
      background: active ? "linear-gradient(90deg,#0ea5e9,#2563eb)" : "transparent",
      color: active ? "#fff" : "#cbd5e1",
      border: "none",
      cursor: "pointer",
      textAlign: "left",
    }}
  >
    <div style={{ width: 20 }}>{icon}</div>
    {open && <div style={{ fontWeight: 700 }}>{label}</div>}
  </button>
);

// =================================================================
// Subcomponents
// =================================================================

// Job post form
const JobPostForm = ({ companyProfile, editingJob, onSave, onCancel }) => {
  const initial = editingJob
    ? {
        ...editingJob,
        isExisting: true,
        skills: Array.isArray(editingJob.skills) ? editingJob.skills.join(", ") : editingJob.skills || "",
        salaryMin: editingJob.salaryMin !== undefined && editingJob.salaryMin !== null ? String(editingJob.salaryMin) : "",
        salaryMax: editingJob.salaryMax !== undefined && editingJob.salaryMax !== null ? String(editingJob.salaryMax) : "",
      }
    : {
        title: "",
        company: companyProfile.name,
        location: "",
        type: "Full-time",
        salaryMin: "",
        salaryMax: "",
        skills: "",
        description: "",
        contact: "",
        isExisting: false,
      };

  const [form, setForm] = useState(initial);

  useEffect(() => {
    setForm(initial);
  }, [editingJob, companyProfile.name]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.contact) {
      alert("Please fill Title, Location and Contact");
      return;
    }

    const job = {
      ...form,
      company: companyProfile.name,
      postedDate: form.postedDate || (editingJob ? editingJob.postedDate : new Date().toISOString()),
      salaryMin: Number(form.salaryMin) || 0,
      salaryMax: Number(form.salaryMax) || 0,
      skills: typeof form.skills === "string" ? form.skills.split(",").map((s) => s.trim()).filter(Boolean) : form.skills,
      id: form.id || makeId(),
    };

    onSave(job);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 18, borderRadius: 12, boxShadow: "0 8px 24px rgba(2,6,23,0.06)", maxWidth: 940 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Job Title</label>
          <input name="title" value={form.title} onChange={handleChange} style={inputStyle} placeholder="Senior Frontend Engineer" required />
        </div>
        <div>
          <label style={labelStyle}>Location</label>
          <input name="location" value={form.location} onChange={handleChange} style={inputStyle} placeholder="Bengaluru / Remote" required />
        </div>

        <div>
          <label style={labelStyle}>Type</label>
          <select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Contact Email (How to Apply)</label>
          <input name="contact" value={form.contact} onChange={handleChange} style={inputStyle} placeholder="careers@company.com" required />
        </div>

        <div>
          <label style={labelStyle}>Salary Min (LPA)</label>
          <input name="salaryMin" value={form.salaryMin} onChange={handleChange} style={inputStyle} type="number" placeholder="e.g. 10" />
        </div>

        <div>
          <label style={labelStyle}>Salary Max (LPA)</label>
          <input name="salaryMax" value={form.salaryMax} onChange={handleChange} style={inputStyle} type="number" placeholder="e.g. 15" />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Skills (comma separated)</label>
          <input name="skills" value={form.skills} onChange={handleChange} style={inputStyle} placeholder="React,Node.js,AWS" />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} style={{ ...inputStyle, minHeight: 120 }} />
        </div>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button type="submit" style={buttonStyle("primary", true)}>{editingJob ? "Update Job" : "Post Job"}</button>
        <button type="button" onClick={() => setForm(initial)} style={buttonStyle("ghost")}>Reset</button>
        {onCancel && <button type="button" onClick={onCancel} style={buttonStyle("ghost")}>Cancel</button>}
      </div>
    </form>
  );
};

// Manage jobs table
const ManageJobs = ({ jobs, onEdit, onDelete }) => (
  <div style={{ background: "#fff", padding: 12, borderRadius: 12, boxShadow: "0 8px 24px rgba(2,6,23,0.06)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <h3 style={{ margin: 0 }}>Job Postings</h3>
      <div style={{ color: "#64748b" }}>{jobs.length} records</div>
    </div>

    {jobs.length === 0 ? (
      <div style={{ color: "#64748b" }}>No job postings yet.</div>
    ) : (
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #eef2ff" }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Salary (LPA)</th>
              <th style={thStyle}>Posted (Date/Time)</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={tdStyle}>{j.title}</td>
                <td style={tdStyle}>{j.location}</td>
                <td style={tdStyle}>{j.type}</td>
                <td style={tdStyle}>{j.salaryMin || j.salaryMax ? `${j.salaryMin || 0} - ${j.salaryMax || 0}` : "Nego"}</td>
                <td style={tdStyle}>{formatDateTime(j.postedDate)}</td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onEdit(j)} style={buttonStyle("ghost")}><FaEdit /> Edit</button>
                    <button onClick={() => onDelete(j.id)} style={buttonStyle("danger")}><FaTrash /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

// Company profile form
const CompanyProfileForm = ({ profile, onSave }) => {
  const [form, setForm] = useState(profile);
  useEffect(() => setForm(profile), [profile]);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div style={{ background: "#fff", padding: 18, borderRadius: 12, boxShadow: "0 8px 24px rgba(2,6,23,0.06)", maxWidth: 920 }}>
      <h3>Company Profile</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Company Name</label>
          <input name="name" value={form.name || ""} onChange={change} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Location</label>
          <input name="location" value={form.location || ""} onChange={change} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Website</label>
          <input name="website" value={form.website || ""} onChange={change} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Contact Email</label>
          <input name="email" value={form.email || ""} onChange={change} style={inputStyle} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Description</label>
          <textarea name="description" value={form.description || ""} onChange={change} style={{ ...inputStyle, minHeight: 100 }} />
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => onSave(form)} style={buttonStyle("primary", true)}>Save Profile</button>
      </div>
    </div>
  );
};

// Recruiters
const RecruitersSection = ({ recruiters, onAdd, onRemove }) => {
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const add = async () => {
    if (!form.name || !form.email) return alert("Name & Email required");
    const ok = await onAdd(form);
    if (ok) setForm({ name: "", email: "", role: "" });
  };

  return (
    <div style={{ background: "#fff", padding: 16, borderRadius: 12, boxShadow: "0 8px 24px rgba(2,6,23,0.06)" }}>
      <h3>Recruiters</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={change} style={inputStyle} />
        <input name="email" placeholder="Email" value={form.email} onChange={change} style={inputStyle} />
        <input name="role" placeholder="Role" value={form.role} onChange={change} style={inputStyle} />
        <button onClick={add} style={buttonStyle("primary")}>Invite</button>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {recruiters.map((r) => (
          <div key={r.id} style={{ display: "flex", justifyContent: "space-between", padding: 10, borderRadius: 8, border: "1px solid #eef2ff" }}>
            <div>
              <div style={{ fontWeight: 800 }}>{r.name}</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>{r.role} • {r.email}</div>
            </div>
            <div>
              <button onClick={() => onRemove(r.id)} style={buttonStyle("danger")}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics
const AnalyticsSection = ({ analyticsData, isLoading, error }) => {
  const jobsByMonth = analyticsData.jobsByMonth || [];
  const recruiterActivity = analyticsData.recruiterActivity || [];
  const pieData = analyticsData.skillsDistribution || [];
  const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#7c3aed", "#0ea5e9"];

  if (isLoading) return <div style={{ padding: 20, textAlign: "center", color: "#64748b" }}>Loading analytics data...</div>;
  if (error) return <div style={{ padding: 20, textAlign: "center", color: "#b91c1c", background: "#fee2e2", borderRadius: 8 }}>Error fetching analytics: {error}</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
      <div style={{ background: "#fff", padding: 12, borderRadius: 12, boxShadow: "0 8px 24px rgba(2,6,23,0.06)" }}>
        <h3>Job Postings (last months)</h3>
        {jobsByMonth.length === 0 ? <div style={{ color: "#64748b", padding: "50px 0", textAlign: "center" }}>No job posting data available for the charts.</div> : (
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={jobsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_openings" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <h4>Recruiter Activity</h4>
          {recruiterActivity.length === 0 ? <div style={{ color: "#64748b", padding: "20px 0", textAlign: "center" }}>No recruiter activity data available for the charts.</div> : (
            <div style={{ width: "100%", height: 180 }}>
              <ResponsiveContainer>
                <BarChart data={recruiterActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total_activity" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div style={{ background: "#fff", padding: 12, borderRadius: 12, boxShadow: "0 8px 24px rgba(2,6,23,0.06)" }}>
        <h4>Skills Distribution</h4>
        {pieData.length === 0 ? <div style={{ color: "#64748b", padding: "80px 0", textAlign: "center" }}>No skills data yet.</div> : (
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

// Settings
const SettingToggle = ({ label, desc, checked, onToggle }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
    <div>
      <div style={{ fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 13, color: "#64748b" }}>{desc}</div>
    </div>
    <button onClick={onToggle} style={{ padding: "4px 8px", borderRadius: 999, background: checked ? "#10b981" : "#d1d5db", color: "#fff", border: "none", fontWeight: 700 }}>
      {checked ? "ON" : "OFF"}
    </button>
  </div>
);

const SettingSelect = ({ label, value, onChange, options }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
    <div>
      <div style={{ fontWeight: 700 }}>{label}</div>
    </div>
    <select value={value} onChange={onChange} style={{ ...inputStyle, width: "auto", padding: "6px 10px" }}>
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

// =================================================================
// Main EmployerDashboard
// =================================================================
const EmployerDashboard = () => {
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [companyProfile, setCompanyProfile] = useState({
    name: "YUVA SAATHI Employer",
    logoUrl: "https://i.ibb.co/GdsH6F1/logo.png",
    description: "Corporate platform connecting youth talent with leading enterprises.",
    website: "https://yuvasaathi.in",
    email: "contact@yuvasaathi.com",
    location: "Bengaluru, India",
  });

  const [jobPostings, setJobPostings] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  const [analyticsData, setAnalyticsData] = useState({ jobsByMonth: [], recruiterActivity: [], skillsDistribution: [] });
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState(null);

  const [settings, setSettings] = useState({ emailNotifications: true, twoFactorAuth: false, dashboardDensity: "comfortable" });

  // Logout handler
  const handleLogout = () => {
    // clear tokens etc if needed
    window.location.href = "https://www.yuvasaathi.in";
  };

  // Fetch jobs (reads posted_at)
  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await jobApiRequest("GET", "/Jobposting");
      console.log("Fetched jobs from backend:", data.jobs);
      if (Array.isArray(data.jobs)) {
        const mappedJobs = data.jobs.map((dbJob) => ({
          id: String(dbJob.id),
          title: dbJob.title,
          company: dbJob.company || companyProfile.name,
          location: dbJob.location || "N/A",
          type: dbJob.type || "Full-time",
          salaryMin: Number(dbJob.min_salary || dbJob.minSalary || dbJob.salary_min) || 0,
          salaryMax: Number(dbJob.max_salary || dbJob.maxSalary || dbJob.salary_max) || 0,
          skills: dbJob.skills ? (Array.isArray(dbJob.skills) ? dbJob.skills : String(dbJob.skills).split(",").map((s) => s.trim())) : [],
          description: dbJob.description || "",
          // Use posted_at (backend) or fallback keys if present
          postedDate: dbJob.posted_at || dbJob.postedAt || dbJob.posted_date || dbJob.created_at || null,
          contact: dbJob.how_to_apply || dbJob.howToApply || "N/A",
        }));

        // sort newest first, treat null as oldest
        mappedJobs.sort((a, b) => {
          const ta = a.postedDate ? new Date(a.postedDate).getTime() : 0;
          const tb = b.postedDate ? new Date(b.postedDate).getTime() : 0;
          return tb - ta;
        });

        setJobPostings(mappedJobs);
      } else {
        setJobPostings([]);
      }
    } catch (err) {
      console.error(err);
      setError(`Failed to fetch job postings. ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [companyProfile.name]);

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    setIsAnalyticsLoading(true);
    setAnalyticsError(null);
    try {
      const summary = await analyticsApiRequest("/analytics/summary");
      setAnalyticsData({
        jobsByMonth: summary.job_postings || [],
        recruiterActivity: summary.recruiter_activity || [],
        skillsDistribution: (summary.skill_distribution || []).map((s) => ({ name: s.skill, value: s.count })),
      });
    } catch (err) {
      console.error("Analytics fetch error:", err);
      setAnalyticsError(err.message);
    } finally {
      setIsAnalyticsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
    fetchAnalytics();
  }, [fetchJobs, fetchAnalytics]);

  useEffect(() => {
    // If company name changes, keep job company synced locally
    setJobPostings((prev) => prev.map((j) => ({ ...j, company: companyProfile.name })));
  }, [companyProfile.name]);

  // Save or update job
  const handleJobSave = async (job) => {
    setError(null);
    setIsLoading(true);

    // Build payload matching your Lambda: min_salary, max_salary, posted_at
    const body = {
      id: job.id && !isNaN(Number(job.id)) ? Number(job.id) : undefined,
      title: job.title,
      company: job.company || companyProfile.name,
      description: job.description || "",
      how_to_apply: job.contact || "",
      location: job.location || "",
      min_salary: Number(job.salaryMin) || 0,
      max_salary: Number(job.salaryMax) || 0,
      // ensure backend gets posted_at — your lambda sets posted_at to NOW() on insert, but sending it won't hurt
      posted_at: job.postedDate || new Date().toISOString(),
    };

    console.log("Sending job payload to API:", body);

    try {
      if (job.isExisting) {
        await jobApiRequest("PUT", `/Jobposting/${job.id}`, body);
        alert("Job updated successfully!");
      } else {
        const result = await jobApiRequest("POST", "/Jobposting", body);
        console.log("POST result:", result);
        alert("Job posted successfully!");
      }
      await fetchJobs();
      setEditingJob(null);
      setView("viewJobs");
    } catch (err) {
      console.error("Save job error:", err);
      alert("Error saving job: " + (err.message || err));
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete
  const handleJobDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    setIsLoading(true);
    setError(null);
    try {
      await jobApiRequest("DELETE", `/Jobposting/${jobId}`);
      alert("Job deleted successfully!");
      await fetchJobs();
    } catch (err) {
      console.error(err);
      alert("Error deleting job: " + (err.message || err));
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Recruiter handlers
  const handleRecruiterAdd = async (rec) => {
    try {
      const res = await recruiterApiRequest("POST", "/recruiters", rec);
      setRecruiters((p) => [{ ...rec, id: res.id || makeId() }, ...p]);
      alert("Invite sent successfully!");
      return true;
    } catch (err) {
      console.error("Invite recruiter error:", err);
      alert("Failed to invite recruiter: " + (err.message || err));
      return false;
    }
  };

  const handleRecruiterRemove = async (id) => {
    try {
      await recruiterApiRequest("DELETE", `/recruiters/${id}`);
      setRecruiters((p) => p.filter((r) => r.id !== id));
      alert("Recruiter removed successfully!");
    } catch (err) {
      console.error("Remove recruiter error:", err);
      alert("Failed to remove recruiter: " + (err.message || err));
    }
  };

  // UI layout
  const layout = {
    fontFamily: 'Inter, system-ui, -apple-system, Roboto, "Segoe UI", Arial',
    display: "flex",
    minHeight: "100vh",
    background: "radial-gradient(1200px 600px at 10% 10%, rgba(37,99,235,0.06), transparent), linear-gradient(180deg, #f7fafc 0%, #eef2ff 100%)"
  };

  const topBar = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 1.5rem",
    borderBottom: "1px solid rgba(15,23,42,0.06)",
    background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9))",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  };

  return (
    <div style={layout}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 240 : 64,
        flexShrink: 0,
        background: "#0f172a",
        padding: "16px 8px",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: sidebarOpen ? "space-between" : "center", marginBottom: 24, padding: "0 12px" }}>
          {sidebarOpen && <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>YUVA SAATHI</div>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={buttonStyle("ghost")}>
            {sidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, flexGrow: 1 }}>
          <SideItem label="Dashboard" icon={<FaTachometerAlt />} active={view === "dashboard"} onClick={() => { setView("dashboard"); setEditingJob(null); }} open={sidebarOpen} />
          <SideItem label="Post New Job" icon={<FaPlus />} active={view === "postJob" && !editingJob} onClick={() => { setView("postJob"); setEditingJob(null); }} open={sidebarOpen} />
          <SideItem label="Manage Jobs" icon={<FaBriefcase />} active={view === "viewJobs"} onClick={() => { setView("viewJobs"); setEditingJob(null); }} open={sidebarOpen} />
          <SideItem label="Company Profile" icon={<FaBuilding />} active={view === "profile"} onClick={() => { setView("profile"); setEditingJob(null); }} open={sidebarOpen} />
          <SideItem label="Recruiters" icon={<FaUserTie />} active={view === "recruiters"} onClick={() => { setView("recruiters"); setEditingJob(null); }} open={sidebarOpen} />
          <SideItem label="Analytics" icon={<FaChartBar />} active={view === "analytics"} onClick={() => { setView("analytics"); setEditingJob(null); }} open={sidebarOpen} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <SideItem label="Settings" icon={<FaCog />} active={view === "settings"} onClick={() => { setView("settings"); setEditingJob(null); }} open={sidebarOpen} />
          <SideItem label="Logout" icon={<FaSignOutAlt />} active={false} onClick={handleLogout} open={sidebarOpen} />
        </div>
      </div>

      {/* Main */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <div style={topBar}>
          <h2 style={{ margin: 0, color: "#0f172a" }}>{view === "postJob" ? (editingJob ? "Edit Job Posting" : "Post a New Job") : (view === "viewJobs" ? "Manage Job Postings" : (view === "profile" ? "Company Profile" : (view === "recruiters" ? "Recruiters" : (view === "analytics" ? "Analytics" : (view === "settings" ? "Settings" : "Dashboard Overview")))))}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 14, color: "#475569", fontWeight: 700 }}>{companyProfile.name}</div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "grid", placeContent: "center" }}>YS</div>
          </div>
        </div>

        <div style={{ padding: "16px", flexGrow: 1 }}>
          {isLoading && <div style={{ padding: 12, background: "#fef3c7", color: "#92400e", borderRadius: 8, marginBottom: 16, fontWeight: 700 }}>Loading data...</div>}
          {error && <div style={{ padding: 12, background: "#fee2e2", color: "#b91c1c", borderRadius: 8, marginBottom: 16, fontWeight: 700 }}>Error: {error}</div>}

          {view === "dashboard" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 16 }}>
              <div style={{ gridColumn: "span 8" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                  <div style={{ background: "#fff", padding: 16, borderRadius: 12, boxShadow: "0 6px 18px rgba(2,6,23,0.06)" }}>
                    <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>Active Jobs</div>
                    <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>{jobPostings.length}</div>
                  </div>
                  <div style={{ background: "#fff", padding: 16, borderRadius: 12, boxShadow: "0 6px 18px rgba(2,6,23,0.06)" }}>
                    <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>Recruiters</div>
                    <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>{recruiters.length}</div>
                  </div>
                </div>

                <div style={{ marginTop: 12, background: "#fff", borderRadius: 12, padding: 12, boxShadow: "0 6px 18px rgba(2,6,23,0.06)" }}>
                  <h3 style={{ marginTop: 0 }}>Recent Job Postings</h3>
                  {jobPostings.length === 0 ? <div style={{ color: "#64748b" }}>No active jobs. Create one from "Post New Job".</div> : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {jobPostings.slice(0, 3).map((j) => (
                        <div key={j.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, borderRadius: 8, border: "1px solid #eef2ff" }}>
                          <div>
                            <div style={{ fontWeight: 800 }}>{j.title}</div>
                            <div style={{ color: "#64748b", fontSize: 13 }}>{j.company} • {j.location} • {j.type}</div>
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <span style={{ padding: "6px 10px", borderRadius: 8, background: "#eef2ff", fontWeight: 700 }}>
                              {j.salaryMin || j.salaryMax ? `${j.salaryMin || 0} - ${j.salaryMax || 0} L` : "Nego"}
                            </span>
                            <button style={buttonStyle("ghost")} onClick={() => alert("View candidates - integrate ATS for full flow")}>View</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "#fff", padding: 12, borderRadius: 12, boxShadow: "0 6px 18px rgba(2,6,23,0.06)" }}>
                  <h4 style={{ marginTop: 0 }}>Quick Actions</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <button style={buttonStyle("primary", true)} onClick={() => { setView("postJob"); setEditingJob(null); }}>Quick Post Job</button>
                    <button style={buttonStyle("success", true)} onClick={() => alert("Exporting data...")}>Export Data</button>
                    <button style={buttonStyle("ghost", true)} onClick={() => alert("Open audit logs")}>Audit Logs</button>
                  </div>
                </div>

                <div style={{ background: "#fff", padding: 12, borderRadius: 12, boxShadow: "0 6px 18px rgba(2,6,23,0.06)" }}>
                  <h4 style={{ marginTop: 0 }}>Top Recruiters</h4>
                  {recruiters.map((r) => (
                    <div key={r.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed #eef2ff" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{r.name}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{r.role}</div>
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{r.email}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "postJob" && (
            <JobPostForm
              companyProfile={companyProfile}
              editingJob={editingJob}
              onSave={handleJobSave}
              onCancel={() => { setEditingJob(null); setView("viewJobs"); }}
            />
          )}

          {view === "viewJobs" && (
            <ManageJobs
              jobs={jobPostings}
              onEdit={(job) => { setEditingJob(job); setView("postJob"); }}
              onDelete={handleJobDelete}
            />
          )}

          {view === "profile" && (
            <CompanyProfileForm
              profile={companyProfile}
              onSave={(p) => { setCompanyProfile(p); alert("Profile saved locally (API save not implemented)"); }}
            />
          )}

          {view === "recruiters" && (
            <RecruitersSection recruiters={recruiters} onAdd={handleRecruiterAdd} onRemove={handleRecruiterRemove} />
          )}

          {view === "analytics" && (
            <AnalyticsSection analyticsData={analyticsData} isLoading={isAnalyticsLoading} error={analyticsError} />
          )}

          {view === "settings" && (
            <div style={{ background: "#fff", padding: 18, borderRadius: 12, boxShadow: "0 8px 24px rgba(2,6,23,0.06)", maxWidth: 600 }}>
              <h3>Account Settings</h3>
              <SettingToggle label="Email Notifications" desc="Receive alerts for new applications and job expiry." checked={settings.emailNotifications} onToggle={() => setSettings((s) => ({ ...s, emailNotifications: !s.emailNotifications }))} />
              <SettingToggle label="Two-Factor Authentication (2FA)" desc="Add an extra layer of security." checked={settings.twoFactorAuth} onToggle={() => setSettings((s) => ({ ...s, twoFactorAuth: !s.twoFactorAuth }))} />
              <SettingSelect label="Dashboard Density" value={settings.dashboardDensity} onChange={(e) => setSettings((s) => ({ ...s, dashboardDensity: e.target.value }))} options={["comfortable", "compact"]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
