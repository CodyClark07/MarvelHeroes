export default class Hero {
    constructor(data) {
        this._id = data._id
        this.name = data.name
        this.img = data.img || data.thumbnail.path + "." + data.thumbnail.extension
        this.description = data.description || "undefined"
        this.user = data.user
    }

    get Template() {
        let template = /* html */ `
        <div class=" border border-rounded shadow-lg text-center">
        <h2>Name: ${this.name}</h2>
        <h2>Description: ${this.description}</h2>
        <img class="img-thumbnail" src="${this.img}" alt="">
        </div>
        `
        if (this.user) {
            template += `
            <button class="btn btn-danger my-0 rounded-0 btn-block btn-sm" onclick="app.heroesController.deleteHero('${this._id}')">Release</button>
            </div>
            `
        }
        else {
            template += `
            <button class="btn btn-success my-0 rounded-0 btn-block btn-sm" onclick="app.heroesController.addHero('${this._id}')">Add to Team</button>
            </div>
            `
        }
        return template
    }
    static getHero(name) {
        return `<button class="btn btn-info btn-block btn-lg text-capitalize my-2" onclick="app.heroesController.getHeroInfo('${name}')">${name}</button>`
    }
}