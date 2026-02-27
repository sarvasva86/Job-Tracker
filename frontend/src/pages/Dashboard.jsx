import { useEffect, useState } from "react";
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  logout,
} from "../services/api";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Applied");
  const [editingId, setEditingId] = useState(null);

  const loadJobs = async () => {
    const data = await fetchJobs();
    setJobs(data);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateJob(editingId, { company, title, status });
      setEditingId(null);
    } else {
      await createJob({ company, title, status });
    }

    setCompany("");
    setTitle("");
    setStatus("Applied");
    loadJobs();
  };

  const handleEdit = (job) => {
    setEditingId(job.id);
    setCompany(job.company);
    setTitle(job.title);
    setStatus(job.status);
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    loadJobs();
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h2>Job Dashboard</h2>
      <button className="secondary" onClick={handleLogout}>
        Logout
      </button>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <button className="primary" type="submit">
          {editingId ? "Update Job" : "Add Job"}
        </button>
      </form>

      <div>
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div>
              <strong>{job.company}</strong> - {job.title}
              <br />
              <small>Status: {job.status}</small>
            </div>

            <div>
              <button
                className="primary"
                onClick={() => handleEdit(job)}
              >
                Edit
              </button>

              <button
                className="danger"
                onClick={() => handleDelete(job.id)}
                style={{ marginLeft: "5px" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
