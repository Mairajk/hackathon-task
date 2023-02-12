////===============>> starting  <<=============\\\\

import express from "express";
import cors from "cors";
import path from "path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { stringToHash, varifyHash } from "bcrypt-inzi";
import { customAlphabet } from 'nanoid'
import multer from "multer";
import fs from "fs";
import moment from 'moment';


//-----------------------------------------------------

import bucket from "./firebase/index.mjs";
import { userModel, productModel, orderModel } from "./model.mjs";

//----------------Controllers----------------------------------------

import { signupController } from "./controllers/signupController.mjs";
//--------------------------------------------------------

const SECRET = process.env.SECRET || "security";
const adminEmail = process.env.email || 'admin@gmail.com'

const app = express();

const port = process.env.PORT || 5001;


// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);


//   TODO: =======>  optimize signup API & (optimize code OR add socket-io )  (08-02-2023)

//////////////////  SIGNUP API ////////////////////////////////////

app.post("/api/v1/signup", async (request, response) => {
  let body = request.body;

  if (!body.firstName || !body.phoneNumber || !body.email || !body.password) {
    response.status(400).send({
      message: `required fields missing, example request : 
            {
               fullName : 'Mairaj Khan',
                phoneNumber : '+92311*******',
                email : 'abc@123.com',
                password : '*******'
            }`,
    });
    return;
  }
  // console.log('=======================>');

  body.email = body.email.toLowerCase();



  await userModel.findOne({ email: body.email }, (err, user) => {
    if (!err) {
      console.log("user ===> ", user);

      if (user) {
        console.log("user exist already ===>", user);

        response.status(400).send({
          message: "this email is already exist please try a different one.",
        });
        return;
      } else {
        stringToHash(body.password).then((hashedPassword) => {
          userModel.create(
            {
              fullName: body.fullName,
              phoneNumber: body.phoneNumber,
              email: body.email,
              password: hashedPassword,
            },
            (err, user) => {
              if (!err) {
                console.log("user created ==> ", user);

                response.status(201).send({
                  message: "user created successfully",
                  data: user,
                });
              } else {
                console.log("server error: ", err);
                response.status(500).send({
                  message: "server error",
                  error: err,
                });
              }
            }
          );
        });
      }
    } else {
      console.log("error ===> ", err);
      response.status(500).send({
        message: "server error",
        error: err,
      });
      return;
    }
  });
  // console.log('second =================>');
});
//////////////////////////////////////////////////////////////////

//////////////////  LOGIN API ////////////////////////////////////

app.post("/api/v1/login", (req, res) => {
  let body = req.body;
  let isAdmin = false;
  body.email = body.email.toLowerCase();

  if (!body.password || !body.email) {
    res.status(400).send({
      message: `some thing is missing in required fields `,
      example: `here is a request example :
             {
                email: "abc@123.com",
                password: "*******"
             } `,
    });
    return;
  }

  userModel.findOne(
    { email: body.email },
    "email password firstName lastName",
    (err, user) => {
      if (!err) {
        console.log("user ===> ", user);

        if (user) {
          varifyHash(body.password, user.password).then((isMatch) => {
            console.log("isMatch ===>", isMatch);
            if (isMatch) {
              const token = jwt.sign(
                {
                  id: user._id,
                  email: body.email,
                  iat: Math.floor(Date.now() / 1000) - 30,
                  exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                },
                SECRET
              );

              console.log("token ===> ", token);

              res.cookie("Token", token, {
                maxAge: 86_400_000,
                httpOnly: true,
              });

              (user.email === adminEmail) ? isAdmin = true : isAdmin = false

              res.send({
                message: "logedin successfully",
                userProfile: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  _id: user._id,
                  isAdmin

                },
              });
              return;
            } else {
              console.log("password did not match");
              res.status(401).send({
                message: "wrong password",
              });
              return;
            }
          });
        } else {
          console.log("user not found");

          res.status(401).send({
            message: "incorrect email user does not exist",
          });
          return;
        }
      } else {
        console.log("server error ===>", err);
        res.status(500).send({
          message: "login failed, please try again later",
        });
        return;
      }
    }
  );
});
///////////////////////////////////////////////////////////////////

//////////////////  LOGOUT API ////////////////////////////////////

app.post("/api/v1/logout", (req, res) => {
  res.cookie("Token", "", {
    maxAge: 1,
    httpOnly: true,
  });

  res.send({
    message: "Logout successfully",
  });
});
///////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////

///////////////////////////***--- Auth Middleware ---***////////////////////////////////////////

app.use("/api/v1", (req, res, next) => {
  console.log("req.cookies: ", req.cookies);

  if (!req?.cookies?.Token) {
    res.status(401).send({
      message: "include http-only credentials with every request",
    });
    return;
  }

  jwt.verify(req.cookies.Token, SECRET, (err, decodedData) => {
    if (!err) {
      console.log("decodedData: ", decodedData);

      const nowDate = new Date().getTime() / 1000;

      if (decodedData.exp < nowDate) {
        res.status(401);
        res.cookie("Token", "", {
          maxAge: 1,
          httpOnly: true,
        });
        res.send({ message: "token expired" });
      } else {
        console.log("token approved");

        req.body.token = decodedData;
        next();
      }
    } else {
      res.status(401).send("invalid token");
    }
  });
});

///////////////////////////////////////////////////////////////////////////////

///////////////////////////// Profile API //////////////////////////////////////

