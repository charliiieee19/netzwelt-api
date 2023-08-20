const express = require("express");
const app = express();
const server = require("http").createServer(app);
const jwt = require("jsonwebtoken");
const cors = require("cors");
const _key = "netzwelt-exam-gdfjhgkjdfhjhshdjahsjkdhjsd84357839457939485";

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.send("Hello World");
});

app.post("/api/generate-token", (req, res) => {
   const token = jwt.sign(
      {
         data: req.body?.session,
      },
      _key,
      { expiresIn: 60 * 60 }
   );
   res.json({ token: token });
});

app.post("/api/verify-token", (req, res) => {
   const token = req.headers.authorization.split(" ")[1];
   try {
      var decoded = jwt.verify(token, _key);
      return res.json({ success: true, data: decoded });
   } catch (err) {
      return res.status(401).json({ success: false, message: err });
   }
});

server.listen(3000, () => console.log("Connected"));
