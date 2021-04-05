import ContainerLayout from 'containers/components/layout/Container';
import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styled.css';

const TradeHistoryComponent = () => {
  return (
    <ContainerLayout headerTitle="Trade History">
      <div className="row">
        <div className="col-lg-12">
          <div className="block">
            <div className="title"><strong>Trade History</strong></div>
            <div className="block-body">
              <div style={{ display: "flex" }}>
                <div className="input-group" style={{ width: "250px" }}>
                  <div style={{ display: "flex", lineHeight: 1.5, padding: ".4rem .75rem" }}>From</div>
                  <DatePicker selected={new Date()} className="form-control w-120" onChange={() => { }} />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-alt" />
                    </span>
                  </div>
                </div>

                <div className="input-group" style={{ width: "250px" }}>
                  <div style={{ display: "flex", lineHeight: 1.5, padding: ".4rem .75rem" }}>To</div>
                  <DatePicker selected={new Date()} className="form-control w-120" onChange={() => { }} />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-alt" />
                    </span>
                  </div>
                </div>
                <div className="col-xs-12 col-md-3">
                  <button type="submit" className="btn btn-danger">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default React.memo(TradeHistoryComponent);
