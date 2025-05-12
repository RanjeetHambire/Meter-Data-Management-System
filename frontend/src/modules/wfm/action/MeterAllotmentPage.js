import React, { useState } from "react";
import axios from "axios";

const MeterAllotment = () => {
  const [consumerNo, setConsumerNo] = useState("");
  const [meterNo, setMeterNo] = useState("");
  const [consumerData, setConsumerData] = useState(null);
  const [error, setError] = useState("");

  const handleFind = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/consumer/find", {
        params: {
          consumerNo: consumerNo || undefined,
          meterNo: meterNo || undefined,
        },
      });
      setConsumerData(response.data);
      setError("");
    } catch (err) {
      setError("Consumer not found");
      setConsumerData(null);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Meter Allotment</h4>
      <div className="mb-3">
        <label>Consumer Number</label>
        <input type="text" className="form-control" value={consumerNo} onChange={(e) => setConsumerNo(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Meter Number</label>
        <input type="text" className="form-control" value={meterNo} onChange={(e) => setMeterNo(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleFind}>Find</button>

      {error && <p className="text-danger mt-3">{error}</p>}

      {consumerData && (
        <div className="mt-4 card p-3 shadow-sm">
          <h5>Consumer Details</h5>
          <p><strong>Name:</strong> {consumerData.consumerName}</p>
          <p><strong>Consumer No:</strong> {consumerData.consumerNo}</p>
          <p><strong>Meter No:</strong> {consumerData.meterNo}</p>
          <p><strong>Section:</strong> {consumerData.sectionName}</p>
          {/* <p><strong>TOD Flag:</strong> {consumerData.todFlag ? "Yes" : "No"}</p>
          <p><strong>Net Meter:</strong> {consumerData.netMeter ? "Yes" : "No"}</p> */}
          <button className="btn btn-success mt-2">Proceed</button>
        </div>
      )}
    </div>
  );
};

export default MeterAllotment;
