import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts API endpoint:', apiUrl);
        console.log('Fetched workouts:', results);
      });
  }, [apiUrl]);

  return (
    <div className="card shadow p-4 mb-4">
      <h2 className="card-title mb-4 text-primary">Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length === 0 ? (
              <tr><td colSpan="3" className="text-center">No workouts found.</td></tr>
            ) : (
              workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{workout.name || '-'}</td>
                  <td>{workout.difficulty || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workouts;
