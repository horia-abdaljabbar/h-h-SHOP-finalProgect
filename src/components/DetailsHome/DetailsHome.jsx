import React from "react";
import './DetailsHome.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandshake,faThumbsUp,faPeopleGroup,faHeadphones} from '@fortawesome/free-solid-svg-icons'

function DetailsHome() {
    return (
        <>
<div className="container">
<div className="detailsHome">
          <h4 className="services">our services</h4>
           <div className="container">
  <div className="row justify-content-between g-2 ">
    <div className="col-sm-12 col-md-6 col-xxl-3 P-30">
      <div className="card" style={{background: "#f5ebeb",}}>
      <FontAwesomeIcon icon={faHandshake} style={{background: "#cb9696",}}/>
              <div className="card-body">
          <h5 className="card-title">Amazing Deals</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
    <div className="col-sm-12 col-md-6  col-xxl-3">
      <div className="card" style={{background: "#dcebdd",}}>
      <FontAwesomeIcon icon={ faThumbsUp} style={{background: "#8bbd8e",}} />        <div className="card-body">
          <h5 className="card-title">Quality Products</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
    <div className="col-sm-12 col-md-6  col-xxl-3">
      <div className="card" style={{background: "#f5efd8",}}>
      <FontAwesomeIcon icon={ faPeopleGroup} style={{background: "#d1b54a",}} />        <div className="card-body">
          <h5 className="card-title">For All</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
    <div className="col-sm-12 col-md-6  col-xxl-3 ">
      <div className="card" style={{background: "#f4e6d8",}}>
      <FontAwesomeIcon icon={faHeadphones} style={{background: "#d29a61",}} />        <div className="card-body">
          <h5 className="card-title">Best Support</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
        </>
    );
}

export default DetailsHome;
