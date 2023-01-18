import React, { Component } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ReactStoreIndicator from "react-score-indicator";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IssueDetails from "./IssueDetails";
import LinearProgress from "@mui/material/LinearProgress";
import { Triangle } from  'react-loader-spinner'
import { Button } from "@mui/material";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell className="severity status-head">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography
            className={
              row.status === "Fail"
                ? "severity fail"
                : row.status === "Pass"
                ? "severity pass"
                : "severity warn"
            }
          >
            <span
              className={
                row.status === "Fail"
                  ? "severity dot fail"
                  : row.status === "Pass"
                  ? "severity dot pass"
                  : "severity dot warn"
              }
            ></span>
            {row.status === "Fail"
              ? `Failing -${row.points_deducted}`
              : row.status === "Pass"
              ? `Passing`
              : `Warning -${row.points_deducted}`}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography className="severity type">
            {row.id.replace(/_/g, " ").toUpperCase()}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography className="severity message">{row.message}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <IssueDetails detail={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

class SpamScore extends Component {
  state = {
    spamScoreData: {},
    loaded: false,
  };

  checkIfReportIsReady = () => {
    var session = window.sessionStorage.getItem("sessionId").split("-");
    axios
      .post("/spam-check", { slug: session[session.length - 1] })
      .then((res) => {
        if (res.data.status === "NOT_READY") {
          setTimeout(this.checkIfReportIsReady(), 5000);
        } else {
          this.setState({
            loaded: true,
            spamScoreData: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  async componentDidMount() {
    this.checkIfReportIsReady()
  }

  render() {
    return (
      <div>
       
        {Object.keys(this.state.spamScoreData).length ? (
          <>
            <Box className="issue-detail-container">
              <div><Button onClick={() => window.location.href = "/"} style={{width:'100%', margin:'10px 0'}} >Back</Button></div>
              <Grid container spacing={2}>
                <Grid item xs={5} md={5} className="issue-detail-score">
                  <ReactStoreIndicator
                  stepsColors={[
                    '#ff0000',
                    '#ff0000',
                    '#ff0000',
                    '#ff0000',
                    '#ff0000',
                    '#00ff00',
                  ]}
                    value={this.state.spamScoreData.score}
                    maxValue={100}
                  />
                </Grid>
                <Grid item xs={5} md={5} className="issue-detail-score">
                  <Box className="issue-detail-container">
                    <Grid item xs={12} md={12}>
                      <h3>MailGenius Score </h3>
                      <LinearProgress
                         className={
                          this.state.spamScoreData.score < 80 ? "graph fail" : 
                          this.state.spamScoreData.score < 90 ? "graph warn" : "graph pass" 
                        }
                        variant="determinate"
                        value={this.state.spamScoreData.score}
                      />
                      <p>
                        We've found{" "}
                        <span className="issue-count">
                          {
                            this.state.spamScoreData.aspects.filter((fac) => {
                              if (fac["passing"] !== true) return true
                              else return false;
                            }).filter(Boolean).length
                          }
                        </span>{" "}
                        thing(s) you can do to avoid landing in the spam folder
                        and increase security.
                        <br />{" "}
                        <small>
                          However, there are several other factors that go into
                          deliverability such as domain reputation, list hygiene
                          etc., which play a large role when inboxing. You can
                          be authenticated and follow best practices, but if
                          recipients mark your emails as spam, they'll be
                          classified as spam.
                        </small>
                        <br />
                        <br />
                        <span
                          className="issue-count"
                          style={{ fontSize: "14px" }}
                        >
                          Email &nbsp;&nbsp;&nbsp; :
                        </span>{" "}
                        {this.state.spamScoreData.mail.fromEmail}
                        <br />
                        <span
                          className="issue-count"
                          style={{ fontSize: "14px" }}
                        >
                          Subject :
                        </span>{" "}
                        {this.state.spamScoreData.mail.subjectLine}
                      </p>
                    </Grid>
                  </Box>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={10} md={10} className="issue-detail-grid">
                    <TableContainer component={Paper}>
                      <Table aria-label="collapsible table">
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell className="severity table-head">
                              SEVERITY
                            </TableCell>
                            <TableCell className="severity table-head">
                              TEST
                            </TableCell>
                            <TableCell className="severity table-head">
                              DESCRIPTION
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.spamScoreData.aspects.map((row) => (
                            <Row key={row.id} row={row} />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <>
          <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems:'center',
          height:'100vh'
        }}>
        <Triangle
    heigth="100"
    width="100"
    color='green'
    ariaLabel='loading'
  />
        </div>
          </>
        )}
      </div>
    );
  }
}

export default SpamScore;
