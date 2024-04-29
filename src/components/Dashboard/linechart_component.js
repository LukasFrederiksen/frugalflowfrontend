import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '10am', uv: 40, pv: 24, amt: 24 },
  { name: '11am', uv: 30, pv: 13, amt: 22 },
  { name: '10am', uv: 40, pv: 24, amt: 24 },
  { name: '11am', uv: 30, pv: 13, amt: 22 },
  { name: '10am', uv: 40, pv: 24, amt: 24 },
  { name: '11am', uv: 30, pv: 13, amt: 22 },
  { name: '10am', uv: 40, pv: 24, amt: 24 },
  { name: '11am', uv: 30, pv: 13, amt: 22 },
  // ... add the rest of your data here
];

const ChartComponent = () => (
    <div className="flex flex-col justify-center items-start p-4 bg-ff-ff_bg_sidebar_dark dark:bg-ff_bg_sidebar_dark rounded-lg shadow-lg" style={{ height: '100%' }}>
      <h2 className="text-lg font-bold mb-4 ff-text self-start">Sales Report</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 40, left: 0, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
);

export default ChartComponent;