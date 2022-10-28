import {getRandomInRange, getRandomArrayElement} from './util.js';

const PICTURES_COUNT = 25;
const AVATARS_COUNT = 6;

const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const COMMENT_LENGTH = 15;

const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Как притно вернуться в родной город. #дом #семья',
  'Кто последний, тот ..',
  'Что за райское место. #океан #остров',
  'Обклеил машину в новую пленку. #car #tuning',
  'Лучше лимонада, летом нет. #lemonade #thirst',
  'Долгожданная поездка на море. #море #друзья #лето',
  'Пушка-Гонка. #далдалушел',
  'Отличное сочетание продуктов',
  'Мы наконец-то побываи на концерте у нашего любимого исполнителя. Это было незабываемо',
  'Ты, я и закат #love #sunset',
];

const NAMES = ['Андрей','Кирилл','Александр','Алексей','Михаил','Сергей','Руслан','Рустам'];

const createMessage = () =>
  Array.from({ length: getRandomInRange(1, 2) }, () =>
    getRandomArrayElement(COMMENT_LINES)
  ).join(' ');

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInRange(1, AVATARS_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInRange(LikesCount.MIN, LikesCount.MAX),
  comments: Array.from(
    { length: getRandomInRange(0, COMMENT_LENGTH) },
    (_, commentIndex) => createComment(commentIndex + 1)
  ),
});

const getPictures = () =>
  Array.from({ length: PICTURES_COUNT }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

export {getPictures};
