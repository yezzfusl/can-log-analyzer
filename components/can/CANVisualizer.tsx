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
    marker: { size: 5, color: ids, colorscale: 'Viridis' },
  };

  const histogramData = {
    x: ids,
    type: 'histogram',
    nbinsx: 50,
    marker: { color: 'rgba(100, 200, 102, 0.7)', line: { color: 'rgba(100, 200, 102, 1)', width: 1 } },
  };

  const layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#c9d1d9' },
    autosize: true,
    margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 },
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">CAN Messages Over Time</h2>
        <Plot
          data={[scatterData]}
          layout={{
            ...layout,
            title: 'CAN Messages Over Time',
            xaxis: { title: 'Timestamp', color: '#c9d1d9' },
            yaxis: { title: 'Message ID', color: '#c9d1d9' },
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '400px' }}
        />
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Message ID Distribution</h2>
        <Plot
          data={[histogramData]}
          layout={{
            ...layout,
            title: 'Message ID Distribution',
            xaxis: { title: 'Message ID', color: '#c9d1d9' },
            yaxis: { title: 'Frequency', color: '#c9d1d9' },
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '400px' }}
        />
      </div>
    </div>
  );
};

export default CANVisualizer;
