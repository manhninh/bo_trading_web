import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CommissionTrading = () => {
  return (
    <div className="row mt-3">
      <div className="col-lg-12">
        <div className="d-flex">
          <div className="input-group input-group-sm datePicker-group">
            <div className="datePicker-text">From</div>
            <DatePicker className="form-control datePicker-input" onChange={() => {}} />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-calendar-alt" />
              </span>
            </div>
          </div>
          <div className="input-group input-group-sm datePicker-group">
            <div className="datePicker-text">To</div>
            <DatePicker className="form-control datePicker-input" onChange={() => {}} />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-calendar-alt" />
              </span>
            </div>
          </div>
          <button className="btn btn-sm btn-danger">Search</button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="text-light">Time</th>
                <th className="text-light">Type</th>
                <th className="text-light">Action</th>
                <th className="text-light">Open</th>
                <th className="text-light">Close</th>
                <th className="text-light">Result</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CommissionTrading);
