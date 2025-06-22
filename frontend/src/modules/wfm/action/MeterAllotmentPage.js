import React, { useState } from "react";
import axios from "axios";

const MeterAllotment = () => {
  const [consumerNo, setConsumerNo] = useState();
  const [meterNumber, setMeterNumber] = useState();  // Updated state name
  const [consumerData, setConsumerData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

   // ✅ Get user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const username = currentUser?.username;
  const password = "esya@123";


  const handleFind = async () => {
    if (!consumerNo && !meterNumber) {
      setError("Please provide either a Consumer Number or Meter Number.");
      return;
    }

    try {
      setLoading(true); // Set loading state to true when request starts
      const response = await axios.get("http://localhost:8080/api/consumers/find", {
        params: {
          consumerNo: consumerNo || undefined,
          meterNo: meterNumber || undefined,
        },
        auth: {
          username: username,
          password: password
        }
      });
      setConsumerData(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Consumer not found");
      setConsumerData(null);
    } finally {
      setLoading(false); // Set loading state to false when request ends
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light py-5">
      <div className="bg-white p-4 rounded shadow" style={{ width: "100%", maxWidth: "500px" }}>
        <h4 className="mb-4 text-center">Meter Allotment</h4>

        <div className="mb-3">
          <label className="form-label">Consumer Number</label>
          <input 
            type="text"
            className="form-control"
            value={consumerNo}
            onChange={(e) => setConsumerNo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Meter Number</label>
          <input 
            type="text"
            className="form-control"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleFind} disabled={loading}>
          {loading ? "Finding..." : "Find"}
        </button>

      {error && <p className="text-danger mt-3">{error}</p>}

      {consumerData && (
        <div className="mt-4 card p-3 shadow-sm">
          <h5>Consumer Details</h5>
          <p><strong>Name:</strong> {consumerData.consumerName}</p>
          <p><strong>Consumer No:</strong> {consumerData.consumerNo}</p>
          <p><strong>Meter No:</strong> {consumerData.meterNumber}</p>
          <p><strong>Zone:</strong> {consumerData.zoneName}</p>
          <p><strong>Circle:</strong> {consumerData.circleName}</p>
          <p><strong>Division:</strong> {consumerData.divisionName}</p>
          <p><strong>Sub -Division:</strong> {consumerData.subdivisionName}</p>

          <p><strong>Section:</strong> {consumerData.sectionName}</p>
          <p><strong>DTC Code:</strong> {consumerData.dtcCode}</p>
          <p><strong>Net Meter:</strong> {consumerData.solarRooftop ? "Yes" : "No"}</p>
          <button className="btn btn-success mt-2">Proceed</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default MeterAllotment;
