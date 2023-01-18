import React, { Component } from "react";

export default class Tablet extends Component {
  componentDidMount() {
    var t = document.getElementById("email-preview-iframe-tablet");
        t && t.contentWindow.document.write(this.props.template)
  }
  render() {
    return (
      <>
        <div style={{ overflowX: "auto" }}>
          <div style={{ maxWidth: "650px", margin: "24px auto" }}>
            <div
              className="marvel-device ipad silver"
              style={{ width: "100%", marginLeft: "-25px" }}
            >
              <div className="camera"></div>
              <div className="screen" style={{ overflowY: "hidden" }}>
                <div style={{ margin: "5px" }}>
                  <div style={{ margin: "35px 5px 5px" }}>
                    <div id="iframe-container">
                      <iframe id="email-preview-iframe-tablet"  title="tablet"></iframe>
                    </div>
                  </div>
                </div>
              </div>

              <div className="home"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
