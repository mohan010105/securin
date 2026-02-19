import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCveById } from "../services/api";

function CveDetails() {
  const { id } = useParams();
  const [cve, setCve] = useState(null);

  useEffect(() => {
    fetchCveById(id).then((data) => {
      setCve(data.vulnerabilities?.[0]?.cve);
    });
  }, [id]);

  if (!cve) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{cve.id}</h2>
      <p><b>Description:</b> {cve.descriptions?.[0]?.value}</p>
      <p><b>Published:</b> {cve.published}</p>
      <p><b>Last Modified:</b> {cve.lastModified}</p>
    </div>
  );
}

export default CveDetails;
