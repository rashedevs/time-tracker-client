import React, { useState } from "react";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    date: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddButtonClick = async () => {
    // Create the data object in the required format
    const postData = {
      user_id: 1, // Assuming a static user_id for this example
      date: formData.date,
      start_time: formData.startTime,
      end_time: formData.endTime,
      notes: formData.notes,
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch("http://localhost:8800/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        toast.success("Entry added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Failed to add entry. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }

    // Clear the form data
    setFormData({
      startTime: "",
      endTime: "",
      date: "",
      notes: "",
    });
  };

  return (
    <div className="form-container">
      <label>
        Start Time:
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
        />
      </label>

      <label>
        End Time:
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Notes:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleAddButtonClick}>Add Entry</button>
      <ToastContainer />
    </div>
  );
};

export default Home;
