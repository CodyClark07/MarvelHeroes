import store from "../store.js";
import Hero from "../Models/Heroes.js";


const _marvelApi = axios.create({
    baseURL: 'https://gateway.marvel.com:443/v1/public/',
    timeout: 3000
})
const _sandBoxApi = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/codyc/',
    timeout: 15000
})
class HeroesService {

    getHero() {
        _marvelApi.get("characters?apikey=2148bbf76c5acd7c1b486d33517c8d71&limit=100").then(res => {
            console.log(res.data.data.results)
            // console.log(res)
            let heroes = res.data.data.results.map(rawHeroData => new Hero(rawHeroData))
            store.commit("heroes", heroes)

        }).catch(err => console.error(err))
    }
    getHeroInfo(heroName) {
        let foundHero = store.State.heroes.find(h => h.name == heroName)
        store.commit("activeHeroes", foundHero)
    }
    addHero(heroId) {
        _sandBoxApi.post("heroes", store.State.heroes.find(h => h._id == heroId)).then(res => {
            console.log(res)
            this.getMyHeroes()
        }).catch(err => console.error(err))
    }
    getMyHeroes() {
        _sandBoxApi.get("heroes").then(res => {
            store.commit("myHeroes", res.data.data.map(rawHeroData => new Hero(rawHeroData)))
        }).catch(err => console.error(err))
    }
}



const service = new HeroesService();
export default service;
