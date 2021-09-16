const express = require("express");
const path = require("path")
const session = require("express-session");
const routes = require("./routes");
const sequelize = require("./config/connections");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: "special secret",
    cookie: {},
    resave: false,
    saveinitialized: true,
    // store: new SequelizeStore({
    //     db: sequelize
    // })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//turn routes on
app.use(routes);

// turn on connection to db server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT,() => console.log(`Now Listening on ${PORT}`));
});

