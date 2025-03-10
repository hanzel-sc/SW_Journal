import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Progress } from 'antd'; // Optional if you're using Ant Design for progress
import './dashboard.css'; // Import the CSS file

const Dashboard = () => {
  // Sample data for the graphs
  const data = [
    { name: 'Projects', value: 10 },
    { name: 'Lyric Files', value: 25 },
    { name: 'Audio Files', value: 18 },
  ];

  const progressData = [
    { name: 'Projects', completed: 90 },
    { name: 'Lyric Files', completed: 70 },
    { name: 'Audio Files', completed: 55 },
  ];

  // Placeholder data for the two empty slots
  const emptySlots = [
    { name: 'Slot 1', value: 0 },
    { name: 'Slot 2', value: 0 },
  ];

  return (
    <div className="dashboard-container">
      {/*<h1 className='d1'>Dashboard</h1>*/}


      {/* Circular Progress Charts */}
      {/*<h2 className='d2'>Progress Overview</h2>*/}
      <div className="progress-container">
        {progressData.map((item, index) => (
          <div key={index} className="progress-item">
            <h3>{item.name}</h3>
            <Progress type="circle" percent={item.completed} />
          </div>
        ))}
      </div>

      {/* Empty Slots 
      <h2 className='d2'>Coming Soon</h2>
      <div className="empty-slots-container">
        {emptySlots.map((slot, index) => (
          <div key={index} className="empty-slot-item">
            <h3 className='d3'>{slot.name}</h3>
            <p>Under Construction</p>
          </div>
        ))}
      </div>*/}
    </div>
  );
};

export default Dashboard;
