const express = require("express");
const nsq = require("nsqjs");
const app = express();
const port = 3000;

const reader = new nsq.Reader("test", "test", {
  lookupdHTTPAddresses: "nsqlookupd:4161",
});

reader.connect();

reader.on("message", (msg) => {
  console.log("Received message [%s]: %s", msg.id, msg.body.toString());
  msg.finish();
});

reader.on("nsqd_connected", () => {
  console.log("nsqd_connected");
});

reader.on("ready", () => {
  console.log("reader ready");
});
reader.on("error", (err) => {
  console.log({ err });
});

app.listen(port, () =>
  console.log(`NSQ Consumer is listening on port ${port}!`)
);
