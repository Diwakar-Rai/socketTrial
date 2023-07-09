import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const Trainee = () => {
  let [message, setMessage] = useState();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let stompClient = null;

    // Create a SockJS instance
    const socket = new SockJS("http://localhost:8080/stomp-endpoint");

    // Create a Stomp client over the SockJS connection
    stompClient = Stomp.over(socket);

    // Connect to the WebSocket server
    stompClient.connect({}, () => {
      // Set the connection status to true
      setIsConnected(true);

      // Subscribe to a destination
      stompClient.subscribe("/assign/recive-task", message => {
        // Handle incoming messages
        let parsed = JSON.parse(message);
        console.log("Received message:", parsed);
      });
    });

    // Cleanup function
    return () => {
      // Disconnect from the WebSocket server
      if (stompClient) {
        stompClient.disconnect();
        setIsConnected(false);
      }
    };
  }, []);

  return (
    <div>
      <h1>Trainee</h1>
    </div>
  );
};

export default Trainee;
