const Item = require(__dirname + "/Item.js");
const Mode = require(__dirname + "/Mode.js");
const utils = require(__dirname + "/utils.js");

class ModeController {

    async add(title) {
        title = title.trim();
        if (title === "" || await this.getByTitle(title) != undefined) {
            return;
        }
        let mode = new Mode({
            title: title,
            route: "/" + title.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase()
        });
        await mode.save();
    }

    async getAll() {
        return await Mode.find({});
    }

    async getFirst() {
        let ids = await this.getIds()
        if (!(utils.valid(ids.length))) {
            return undefined;
        }
        return await this.get(ids[0]);
    }

    async getIds() {
        const modes = await this.getAll();
        return modes.map(mode => utils.prefixId(mode.id));
    }

    async getId(mode) {
        return utils.prefixId(mode.id);
    }

    async get(id) {
        id = utils.parseId(id)
        return await Mode.findOne({ _id: id });
    }
    async getByTitle(title) {
        return await Mode.findOne({ title: title });
    }

    async getRoutes() {
        const modes = await this.getAll();
        return modes.map(mode => mode.route);
    }

    async getTitles() {
        const modes = await this.getAll();
        return modes.map(mode => mode.title);
    }

    async printAll() {
        const modes = await this.getAll();
        modes.forEach(mode => console.log("id = " + mode.id + ", title = " + mode.title));
    }

    async delete(id) {
        id = utils.parseId(id);
        await Mode.deleteOne({ _id: id });
    }

    async deleteAll() {
        await Mode.deleteMany({});
    }
}

module.exports = ModeController;