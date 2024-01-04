const Item = require(__dirname + "/Item.js");
const Mode = require(__dirname + "/Mode.js");
const utils = require(__dirname + "/utils.js");

class ItemController {
    async add(mode, name) {
        const title = mode.title;
        name = name.trim();
        if (name === "") {
            return undefined;
        }

        let item = new Item({
            name: name,
            mode: mode
        });
        await item.save();
    }

    async getAll() {
        return await Item.find({}).populate('mode');
    }

    async get(mode) {
        const items = await Item.find({ mode: mode }).populate('mode');
        if (items === undefined) {
            return [];
        }
        return items;
    }

    async getNames(mode) {
        const items = await this.get(mode);
        return items.map(item => item.name);
    }

    async getIds(mode) {
        const items = await Item.find({ mode: mode }).populate('mode');
        return items.map(item => utils.prefixId(item.id));
    }

    async getChecked(mode) {
        const items = await Item.find({ mode: mode }).populate('mode');
        return items.map(item => item.checked);
    }

    async printAll() {
        const items = await this.getAll();
        items.forEach(item => console.log("id = " + item.id + ", name = " + item.name));
    }

    async check(id) {
        id = utils.parseId(id);
        const item = await Item.findById(id);
        item.checked = !item.checked;
        await item.save();
    }

    async delete(id) {
        id = utils.parseId(id);
        await Item.deleteOne({ _id: id });
    }

    async deleteByMode(mode) {
        await Item.deleteMany({ mode: mode });
    }

    async deleteAll() {
        await Item.deleteMany({});
    }
}

module.exports = ItemController;