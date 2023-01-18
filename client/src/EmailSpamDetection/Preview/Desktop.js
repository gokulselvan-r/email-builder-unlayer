import React, { Component } from "react";

export default class Desktop extends Component {
  componentDidMount() {
    var t = document.getElementById("email-preview-iframe-desktop");
        t && t.contentWindow.document.write(this.props.template)
  }
  render() {
    return (
      <>
        <div style={{ overflowX: "auto" }}>
          <div style={{ maxWidth: "1024px", margin: "24px auto" }}>
            <div
              className="marvel-device macbook"
              style={{ width: "100%", marginLeft: "-44px" }}
            >
              <div className="top-bar"></div>
              <div className="camera"></div>
              <div className="screen" style={{ overflowY: "hidden" }}>
                <div style={{ margin: "5px" }}>
                  <div style={{ margin: "35px 5px 5px" }}>
                    <div id="iframe-container" style={{ height: "540px" }}>
                      <iframe id="email-preview-iframe-desktop" title="desktop">
                      </iframe>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-bar"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
