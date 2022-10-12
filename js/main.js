const PICTURES_COUNT = 25;
const AVATARS_COUNT = 6;

const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const COMMENT_LENGTH = (0, 15);

const commentLines = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const descriptions = [
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

const names = ['Андрей','Кирилл','Александр','Алексей','Михаил','Сергей','Руслан','Рустам'];

const getRandomInRange = (min, max) => {
  const minRounded = Math.ceil(min);
  const maxRounded = Math.floor(max);
  return (max <= min || min < 0 || max < 0 || typeof min !== 'number' || typeof max !== 'number')
    ? NaN
    : Math.floor(Math.random() * ((maxRounded - minRounded + 1)) + minRounded);
};

getRandomInRange();

const checkStringLength = (string, length) => string.length <= length;

checkStringLength('', 140);

const getRandomArrayElement = (array) =>
  array[getRandomInRange(0, array.length - 1)];

const createMessage = () =>
  Array.from({ length: getRandomInRange(1, 2) }, () =>
    getRandomArrayElement(commentLines)
  ).join(' ');

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInRange(1, AVATARS_COUNT)}.svg`,
  message: createMessage,
  name: getRandomArrayElement(names),
});

const createPicture = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInRange(LikesCount.MIN, LikesCount.MAX),
  comments: Array.from(
    { length: getRandomInRange(COMMENT_LENGTH) },
    (_, commentIndex) => createComment(commentIndex + 1)
  ),
});

const getPictures = () =>
  Array.from({ length: PICTURES_COUNT }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

getPictures();
