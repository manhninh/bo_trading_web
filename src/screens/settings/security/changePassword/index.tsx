import React from 'react';
import './styled.css';

const ChangePasswordComponent = () => {
  return <div className="row mt-3">
    <div className="col-12">
      <form className="card mb-2">
        <div className="card-header">
          <h3 className="card-title text-danger">Change password</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-control" />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control" />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input type="password" className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-right">
          <button type="submit" className="btn btn-danger">Change password</button>
        </div>
      </form>
    </div>
  </div>;
};

export default React.memo(ChangePasswordComponent);
