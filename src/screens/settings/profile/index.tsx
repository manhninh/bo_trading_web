import React from 'react';
import './styled.css';

const ProflieSettingComponent = () => {
  return <div className="row mt-3">
    <div className="col-lg-4 col-xs-12">
      <div className="card card-profile mb-2">
        <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/paul-morris-116514-unsplash.jpg)` }} className="card-header"></div>
        <div className="card-body text-center"><img src={`${process.env.PUBLIC_URL}/img/user.png`} className="card-profile-img" />
          <h4 className="mb-3 text-gray-light">Nathan Andrews</h4>
          <button className="btn btn-outline-secondary"><span className="fas fa-camera"></span> Change avatar</button>
        </div>
      </div>
    </div>
    <div className="col-lg-8 col-xs-12">
      <form className="card mb-2">
        <div className="card-header">
          <h3 className="card-title text-danger">Edit Profile</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input type="number" className="form-control" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-right">
          <button type="submit" className="btn btn-danger">Update Profile</button>
        </div>
      </form>
    </div>
  </div>;
};

export default React.memo(ProflieSettingComponent);
