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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8800/entries/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update the UI by removing the deleted entry
        setFormDataArray((prevData) =>
          prevData.filter((formData) => formData.id !== id)
        );
      } else {
        console.error("Failed to delete entry");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="card-container">
      {formDataArray.length > 0 ? (
        formDataArray.map((formData) => (
          <div key={formData.id} className="card">
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
            <div>
              <button onClick={() => handleDelete(formData.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Entries;
