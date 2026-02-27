import { useState, useEffect } from "react";
import { createJob, updateJob } from "../services/api";

export default function AddEditJob({ jobToEdit, onDone }) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Applied");

  useEffect(() => {
    if (jobToEdit) {
      setCompany(jobToEdit.company);
      setTitle(jobToEdit.title);
      setStatus(jobToEdit.status);
    }
  }, [jobToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company || !title) return alert("Company and title required");

    if (jobToEdit) {
      await updateJob(jobToEdit.id, { company, title, status });
    } else {
      await createJob({ company, title, status });
    }

    setCompany(""); setTitle(""); setStatus("Applied");
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
      </select>
      <button type="submit">{jobToEdit ? "Update Job" : "Add Job"}</button>
    </form>
  );
}
