import React from 'react';
import dynamic from 'next/dynamic';
import { ParsedCANLog } from '../../types/can';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface CANVisualizerProps {
  data: ParsedCANLog;
}

const CANVisualizer: React.FC<CANVisualizerProps> = ({ data }) => {
  const timestamps = data.messages.map((msg) => msg.timestamp);
  const ids = data.messages.map((msg) => msg.id);

  const scatterData = {
    x: timestamps,
    y: ids,
    mode: 'markers',
    type: 'scatter',
    marker: { size: 5 },
  };

  const histogramData = {
    x: ids,
    type: 'histogram',
    nbinsx: 50,
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">CAN Messages Over Time</h2>
        <Plot
          data={[scatterData]}
          layout={{
            title: 'CAN Messages Over Time',
            xaxis: { title: 'Timestamp' },
            yaxis: { title: 'Message ID' },
            autosize: true,
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '400px' }}
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Message ID Distribution</h2>
        <Plot
          data={[histogramData]}
          layout={{
            title: 'Message ID Distribution',
            xaxis: { title: 'Message ID' },
            yaxis: { title: 'Frequency' },
            autosize: true,
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '400px' }}
        />
      </div>
    </div>
  );
};

export default CANVisualizer;
