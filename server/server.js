const express = require("express");
const Users = require("./models/users.js");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const users = require("./models/users.js");
const helmet = require("helmet");
const checkRouter = require("./routes/check.router.js");
const { server_passcode } = require("./models/config.model.js");
const history = require("./models/history.model.js");

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(helmet());

const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;

app.use(express.json());

app.use(helmet());

app.post("/user", async (req, res) => {
  const { email, password, passcode, firstName, lastName, phone } = req.body;
  const uuid = crypto.randomUUID();
  const isExist = await users.findOne({ email });
  console.log(server_passcode);
  if (req.headers.authorization === server_passcode) {
    if (isExist) {
      res.json({
        success: false,
        message: "This email (" + email + ") is exist",
      });
    } else {
      const token = jwt.sign(uuid, "aysgaxtnabaryanhnaregushakel");

      const generateSpecificBankCode = (prefix, length) => {
        const characters = "0123456789";
        let bankCode = prefix || "";

        for (let i = 0; i < length - (prefix ? prefix.length : 0); i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          bankCode += characters[randomIndex];
        }

        return bankCode;
      };

      const account = generateSpecificBankCode("SB", 9);

      const newUser = await Users.create({
        uuid,
        email,
        account,
        password,
        passcode,
        firstName,
        lastName,
        phoneNumber: phone,
      });
      res.send({
        user: newUser,
        success: 1,
        message: "User added successfully",
        data: { token },
      });
    }
  } else {
    res.json({ message: "incorrect Auth code" });
  }
});

app.post("/account", async (req, res) => {
  const { accountId, amount, client } = req.body;

  try {
    const user = await users.findOne({ account: accountId });
    const clientAccount = await users.findOne({ account: client });

    if (client !== accountId) {
      if (user && clientAccount) {
        const transferAmount = parseInt(amount);

        if (clientAccount.balance >= transferAmount) {
          const userNewBalance = user.balance + transferAmount;
          const clientNewBalance = clientAccount.balance - transferAmount;

          const isUpdate = await users.findOneAndUpdate(
            { account: user.account },
            { balance: userNewBalance },
          );

          const clientUpdated = await users.findOneAndUpdate(
            { account: clientAccount.account },
            { balance: clientNewBalance },
          );

          if (isUpdate && clientUpdated) {
            const j = await history.create({
              from: clientAccount.uuid,
              to: user.uuid,
              amount: amount,
              status: "send",
              outgoing_user: user,
              incoming_user: clientAccount,
            });
            res.status(200).send({
              message: "Transfer completed successfully!",
              success: true,
              receipter: j._id,
            });
          } else {
            res
              .status(200)
              .send({ message: "Error updating accounts", success: false });
          }
        } else {
          res.status(200).send({
            message:
              "Insufficient balance in client account $" +
              clientAccount.balance,
            success: false,
          });
        }
      } else {
        res.status(200).send({
          message: "User or client account not found",
          success: false,
        });
      }
    } else {
      res.status(200).send({
        message: "Cannot transfer to the same account",
        success: false,
      });
    }
  } catch (error) {
    res
      .status(200)
      .send({ message: "Server error", success: false, error: error.message });
  }
});
app.post("/receipt", async (req, res) => {
  const { receipt_identificator } = req.body;
  const receipt = await history.findOne({ _id: receipt_identificator });
  if (receipt) {
    res.send({ receipt });
  } else {
    res.send({ message: "Receipt not fount", success: false });
  }
});

app.get("/api/history", async (req, res) => {
  const histories = await history.find({});
  res.send(histories);
});

