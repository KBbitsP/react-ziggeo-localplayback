import React, { Component } from "react";
import { ZiggeoRecorder } from "react-ziggeo";

export default class RecorderPage extends Component {
  handleUploaded = (embedding) => {
    console.log("Recorder onUploaded: " + embedding.video_data.token);
  };
  handleVerified = (embedding) => {
    console.log("Recorder onVerified: " + embedding.video_data.token);
  };
  handleProcessed = (embedding) => {
    console.log("Recorder onProcessed: " + embedding.video_data.token);
  };

  render() {
    return (
      <section className="recorder-page">
        <h1 className="page-header">localplayback Recorder Page</h1>
        <ZiggeoRecorder
          apiKey="098969e7b13a251ad640117a2add376d"
          allowrecord={true}
          allowupload={false}
          theme="modern"
          width="100%"
          height="100%"
          onUploaded={this.handleUploaded}
          onVerified={this.handleVerified}
          onProcessed={this.handleProcessed}
          picksnapshots={false}
          locale="en"
          localplayback={true}
          rerecordableifexists={true}
          skipinitial={true}
          playermodeifexists={true}
        />
      </section>
    );
  }
}
