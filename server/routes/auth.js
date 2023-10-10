const router = require("express").Router();
const { prismadb } = require("../db");
const bcrypt = required("bcrypt");
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
router.post(
  "/signup",
  [
    check("email", "Please input a valid email").isEmail(),
    check("password", "Passwords must have at leat 6 characters").isLength({
      min: 6,
    }),
    check("username", "Username must have at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //Validate Input
    //Validate that the user don't already exist
    //Hash the password
    //Save the user
    //Return a JWT
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, username } = req.body;

    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "This user already exists" }] });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prismadb.user.create({
      data: { email, password: hashedPassword, username },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    const token = await JWT.sign(newUser, process.env.JSON_WEB_TOKEN_SECRET, {
      expriesIn: 3600000,
    });
    return res.json({ user: newUser, token });
  }
);
router.post("/login", async (req, res) => {
  //Validate that the user does exist
  //Validate that the password is correct
  //Return a JWT

  const { email, password } = req.body;
  const user = await prismadb.user.findUnique({
    where: {
      email,
    },
  });
  const isMatch = bcrypt.compare(password, user.password);
  if (!user || !isMatch) {
    return res.status(400).json({ errors: [{ msg: "Invalid credentials!" }] });
  }
  /*  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: "Invalid credentials!" }] });
  } */
  const userPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  const token = await JWT.sign(userPayload, process.env.JSON_WEB_TOKEN_SECRET, {
    expriesIn: 3600000,
  });
  return res.json({
    user: userPayload,
    token,
  });
});

router.get("/me", async (req, res) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return res.send(null);
  const jwt = bearerToken.split("Bearer ")[1];
  if (!jwt) return res.send(null);
  let payload;
  try {
    payload = await JWT.verify(jwt, process.env.JSON_WEB_TOKEN_SECRET);
  } catch (error) {
    return res.send(null);
  }

  const user = await prismadb.user.findUnique({
    where: { email: payload.email },
    select: {
      id: true,
      email: true,
      username: true,
    },
  });

  return res.json(user);
});

module.exports = router;
