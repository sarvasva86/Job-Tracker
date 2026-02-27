import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { fetchJobs, deleteJob } from "../services/api";

export default function Home({ onEdit }) {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    const data = await fetchJobs();
    setJobs(data);
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    loadJobs();
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div>
      <h1>All Jobs</h1>
      {jobs.length === 0 && <p>No jobs yet.</p>}
      {jobs.map(job => (
        <JobCard key={job.id} job={job} onDelete={handleDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
