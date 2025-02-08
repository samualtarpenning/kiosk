import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Camera: React.FC = () => {
  const device = useSelector((state: any) => state.device);
  const videoRef = useRef(null);

  useEffect(() => {
    const video: any = videoRef.current;
    if (video) {
      video.src = "http://192.168.12.191:5003/video_feed";
      video.play();
    }
  }, [videoRef]);
  return (
    <IonPage>
      <IonContent fullscreen style={{ padding: 0, margin: 0, zoom: 0.61 }}>
        {/* <iframe
          src="http://192.168.12.190:5000/video_feed"
          style={{
            width: "102%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            border: "none",
            overflow: "hidden",
            cursor: "none"
          }}
          frameBorder="0"
          allowFullScreen
        /> */}
      </IonContent>
    </IonPage>
  );
};

export default Camera;
