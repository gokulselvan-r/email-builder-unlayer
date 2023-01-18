import React, { Component } from "react";
import EmailEditor from "react-email-editor";
import sample from './../Components/Data/sample.json';
import font from './../Components/Data/fonts.json';
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

class EmailBuilder extends Component {
  state = {
    getEmail:false,
    toEmail: ''
  }
  
  componentDidMount(){
    if (window.sessionStorage.getItem('sessionId') === null) {
      window.sessionStorage.setItem('sessionId', `${makeid(6)}-${makeid(6)}-${makeid(6)}`)
    }
  }
  onload = () => {
    this.editor.loadDesign(sample)
  }
  sendEmail = (e) => {
    e.preventDefault()
    this.editor.exportHtml((data) => {
      const { html } = data;
      // console.log(this.state)
      axios.post('/send-email', {
        emailTemplate : html,
        userEmail : window.sessionStorage.getItem('userEmail'),
        toEmail : this.state.toEmail,
        emailSubject : this.state.emailSubject
      }).then(res=>{
        console.log(res.data)
      }).catch(err=>{
        console.log(err.response)
      })
    });
  };
  sendEmailInput = (e) => {
    e.preventDefault()
    
      this.setState({
        getEmail : true
      
    });
  };
  saveDesign = (e) => {
    e.preventDefault()
    this.editor.saveDesign(design => {
      console.log('saveDesign', design)
    })
  }
  checkSpam = (e) => {
    e.preventDefault()
    console.log("Spam Score")
  }
  


  // Additional

  options = {
    fonts: {
      showDefaultFonts: true,
      customFonts: font
    }
  }
  appearance = {
    theme: 'dark',
  }

  handleClose = (e) => {
    this.setState({
      getEmail: false
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    
  });
  }
  render() {
    return (
      <div>
       <section id="email-page">
          <form>
          <button onClick={this.checkSpam}>Check Spam</button>
        <button onClick={this.saveDesign}>Save Design</button>
        <button onClick={this.sendEmailInput}>Send Email</button>

          </form>
           {/* Dialog */}

        </section>
        <EmailEditor ref={(editor) => (this.editor = editor)} onLoad={this.onload} minHeight={550} appearance={this.appearance} options={this.options} />
      

     
        <Dialog open={this.state.getEmail} onClose={this.handleClose}>
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
      </div>
    );
  }
}

export default EmailBuilder;
