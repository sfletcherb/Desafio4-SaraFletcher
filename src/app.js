const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const socket = require("socket.io");
const {
  readProducts,
  deleteProduct,
  updateProductByCode,
} = require("./utils/get.products.js");
const viewsRouter = require("./routes/views.router.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

const app = express();
const PUERTO = 8080;

//Set up Express Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//Routes:
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//Listen: (save reference of server)
const httpServer = app.listen(PUERTO, () => {
  console.log(`listening on ${PUERTO}`);
});

//Socket.io: (set up socket)
const io = socket(httpServer);

// emit: emitir con on: escuchar

io.on("connection", async (socket) => {
  console.log("A client has connected");

  socket.on("saludito", (x) => {
    console.log(x);
  });

  try {
    const data = await readProducts();
    socket.emit("dataProducts", data);
  } catch (error) {
    console.log("could not read ", error);
    throw error;
  }

  socket.on("deleteProduct", async (productId) => {
    try {
      await deleteProduct(parseInt(productId));
    } catch (error) {
      console.log("could not delete ", error);
      throw error;
    }
  });

  socket.on("updateProduct", async (data) => {
    const newData = data;
    const codeData = data.code;

    try {
      await updateProductByCode(newData, codeData);
    } catch (error) {
      console.log("could not update ", error);
      throw error;
    }
  });
});
