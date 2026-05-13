import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams API endpoint:', apiUrl);
        console.log('Fetched teams:', results);
      });
  }, [apiUrl]);

  return (
    <div className="card shadow p-4 mb-4">
      <h2 className="card-title mb-4 text-primary">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr><td colSpan="2" className="text-center">No teams found.</td></tr>
            ) : (
              teams.map((team, idx) => (
                <tr key={team.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{team.name || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
