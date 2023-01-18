import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

class IssueDetails extends Component {
  state = {
    detail: {},
  };
  componentDidMount() {
      this.setState({
        detail: this.props.detail,
    });
  }
  render() {
    return (
      <div style={{width:'100%'}}>
        {Object.keys(this.state.detail).length ? (
          <Box className="issue-detail-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} className="issue-detail-grid">
                <Item className="issue-detail-item">
                  <div
                    className="ribbon"
                    id={
                      this.state.detail.status === "Fail"
                        ? "fail"
                        : this.state.detail.status === "Pass"
                        ? "pass"
                        : "warn"
                    }
                  >
                    {this.state.detail.severity === "NONE"
                      ? "No"
                      : this.state.detail.severity}{" "}
                    Severity
                  </div>
                  <Fab
                    variant="extended"
                    className="severity detail"
                    id={
                      this.state.detail.status === "Fail"
                        ? "fail"
                        : this.state.detail.status === "Pass"
                        ? "pass"
                        : "warn"
                    }
                  >
                    {this.state.detail.status === "Fail" ? (
                      <>
                        <ThumbDownAltIcon sx={{ mr: 1 }} />
                        Test Failed - {this.state.detail.message}
                      </>
                    ) : this.state.detail.status === "Pass" ? (
                      <>
                        <ThumbUpAltIcon sx={{ mr: 1 }} />
                        Test Passed - {this.state.detail.message}
                      </>
                    ) : (
                      <>
                        <ThumbsUpDownIcon sx={{ mr: 1 }} />
                        Could Be Better - {this.state.detail.message}
                      </>
                    )}
                  </Fab>
                  <Box className="issue-detail-container">
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className="issue-detail-grid-inside"
                    >
                      <h3>Reason </h3>
                      <p>{this.state.detail.why_is_it_important}</p>
                      {this.state.detail.factors.some(factor => { return factor['passing'] }) ? (
                        <></>
                      ) : (
                        <h3>Problem(s) With Solutions </h3>
                      )}

                      <Grid item xs={10} md={10} className="issue-detail-grid">
                        {this.state.detail.factors.map((factor) => {
                          return (
                            <div key={factor.id}>
                              {factor.passing ? (
                                <></>
                              ) : (
                                <>
                                  <p
                                    className="severity problem"
                                    id={
                                      this.state.detail.status === "Fail"
                                        ? "fail"
                                        : this.state.detail.status === "Pass"
                                        ? "pass"
                                        : "warn"
                                    }
                                  >
                                    {this.state.detail.status === "Fail" ? (
                                      <>(- {factor.points_deducted} Points)</>
                                    ) : this.state.detail.status === "Pass" ? (
                                      <> </>
                                    ) : (
                                      <>(- {factor.points_deducted} Points)</>
                                    )}{" "}
                                    {factor.title}
                                  </p>
                                  <small style={{ fontWeight: "bold" }}>
                                    Solution:
                                  </small>{" "}
                                  <br />
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: factor.solution.replace(
                                        /<br><br>/g,
                                        ""
                                      ),
                                    }}
                                  ></div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </Grid>
                      {this.state.detail.factors.some(factor => { return factor['passing'] }) ? (
                      <h3>Passed Tests </h3>
                      ) : (
                        <></>
                      )}
                      <Grid item xs={10} md={10} className="issue-detail-grid">
                        {this.state.detail.factors.map((factor) => {
                          return (
                            <div key={factor.id}>
                              {/* {console.log(factor)} */}
                              {factor.passing ? (
                                <div className="test m-10">
                                  <div className="passing-test">
                                    <Fab
                                      variant="extended"
                                      className="severity detail one"
                                      id="pass"
                                    >
                                      <>
                                        <DoneAllIcon sx={{ mr: 1 }} />
                                        <p>{factor.name}</p>
                                      </>
                                    </Fab>
                                  </div>
                                  <p>{factor.passing_description}</p>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default IssueDetails;
