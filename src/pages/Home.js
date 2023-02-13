import styles from "./Common.module.css";

import React, { useState, useEffect, useRef } from "react";

import BLE from "./BLE";

import LineGraph from "../components/LineGraph";

const ble = new BLE();

const lineGraph = new LineGraph(0, 0, 300, 100, "white");
lineGraph.setLineWidth(1);
lineGraph.setXScale(1);

export default function Home({ ...props }) {
  const canvasRef = useRef();

  const [supported, setSupported] = useState(false);
  const [connected, setConnected] = useState(false);
  const [gattServer, setGattServer] = useState(null);
  const [buffer, setBuffer] = useState([]);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    if (navigator.bluetooth) {
      setSupported(true);
    } else {
      setSupported(false);
    }

    console.log(navigator.bluetooth);
  }, []);

  useEffect(() => {
    // console.log("depth", depth);

    lineGraph.add(depth);

    canvasRef.current.with = lineGraph.width;
    canvasRef.current.height = lineGraph.height;

    lineGraph.draw(canvasRef.current.getContext("2d"));
  }, [depth]);

  useEffect(() => {
    console.log("buffer", buffer);
  }, [buffer]);

  useEffect(() => {
    console.log("gattServer", gattServer);

    console.log("gattServer", gattServer?.connected);
  }, [gattServer]);

  const connect = () => {
    ble
      .requestDevice(onDisconnected)
      .then((device) => ble.connect())
      .then((device) => {
        console.log("Device is connected.");

        setGattServer(device);

        setConnected(true);

        ble.startDataNotifications((event) => {
          if (event.target.value.getUint8(4) === 55) {
            setBuffer([event.target.value.getUint8(0), event.target.value.getUint8(1), event.target.value.getUint8(2), event.target.value.getUint8(3), event.target.value.getUint8(4)]);

            setDepth((Number(event.target.value.getUint8(0)) * 100) / 100);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const write = (e) => {
    const response = Uint8Array.of(0, 0, 0, depth, 255);

    console.log(response);

    ble.writeData(response);
  };

  const disconnect = () => {
    ble.disconnect();

    setConnected(false);
  };

  const onDisconnected = () => {
    setConnected(false);

    console.log("Device is disconnected.");
  };

  const handleClick = (e) => {
    if (!connected) {
      connect();
    } else {
      disconnect();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <button className="button" name="connect" onClick={handleClick}>
          {connected ? "disconnect" : "connect"}
        </button>
        <button className="button" name="write" onClick={write}>
          write
        </button>
      </div>
      <div className={styles.content}>
        {!supported && <div className={styles.info}>BLE devices are not supported.</div>}
        <div className={styles.note}>
          <ul title="Summary">
            <li>{connected ? "Connected" : "Disconnected"}</li>
            <li>{gattServer?.connected ? "Connected" : "Disconnected"}</li>
            <li>{gattServer?.device.id ?? "id"}</li>
            <li>{gattServer?.device.name ?? "name"}</li>
            <li>{buffer.join("-") ?? "buffer"}</li>
          </ul>
        </div>
        <div className={styles.info}>{supported && depth}</div>
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
      </div>
    </div>
  );
}
