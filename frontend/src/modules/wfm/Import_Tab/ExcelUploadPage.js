import React, { useState } from 'react';
import axios from 'axios';

const ExcelUploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.xlsx')) {
      setFile(selectedFile);
      setMessage('');
    } else {
      setMessage('Please upload a valid .xlsx file.');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await axios.post('http://localhost:8080/api/import/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message || 'Upload successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h4 className="fw-bold mb-4">Upload Consumer Excel File</h4>
      <div className="row justify-content-center mb-3">
        <div className="col-md-6">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
      </div>
      <div>
        <button
          className="btn btn-primary fw-bold px-4"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default ExcelUploadPage;