app.get("/api/v1/profile", (req, res) => {
  let body = req.body;
  console.log("req.cookies: ", req.cookies);

  if (!req?.cookies?.Token) {
    res.status(401).send({
      message: "include http-only credentials with every request",
    });
    return;
  }

  jwt.verify(req.cookies.Token, SECRET, (err, decodedData) => {
    if (!err) {
      console.log("decodedData: ", decodedData);

      const nowDate = new Date().getTime() / 1000;

      if (decodedData.exp < nowDate) {
        res.status(401);
        res.cookie("Token", "", {
          maxAge: 1,
          httpOnly: true,
        });

        res.send({ message: "token expired" });
      } else {
        console.log("token approved");

        (decodedData.email === adminEmail) ?

          res.send({
            isAdmin: true,
            email: decodedData.email
          })
          :
          res.send({
            isAdmin: false,
            email: decodedData.email
          })
      }
    } else {
      res.status(401).send("invalid token");
    }
  });
});

///////////////////////////////////////////////////////////////////////////////

//////////////////// API for order placement  //////////////////////////////////

app.post("/api/v1/order", (req, res) => {
  const body = req.body;

  if (!body.orderProducts) {
    res.status(400).send({
      message: "Atleast one prameter is required",
    });
    return;
  }
  orderModel.create(
    {
      orderProducts: body.orderProducts,
      userId: req?.cookies?.Token.id,
      date: new Date().toString(),
    },
    (err, post) => {
      if (!err) {
        res.status(201).send({
          message: "order placed successfully ",
        });
      } else {
        res.status(500).send({ message: "server error" });
      }
    }
  );
  /////////////////////////
});

///////////////////////////////////////////////////////////////////////////////


//////////////////// API to get all orders   //////////////////////////////////

app.get("/api/v1/order", async (req, res) => {
  const body = req.body;

  try {
    const orders = await orderModel.find({});

    if (!orders) {
      res.status(300).send({
        message: 'No orders found'
      })
      return
    }

    res.status(200).send({
      orders
    })

  } catch (error) {
    res.status(500).send({
      message: "something went wrong"
    })
    return
  }
  /////////////////////////
});

///////////////////////////////////////////////////////////////////////////////

//////////////////============= Multer ==================////////////////

const storageConfig = multer.diskStorage({
  destination: "./post-photos-uploads/",

  filename: (req, file, cb) => {
    console.log("mul-file: ", file);
    cb(null, `${new Date().getTime()} - ${file.originalname}`);
  },
});

const uploadMiddleware = multer({ storage: storageConfig });

///////////////////////////////////////////////////////////////////////////

app.post("/api/v1/product", uploadMiddleware.any(), (req, res) => {
  const body = req.body;

  if (!body.postText && !body.postImage) {
    res.status(400).send({
      message: "Atleast one prameter is required",
    });
    return;
  }
  bucket.upload(
    req.files[0].path,
    {
      destination: `postImages / ${req.files[0].filename}`,
    },
    (err, file, apiResponse) => {
      if (!err) {
        file
          .getSignedUrl({
            action: "read",
            expires: "03-09-2999",
          })
          .then((urlData, err) => {
            if (!err) {
              console.log("public downloadable url: ", urlData[0]);

              try {
                fs.unlinkSync(req.files[0].path);
              } catch (err) {
                console.error(err);
              }
              console.log("deleted  ======================================>");

              ///////////////////////
              postModel.create(
                {
                  postText: body.postText,
                  postImage: urlData[0],
                  userId: req?.cookies?.Token.id,
                  date: new Date().toString(),
                },
                (err, post) => {
                  if (!err) {
                    res.status(201).send({
                      message: "Post successfully added",
                      data: post,
                    });
                  } else {
                    res.status(500).send({ message: "server error" });
                  }
                }
              );
              /////////////////////////
            }
          });
      }
    }
  );
});

///////////////////////////////////////////////////////////////////////////////

//////////////////// all Products get API //////////////////////////////////

app.get("/api/v1/products", async (req, res) => {
  productModel.find({}, (err, data) => {
    if (!err) {
      res.send({
        message: "successfully get all posts :",
        data: data,
      });
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

///////////////////////////////////////////////////////////////////////////////

//////////////////// post Delete API //////////////////////////////////

app.delete("/api/v1/post/:id", (req, res) => {
  const id = req.params.id;

  postModel.deleteOne({ _id: id }, (err, deletedProduct) => {
    if (!err) {
      if (deletedProduct.deletedCount != 0) {
        res.send({
          message: "post deleted successfully",
          data: deletedProduct,
        });
      } else {
        res.status(404).send({
          message: "post did not found of this id : ",
          request_id: id,
        });
      }
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

///////////////////////////////////////////////////////////////////////////////

//////////////////// post Edit API //////////////////////////////////

app.put("/api/v1/post/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (!body.postText && !body.postImage) {
    res.status(400).send({
      message: "Atleast one prameter is required",
    });
    return;
  }

  try {
    let data = await postModel
      .findByIdAndUpdate(
        id,
        {
          postText: body.postText,
          postImage: body.image,
        },
        { new: true }
      )
      .exec();
    console.log(" updated data :===>", data);

    res.send({
      message: "product modified successfully",
      updated_Data: data,
    });
  } catch (err) {
    res.status(500).send({
      message: "server error",
    });
  }
});

///////////////////////////////////////////////////////////////////////////////

//////////////////// post Search API //////////////////////////////////

app.get("/api/v1/products/:name", (req, res) => {
  let findName = req.params.userName;

  postModel.find({ name: { $regex: `${findName}` } }, (err, data) => {
    if (!err) {
      if (data.length !== 0) {
        res.send({
          message: "successfully get all products :",
          data: data,
        });
      } else {
        res.status(404).send({
          message: "product not found",
        });
      }
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

const __dirname = path.resolve();

app.use("/", express.static(path.join(__dirname, "./web/build")));
app.use("*", express.static(path.join(__dirname, "./web/build/index.html")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
