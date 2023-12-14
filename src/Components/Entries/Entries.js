import React, { useState, useEffect } from "react";
import "./Entries.css";

const Entries = () => {
  const [formDataArray, setFormDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8800/entries");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFormDataArray(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-container">
      {formDataArray.length > 0 ? (
        formDataArray.map((formData, index) => (
          <div key={index} className="card">
            <p>
              <strong>Start Time:</strong> {formData.start_time}
            </p>
            <p>
              <strong>End Time:</strong> {formData.end_time}
            </p>
            <p>
              <strong>Date:</strong> {formData.date}
            </p>
            <p>
              <strong>Notes:</strong> {formData.notes}
            </p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Entries;
