import React, { Component } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

class SingleIndividualComp extends Component {
  render() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Profile</Breadcrumb.Item>
        <Breadcrumb.Item active>Test123</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default SingleIndividualComp;
