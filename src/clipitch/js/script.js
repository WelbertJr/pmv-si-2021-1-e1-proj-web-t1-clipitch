import criaBancoDeDados from "./banco.js";
import {searchClips} from "./banco.js";


// Constantes, Parâmetros e Funções Necessárias para Requisição da API do Twitch e Armazenamento dos Dados
const URL_AUTH = "https://id.twitch.tv/oauth2/token";
const URL_CLIPS = "https://api.twitch.tv/kraken/clips/top";
const LIMIT = 100;
const CLIENT_ID = "j1c6sfsv12hl349hh871nneegu8frw";
const CLIENT_SECRET = "4bvj20srxq1dxrtzid7szsobm3jbcl";

// Cabeçalho necessário para autenticação e obtenção do Token
const PARAMS_AUTH = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Origin: "",
  },
  body: JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "client_credentials",
  }),
};

// Cabeçalho necessário para obtenção dos clips

// Parâmetros opcionais para customização na busca dos dados da API do Twitch
const PARAMS_CLIPS = {
  first: 0,
  after: null,
  limit: LIMIT,
  period: "week",
  trending: false,
};

// Realiza a autenticação para obter o token de acesso da API V5 (Twitch.tv)
const conectaTwitch = () => {
  fetch(URL_AUTH, PARAMS_AUTH)
    .then((res) => res.json())
    .then((res) => {
      const access_token = res.access_token;

      getTwitchDados(access_token, URL_CLIPS, PARAMS_CLIPS);
    })
    .catch((err) => {
      console.log("Erro ao autenticar!!!", err);
    });
};

document.getElementById("search-button").onclick = (e) => searchClick();
var searchValue;

function searchFilter() {
  var url_string = window.location.href
  var url = new URL(url_string);
  var parameter = url.searchParams.get("search");
  searchClips(parameter); 
}

function searchClick() {
  searchValue = document.getElementById("searchValue").value;

  if (searchValue != "") {
    window.location = '/player_detail?username=' + name;
    window.location = 'search.html?search=' + searchValue;
  } else alert("Por favor, selecione uma das opções para pesquisar!");
}

document.addEventListener("DOMContentLoaded", conectaTwitch);

export default { conectaTwitch, getTwitchDados};
export { searchFilter };
