import _heroesService from "../Services/HeroesService.js";
import store from "../store.js";
import Hero from "../Models/Heroes.js";

//Private
function _drawActiveHero() {

  document.getElementById("heroInfo").innerHTML = store.State.activeHeroes.Template
  // console.log(heroes);

}
function _drawMyHeroes() {
  let template = ""
  let heroes = store.State.myHeroes;
  heroes.forEach(hero => template += hero.Template)
  document.getElementById("myHeroes").innerHTML = template
}

function _drawHeroes() {
  let template = ""
  store.State.heroes.forEach(hero => template += Hero.getHero(hero.name))
  document.getElementById("heroes").innerHTML = template
}

//Public
export default class HeroesController {
  constructor() {
    store.subscribe("heroes", _drawHeroes);
    store.subscribe('activeHeroes', _drawActiveHero)
    store.subscribe("myHeroes", _drawMyHeroes)
    _heroesService.getHero()
  }
  getHeroInfo(heroName) {
    _heroesService.getHeroInfo(heroName)
  }
  addHero(heroName) {
    _heroesService.addHero(heroName)
  }
  deleteHero(heroId) {
    _heroesService.deleteHero(heroId)
  }

}
