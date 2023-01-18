import React, { Component } from "react";

export default class Mobile extends Component {
  componentDidMount() {
    var t = document.getElementById("email-preview-iframe-phone");
        t && t.contentWindow.document.write(this.props.template)
  }
  render() {
    return (
      <>
        <div style={{ overflowX: "auto" }}>
          <div style={{ maxWidth: "350px", margin: "24px auto" }}>
            <div
              className="marvel-device iphone-x"
              style={{ width: "100%", marginLeft: "-25px" }}
            >
              <div className="notch">
                <div className="camera"></div>
                <div className="speaker"></div>
              </div>
              <div className="top-bar"></div>
              <div className="sleep"></div>
              <div className="bottom-bar"></div>
              <div className="volume"></div>
              <div className="overflow">
                <div className="shadow shadow--tr"></div>
                <div className="shadow shadow--tl"></div>
                <div className="shadow shadow--br"></div>
                <div className="shadow shadow--bl"></div>
              </div>
              <div className="inner-shadow"></div>

              <div className="screen" style={{ overflowY: "hidden" }}>
                <div style={{ margin: "35px 5px 5px" }}>
                  <div id="iframe-container">
                    <iframe id="email-preview-iframe-phone" title="phone"></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
