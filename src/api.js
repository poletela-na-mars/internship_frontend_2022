import axios from "axios";
import {NUMBER_OF_ARTICLES} from "./components/main-page/MainPage";

const api = axios.create({
  baseURL: `https://hacker-news.firebaseio.com/v0/`,
  timeout: 10000,
  headers: {
    "Referrer-Policy": "origin-when-cross-origin"
  }
});

const getItemUrl = (it) => `item/${it}.json?print=pretty`;
const catchErrorInAxios = (error) => {
  if (!window.navigator.onLine && !error.response && error.code === "ERR_NETWORK") {
    console.log("no internet connection")
  }

  if (error.response) {
    // Запрос был сделан, и сервер ответил кодом состояния, который
    // выходит за пределы 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // Запрос был сделан, но ответ не получен
    // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
    // http.ClientRequest в node.js
    console.log(error.request);
  } else {
    // Произошло что-то при настройке запроса, вызвавшее ошибку
    console.log('Error', error.message);
  }
  console.log(error.config);
};

const getArticles = async () => {
  const newIds = await api.get(`newstories.json?print=pretty`).then(response => response.data.slice(0, NUMBER_OF_ARTICLES),
    error => catchErrorInAxios(error));
  const idsBodies = await Promise.all(newIds.map((it) => api.get(getItemUrl(it)))).catch(error => catchErrorInAxios(error));
  return idsBodies.map((it) => it.data);
};

const getArticle = async (id) => {
  return await api.get(getItemUrl(id)).then(response => response.data, error => catchErrorInAxios(error));
};

const getComments = async (ids) => {
  return await Promise.all(ids.map((it) => getArticle(it)));
};

const getCommentsTree = async (article) => {
  const comments = [];

  if (!article.hasOwnProperty(`kids`)) {
    return comments;
  } else {
    const commentsIds = article.kids;
    const commentsChild = await getComments(commentsIds);
    for (const it of commentsChild) {
      const subChildTree = await addNestedChildren(it);
      comments.push(subChildTree);
    }
  }
  return comments;
};

const addNestedChildren = async (comment) => {
  const result = Object.assign({}, comment);

  if (result.hasOwnProperty(`kids`)) {
    const kids = result.kids;
    const sub = [];

    for (const it of kids) {
      const comment = await getArticle(it);
      const newComment = await addNestedChildren(comment);
      sub.push(newComment);
    }
    result.kids = sub;
  }
  return result;
};

export {
  api,
  getArticles,
  getCommentsTree,
  getArticle
};
