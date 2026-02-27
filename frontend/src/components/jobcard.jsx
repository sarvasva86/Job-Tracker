export default function JobCard({ job, onDelete, onEdit }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
      <h3>{job.title}</h3>
      <p>Company: {job.company}</p>
      <p>Status: {job.status}</p>
      <button onClick={() => onEdit(job)}>Edit</button>
      <button onClick={() => onDelete(job.id)}>Delete</button>
    </div>
  );
}