app.get("/api/history/:uuid", async (req, res) => {
  const { uuid } = req.params;

  try {
    const user = await users.findOne({ uuid });
    if (user) {
      let result = await history.find({ $or: [{ from: uuid }, { to: uuid }] });
      result = result.map((doc) => ({
        ...doc.toObject(),
        sent: true,
        outgoing: doc.from === uuid,
      }));
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "No history found for this user" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error finding document:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const isExist = await users.findOne({ email, password });
  if (isExist) {
    const token = jwt.sign(isExist.uuid, "aysgaxtnabaryanhnaregushakel");
    res.send({
      message: "You successfully logged in",
      success: true,
      auth: { token },
    });
    console.log(isExist);
  } else {
    res.send({ message: "This account not found", success: false });
  }
});

app.post("/fp", async (req, res) => {
  const { email, newPassword } = req.body;
  const checkEmail = await users.findOne({ email });
  if (checkEmail) {
    const updated = await users.findOneAndUpdate(
      { email },
      { password: newPassword },
    );
    res.json({ updated });
  }
});

app.get("/jwt/:jwtoken", async (req, res) => {
  const { jwtoken } = req.params;
  const { authorization } = req.headers;
  if (authorization === server_passcode) {
    const uuid = await jwt.decode(jwtoken, "aysgaxtnabaryanhnaregushakel");
    const user = await users.findOne({ uuid });
    res.send({ jwtoken, user });
  } else {
    res.send({ message: "incorrect Auth code" });
  }
});

app.get("/users", async (req, res) => {
  const user = await users.find({});
  res.send({ users: user });
});

app.use("/check", checkRouter);

app.post("/send-code", async (req, res) => {
  const { email, verifyCode } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "antonyancoding@gmail.com",
      pass: "wzyq koiw hlqk dlbo",
    },
  });

  const info = await transporter.sendMail({
    from: '"Swift Bank" <antonyancoding@gmail.com>',
    to: email,
    subject: "Verification Code ✔",
    html: `<center><h1>Welcome to Swift Bank!</h1></center>
        <br>
        <center><h3 style="line-height:27px">
        Your <span style="color:#fff;background:#ffb700;padding:3px 10px;font-size:14px;border-radius:4px">Swift Bank</span> verification code is ${verifyCode}</h3>`,
  });

  console.log("Message sent: %s", info.messageId);
  res.send({
    messageId: info.messageId,
    success: info.messageId ? true : false,
    message: "Code",
  });
});

app.get("/account:identificator_id", async (req, res) => {
  const { identificator_id } = req.params;
  const user = await users.findOne({ account: identificator_id });
  if (user) {
    res.send({ user });
  } else {
    res.send({ success: 404, message: "User not found" });
  }
});

app.get("/api/data", (req, res) => {
  res.send({ message: "Not found" });
});

app.post("/checkout", async (req, res) => {
  const { accountId, amount, password, client } = req.body;

  try {
    const user = await users.findOne({ account: accountId });
    const clientAccount = await users.findOne({ account: client, password });

    if (client !== accountId) {
      if (user && clientAccount) {
        const transferAmount = parseInt(amount);

        if (clientAccount.balance >= transferAmount) {
          const userNewBalance = user.balance + transferAmount;
          const clientNewBalance = clientAccount.balance - transferAmount;

          const isUpdate = await users.findOneAndUpdate(
            { account: user.account },
            { balance: userNewBalance },
          );

          const clientUpdated = await users.findOneAndUpdate(
            { account: clientAccount.account },
            { balance: clientNewBalance },
          );

          if (isUpdate && clientUpdated) {
            const j = await history.create({
              from: clientAccount.uuid,
              to: user.uuid,
              amount: amount,
              status: "send",
              outgoing_user: user,
              incoming_user: clientAccount,
            });
            res.status(200).send({
              message: "Transfer completed successfully!",
              success: true,
              receipter: j._id,
            });
          } else {
            res
              .status(200)
              .send({ message: "Error updating accounts", success: false });
          }
        } else {
          res.status(200).send({
            message:
              "Insufficient balance in client account $" +
              clientAccount.balance,
            success: false,
          });
        }
      } else {
        res.status(200).send({
          message: "User or client account not found",
          success: false,
        });
      }
    } else {
      res.status(200).send({
        message: "Cannot transfer to the same account",
        success: false,
      });
    }
  } catch (error) {
    res
      .status(200)
      .send({ message: "Server error", success: false, error: error.message });
  }
});

const startServer = async () => {
  const { SERVER_PASSCODE, MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_HASH, MONGO_CLUSTER_2, MONGO_DB, SERVER_PORT } = process.env;
  if (!SERVER_PASSCODE || !MONGO_USER ||
    !MONGO_PASSWORD || !MONGO_CLUSTER ||
    !MONGO_HASH || !MONGO_CLUSTER_2 ||
    !MONGO_DB || !SERVER_PORT
  ) {
    console.log("Environment variables not found, try again");
    return;
  }


  try {
    const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.${MONGO_HASH}.mongodb.net/?retryWrites=true&w=majority&appName=${MONGO_CLUSTER_2}/${MONGO_DB}`;
    await mongoose.connect(
      url
    );

    app.listen(SERVER_PORT, () => {
      console.log("Server initialized on port ");
    });
  } catch (err) {
    console.error("Mongo Connection Error! => ", err);
  }
};

startServer();
