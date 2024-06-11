import React, { useState, ChangeEvent, FormEvent } from "react";
import CustomLayout from "../layouts/layout";
import { Goal } from "../types/AddGoalDTO";
import axios from "axios";
import { message } from "antd";

const AddGoal: React.FC = () => {
  const [goal, setGoal] = useState<Goal>({
    title: "",
    description: "",
    currentAmount: 0,
    targetAmount: 0,
    finishDate: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const body = { ...goal };
      const token = localStorage.getItem('auth_token');
      console.log("Token:", token); // Debugging log
      await axios.post("http://localhost:8081/api/newGoal", body, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      message.success("Goal added successfully");
    } catch (error) {
      console.error("Error adding goal:", error); // Debugging log
      message.error("Error adding goal");
    }
  };


  const styles = {
    input_field: {
      width: '350px',
      height: '35px',
      marginBottom: '30px',
    },
    input_label: {
      fontSize: '18px',
      marginBottom: '10px',
      fontWeight: 'bolder',
      color: '#0a2540',
    },
    sbmt_btn: {
      marginLeft: '-55px',
      backgroundColor: '#0a2540',
      color: 'white',
      fontSize: '14px',
      fontWeight: 'bolder',
      border: 'none',
      width: '150px',
      height: '40px',
      borderRadius: '5px',
    },
  };

  return (
    <CustomLayout>
      <div className="container" style={{ marginTop: '50px', marginBottom: '100px' }}>
        <h2 className="fw-bolder" style={{ marginBottom: '75px' }}>
          Set Your Next Achievement in Motion: Add Your Goal Below!
        </h2>
        <div className="container d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit} className="pt-4" style={{ width: '850px' }}>
            <div className="row">
              <div className="col">
                <label style={styles.input_label} className="fw-bolder">Title*</label><br />
                <input
                  style={styles.input_field}
                  type="text"
                  name="title"
                  value={goal.title}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label style={styles.input_label} className="fw-bolder">Description</label><br />
                <input
                  style={styles.input_field}
                  type="text"
                  name="description"
                  value={goal.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label style={styles.input_label} className="fw-bolder">Current amount*</label><br />
                <input
                  style={styles.input_field}
                  type="number"
                  name="currentAmount"
                  value={goal.currentAmount}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label style={styles.input_label} className="fw-bolder">Target amount*</label><br />
                <input
                  style={styles.input_field}
                  type="number"
                  name="targetAmount"
                  value={goal.targetAmount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label style={styles.input_label} className="fw-bolder">Finish date*</label><br />
                <input
                  style={styles.input_field}
                  type="date"
                  name="finishDate"
                  value={goal.finishDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col d-flex justify-content-center align-items-center" style={{ width: '50px' }}>
                <button type="submit" style={styles.sbmt_btn}>Add goal!</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CustomLayout>
  );
};

export default AddGoal;

