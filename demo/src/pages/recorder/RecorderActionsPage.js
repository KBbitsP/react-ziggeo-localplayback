import React, { Component } from "react";
import { ZiggeoRecorder, ZiggeoAudioRecorder } from "react-ziggeo";
import { API_KEY } from "../../constants";

export default class Recorder extends Component {
  constructor(props) {
    super(props);
    this.child = false;
    this.state = {
      recording: false,
      showError: false,
      showWarning: false,
      showRecorder: true,
    };
  }

  recorderVerifiedVideo = () => {
    console.log("Recorder onRecorderVerified");
    alert("The video is verified, you can close the screen");
    this.child.reset();
  };

  recorderNoMicrophone = () => {
    alert("Please check sound");
  };

  recorderVerifiedAudio = () => {
    console.log("Recorder onRecorderVerified");
    alert("The video is verified, you can close the screen");
    this.child.reset();
  };

  render() {
    const {
      title,
      timerValue,
      classes,
      video = true,
      width = "100%",
      height = "auto",

      allowupload,
      recordingTimeLimit = 0,
      className = "",
      onRecordingStopped,
    } = this.props;
    const { showError, showWarning, showRecorder } = this.state;
    const recordingTimeLimitInSec = recordingTimeLimit * 60 || 600;
    let timeLimit = timerValue || recordingTimeLimitInSec;
    timeLimit =
      timeLimit < recordingTimeLimitInSec ? timeLimit : recordingTimeLimitInSec;

    const testButton = (
      <>
        <button
          onClick={() => {
            this.setState({ showRecorder: false });
          }}
        >
          Hide
        </button>
        <button
          onClick={() => {
            this.setState({ showRecorder: true });
          }}
        >
          UnHide
        </button>
        <button
          onClick={() => {
            this.child.reset();
          }}
        >
          Reset
        </button>
      </>
    );
    if (!showRecorder) {
      return testButton;
    }

    return (
      <>
        <div>Recorder</div>
        {showError && (
          <div className={clsx(classes.banner, classes.errorBanner)}>
            No microphone found
          </div>
        )}
        {showWarning && (
          <div className={clsx(classes.banner, classes.warningBanner)}>
            The microphone level is low
          </div>
        )}
        {video ? (
          <ZiggeoRecorder
            apiKey={API_KEY}
            onRef={(ref) => {
              this.child = ref;
            }}
            title={title || ""}
            description=""
            height={height}
            width={width}
            theme="space"
            themecolor="blue"
            className={className}
            localplayback={false}
            picksnapshots={false}
            timelimit={timeLimit}
            allowupload={allowupload}
            allowedextensions={[
              "mp4",
              "avi",
              "mov",
              "mkv",
              "wmv",
              "ogv",
              "webm",
              "flv",
            ]}
            // webrtc
            webrtc_on_mobile
            webrtc_streaming_if_necessary
            // Events

            onVerified={this.recorderVerifiedVideo}
            onNoMicrophone={this.recorderNoMicrophone}
          />
        ) : (
          <ZiggeoAudioRecorder
            apiKey={API_KEY}
            onRef={(ref) => {
              this.child = ref;
            }}
            title={title || ""}
            description=""
            height={height}
            width={width}
            theme="space"
            themecolor="blue"
            className={className}
            localplayback={false}
            timelimit={timeLimit}
            allowupload={allowupload}
            allowedextensions={["mp3", "wav"]}
            // webrtc
            webrtc_on_mobile
            webrtc_streaming_if_necessary
            // Events
            onCountdown={this.recorderCountdown}
            onRecording={this.onRecording}
            onUploadSelected={this.recorderUploadSelected}
            onUploading={this.uploadStarted}
            onVerified={this.recorderVerifiedAudio}
            onError={this.onError}
            onPlaying={this.onRecordPlaying}
            onNoMicrophone={this.onNoMicrophone}
            onHasMicrophone={this.onHasMicrophone}
            onMicrophonehealth={this.onMicrophonehealth}
          />
        )}
        {testButton}
      </>
    );
  }
}
