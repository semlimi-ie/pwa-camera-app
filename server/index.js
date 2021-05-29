// dependencies
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const admin = require("firebase-admin");
let inspect = require("util").inspect;
let Busboy = require("busboy");
let path = require("path");
let os = require("os");
let fs = require("fs");
let UUID = require("uuid-v4");

// config - express
const app = express();

app.use(cors());
// app.use((req, res, next) => {
//   // req.headers["content-type"] = "multipart/form-data; boundary=------border";
//   res.setHeader()
//   next();
// });

// config - firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "pwagram-74576.appspot.com",
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// endpoint - posts
app.get("/posts", async (request, response) => {
  // response.set("Access-Control-Allow_Origin", "*");

  let posts = [];

  const snapshot = await db.collection("posts").orderBy("date", "desc").get();
  snapshot.forEach((doc) => {
    posts.push(doc.data());
  });
  response.send(posts);
});

app.post("/createPost", (request, response) => {
  let uuid = UUID();
  let newPost = request.body;
  // console.log("request.body", request.body);
  // console.log("request.headers", request.headers);
  // response.send(newPost);

  let busboy = new Busboy({ headers: request.headers });

  let fields = {};
  let fileData = {};

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    console.log(
      "File [" +
        fieldname +
        "]: filename: " +
        filename +
        ", encoding: " +
        encoding +
        ", mimetype: " +
        mimetype
    );
    // /tmp/4564564-234234.png file
    let filepath = path.join(os.tmpdir(), filename);

    // Grab the data from the file and transfer that data from file to the tmp folder file (4564564-234234.png file)
    file.pipe(fs.createWriteStream(filepath));
    fileData = { filepath, mimetype };

    // file.on("data", function (data) {
    //   console.log("File [" + fieldname + "] got " + data.length + " bytes");
    // });
    // file.on("end", function () {
    //   console.log("File [" + fieldname + "] Finished");
    // });
  });

  busboy.on(
    "field",
    function (
      fieldname,
      val,
      fieldnameTruncated,
      valTruncated,
      encoding,
      mimetype
    ) {
      fields[fieldname] = val;
    }
  );

  busboy.on("finish", function () {
    bucket.upload(
      fileData.filepath,
      {
        uploadType: "media",
        metadata: {
          metadata: {
            contentType: fileData.mimetype,
            firebaseStorageDownloadTokens: uuid,
          },
        },
      },
      // triggered if upload succeeded or failed
      (err, uploadedFile) => {
        if (!err) {
          // create document in our firestore database only once image file is uploaded to our storage bucket successfully
          createDocument(uploadedFile);
        }
      }
    );

    function createDocument(uploadedFile) {
      db.collection("posts")
        .doc(fields.id)
        .set({
          ...fields,
          date: parseInt(fields.date),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`,
        })
        .then(() => {
          response.send("Post added: " + fields.id);
        });
    }

    // response.writeHead(303, { Connection: "close", Location: "/" });
    // response.send("Done parsing form");
  });
  request.pipe(busboy);
  // response.send(request.headers);
});

// listen
app.listen(process.env.PORT || 5000);
