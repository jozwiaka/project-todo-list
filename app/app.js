const __modules = __dirname + "/modules";

// const uri = "mongodb://127.0.0.1:27017/todolistDB";
const uri = "mongodb://db-service:27017/todolistDB";
const port = 3000;

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__modules + "/date.js");
const Mode = require(__modules + "/Mode.js");
const ModeController = require(__modules + "/ModeController.js");
const ItemController = require(__modules + "/ItemController.js");
const Item = require(__modules + "/Item.js");
const db = require(__modules + "/db.js");
const utils = require(__modules + "/utils.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // /public/

let modeController = undefined;
let itemController = undefined;
let currentMode = undefined;

//--------------------------------------------------------- 
//--------------------------------------------------------- 
app.listen(process.env.PORT || 3000, () => {
    (async () => {
        db.connect(uri);
        modeController = new ModeController();
        itemController = new ItemController();
        // await modeController.deleteAll();
        // await itemController.deleteAll();
        await modeController.add(date.today());
        currentMode = await modeController.getByTitle(date.today());
        utils.info("Server is running on port " + port);
    })();
});

app.get("/", (req, res) => {
    res.redirect(currentMode.route);
});

app.post("/new-item", (req, res) => {
    (async () => {
        await itemController.add(currentMode, req.body.newItem);
        res.redirect(currentMode.route);
    })();
});

app.post("/new-mode", (req, res) => {
    (async () => {
        await modeController.add(req.body.newMode);
        res.redirect(currentMode.route);
    })();

});

app.post("/modes-form", (req, res) => {
    (async () => {

        if (utils.valid(req.body.setMode)) {
            currentMode = await modeController.get(req.body.setMode);
        }
        if (utils.valid(req.body.deleteMode)) {

            let modeToDelete = await modeController.get(req.body.deleteMode);
            await itemController.deleteByMode(modeToDelete);
            await modeController.delete(req.body.deleteMode);
            if (!(utils.valid(await modeController.getFirst()))) {
                await modeController.add(date.today());
            }
            if (!(utils.valid(await modeController.get(currentMode.id)))) {
                currentMode = await modeController.getFirst();
            }
        }
        res.redirect(currentMode.route)
    })();
});
app.post("/items-form", (req, res) => {
    (async () => {
        if (utils.valid(req.body.checkItem)) {
            await itemController.check(req.body.checkItem);
        }
        if (utils.valid(req.body.deleteItem)) {
            await itemController.delete(req.body.deleteItem);
        }
        res.redirect(currentMode.route)
    })();
});

function setRoute(req, res, next) {
    req.route = currentMode.route;
    next();
}

app.get("/:route", setRoute, (req, res) => {
    (async () => {
        const modesIds = await modeController.getIds();
        const modesTitles = await modeController.getTitles();

        const itemsIds = await itemController.getIds(currentMode);
        const itemsNames = await itemController.getNames(currentMode);
        const itemsChecked = await itemController.getChecked(currentMode);

        res.render("index", {
            modesIds: modesIds,
            modeId: await modeController.getId(currentMode),
            modesTitles: modesTitles,
            modeTitle: currentMode.title,
            itemsIds: itemsIds,
            itemsNames: itemsNames,
            itemsChecked: itemsChecked
        });
    })();
});

app.get("/about", (req, res) => {
    res.render("about");
});
