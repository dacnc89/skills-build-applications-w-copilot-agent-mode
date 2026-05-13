import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users API endpoint:', apiUrl);
        console.log('Fetched users:', results);
      });
  }, [apiUrl]);

  return (
    <div className="card shadow p-4 mb-4">
      <h2 className="card-title mb-4 text-primary">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="3" className="text-center">No users found.</td></tr>
            ) : (
              users.map((user, idx) => (
                <tr key={user.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{user.username || '-'}</td>
                  <td>{user.email || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
