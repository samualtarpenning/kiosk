<h3>Smart Garden UI - React SPA on Raspberry Pi</h3> <br/>
This React-based single-page application (SPA) runs on a Raspberry Pi with a touchscreen, providing a UI for controlling and monitoring a Smart Garden. The app displays real-time sensor data and allows interaction with garden elements.

<h3>Features:</h3>
<b>Live Sensor Feed:</b> Displays real-time data (e.g., soil moisture, temperature, humidity) via WebSockets and Redux. <br/>
<b>Data Storage:</b> Sensor data is stored in an SQLite database for later reporting and analysis. <br/>
<b>Interactive UI:</b> Optimized for touchscreen, offering easy access to controls and data visualizations with Redux.
<h4>Tech Stack</h4>
<b>Frontend:</b> React, WebSocket(Signal R) for live data, Redux for state management<br/>
<b>Backend:</b> C# WebSocket server, SQLite for data storage<br/>
<b>Hardware:</b> Raspberry Pi with touchscreen(Frontend), Esp8266 for reading sensor data, and a Raspberry pi running Ubunutu for the backend




