import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCves } from "../services/api";

function CveList() {
  const [cves, setCves] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchCves(page, limit)
      .then((data) => {
        setCves(data.vulnerabilities || []);
        setTotal(data.totalResults || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, limit]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>CVE List</h2>

      <p>Total Records: {total}</p>

      <label>
        Results Per Page:{" "}
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </label>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: "15px" }}>
          <thead>
            <tr>
              <th>CVE ID</th>
              <th>Published</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {cves.map((item) => (
              <tr
                key={item.cve.id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/cves/${item.cve.id}`)}
              >
                <td>{item.cve.id}</td>
                <td>{item.cve.published}</td>
                <td>{item.cve.lastModified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default CveList;
