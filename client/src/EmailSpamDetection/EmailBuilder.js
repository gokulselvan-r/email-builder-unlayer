import React, { Component } from "react";
import EmailEditor from "react-email-editor";
import sample from "./../Components/Data/sample.json";
import font from "./../Components/Data/fonts.json";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import EmailPreview from "./EmailPreview";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from 'react-toastify';
import { signOut, getAuth } from 'firebase/auth';
import jsFileDownload  from 'js-file-download';

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class EmailBuilder extends Component {
  state = {
    sendEmailDialog: false,
    checkSpamDrop: false,
    previewDialog: false,
    sendSpamDialog: false,
    toEmail: "",
    loggedIn: false,
    emailSubject: "",
    userEmail: window.sessionStorage.getItem("userEmail"),
  };

  componentDidMount() {
    
    if(window.sessionStorage.getItem("Auth Token") === null){
      window.location.href = '/login'
    } else {
      this.setState({
        loggedIn: true
      })
    }
    if (window.sessionStorage.getItem("sessionId") === null) {
      window.sessionStorage.setItem(
        "sessionId",
        `${makeid(6)}-${makeid(6)}-${makeid(6)}`
      );
    }
  }
  onload = () => {
    this.editor.loadDesign(sample);
  };
  sendEmail = (e) => {
    e.preventDefault();
    this.editor.exportHtml((data) => {
      const { html } = data;
      axios
        .post("/send-email", {
          emailTemplate: html,
          userEmail: this.state.userEmail,
          toEmail: this.state.toEmail,
          emailSubject: this.state.emailSubject,
        })
        .then((res) => {
          if (res.data) {
            toast.info("Email Successfully Sent...")
            this.setState({
              sendEmailDialog: false,
            });
          } else {
            toast.info("Failed When Sending Email. Please try after sometimes.")
          }
        })
        .catch((err) => {
          toast.info("Failed When Sending Email. Please try after sometimes.")
          console.log(err.response);
        });
    });
  };
  sendEmailInput = (e) => {
    e.preventDefault();
    this.setState({
      sendEmailDialog: true,
    });
  };
  saveDesign = (e) => {
    e.preventDefault();
    this.editor.saveDesign((design) => {
      jsFileDownload(design, 'template.html');
      console.log("saveDesign", design);
    });
  };
  handleCheckSpam = (e) => {
    e.preventDefault();
    this.editor.exportHtml((data) => {
      var { html: emailTemplate } = data;
      var session = window.sessionStorage.getItem("sessionId").split("-");
      var userEmail = this.state.userEmail;
      var emailSubject = this.state.emailSubject;

      axios
        .post("/send-email-spam", {
          emailTemplate,
          slug: session[session.length - 1],
          userEmail,
          emailSubject,
        })
        .then((res) => {
          if (res.data) {
            toast.info("Email Successfull Sent...")
            this.setState({
              checkSpamDrop: true,
          });
          setTimeout(() => {
            window.location.href = '/email-report'
          }, 3000);
          } else {
            toast.info("Failed When Sending Email. Please try after sometimes.")
          }
        })
        .catch((err) => {
          toast.info("Failed When Sending Email. Please try after sometimes.")
          console.log(err.response);
        });
       
    });
   
  };

  handleLogout = (e) => {
    const authentication = getAuth()
    signOut(authentication);
    sessionStorage.removeItem('Auth Token')
    sessionStorage.removeItem('userEmail')

  }
  checkSpam = (e) => {
    e.preventDefault();
    this.setState({
      sendSpamDialog: true,
    });
  };

  Preview = (e) => {
    e.preventDefault();
    this.editor.exportHtml((data) => {
      const { html } = data;
      this.setState({
        previewDialog: true,
        html: html,
      });
    });
  };

  // Additional

  options = {
    fonts: {
      showDefaultFonts: true,
      customFonts: font,
    },
  };
  appearance = {
    theme: "dark",
  };

  handleClose = (e) => {
    this.setState({
      sendEmailDialog: false,
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSpamClose = (e) => {
    this.setState({
      sendSpamDialog: false,
    });
  };
  handleCheckSpamDrop = (e) => {
    this.setState({
      checkSpamDrop: false,
    });
  };
  handlePreviewClose = (e) => {
    this.setState({
      previewDialog: false,
    });
  };
  SaveHtml = (e) => {
    e.preventDefault();
    jsFileDownload(this.state.html, 'template.html');
    this.setState({
      previewDialog: false,
    })
  };
  render() {
    return (
      <>
      {
        this.state.loggedIn ? <div>
        <section id="email-page">
          <form>
            <button onClick={this.checkSpam}>Check Spam</button>
            <button onClick={this.Preview}>Save Design</button>
            <button onClick={this.sendEmailInput}>Send Email</button>
            <button onClick={this.handleLogout}>Log Out</button>
          </form>
          {/* Dialog */}
        </section>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.state.checkSpamDrop}
          onClick={this.handleCheckSpamDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <EmailEditor
          ref={(editor) => (this.editor = editor)}
          onLoad={this.onload}
          minHeight={550}
          appearance={this.appearance}
          options={this.options}
        />

        {/* Save Design Dialog */}
        <Dialog
          fullScreen
          open={this.state.previewDialog}
          onClose={this.handlePreviewClose}
          TransitionComponent={Transition}
        >
          <DialogContent className="">
            {this.state.html ? (
              <EmailPreview template={this.state.html} />
            ) : (
              <></>
            )}
          </DialogContent>
          <DialogActions className="">
            <Button onClick={this.handlePreviewClose}>Cancel</Button>
            <Button onClick={this.SaveHtml}>Save Design</Button>
          </DialogActions>
        </Dialog>

        {/* Send Email Dialog */}
        <Dialog open={this.state.sendEmailDialog} onClose={this.handleClose}>
          <DialogContent className="getEmailDialog">
            <TextField
              name="emailSubject"
              margin="dense"
              label="Email Subject"
              className="getEmailInput"
              type="text"
              fullWidth
              onChange={this.handleChange}
              variant="standard"
            />
            <TextField
              name="toEmail"
              margin="dense"
              label="Email Address"
              className="getEmailInput"
              type="email"
              fullWidth
              onChange={this.handleChange}
              variant="standard"
            />
          </DialogContent>
          <DialogActions className="getEmailDialog">
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.sendEmail}>Send Email</Button>
          </DialogActions>
        </Dialog>

        {/* Check Spam Dialg */}
        <Dialog open={this.state.sendSpamDialog} onClose={this.handleSpamClose}>
          <DialogContent className="getEmailDialog">
            <TextField
              name="emailSubject"
              margin="dense"
              label="Email Subject"
              className="getEmailInput"
              type="text"
              fullWidth
              onChange={this.handleChange}
              variant="standard"
            />
          </DialogContent>
          <DialogActions className="getEmailDialog">
            <Button onClick={this.handleCheckSpam}>Check Spam</Button>
          </DialogActions>
        </Dialog>
      </div> : <></>
      }
      </>
    );
  }
}

export default EmailBuilder;
