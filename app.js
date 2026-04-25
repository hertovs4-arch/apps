// Ждём готовности DOM
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация VK Mini Apps
  vkBridge.send('VKWebAppInit');

  // ====== ВСЕ СТИЛИ ПРЯМО В JS ======
  const style = document.createElement('style');
  style.textContent = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f2f5;
      transition: background 0.3s, color 0.3s;
      padding: 20px;
    }
    .card {
      background: #ffffff;
      border-radius: 20px;
      padding: 30px 25px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      max-width: 400px;
      width: 100%;
      text-align: center;
      transition: background 0.3s, box-shadow 0.3s;
    }
    h1 {
      font-size: 26px;
      margin-bottom: 8px;
      color: #333;
    }
    .subtitle {
      font-size: 14px;
      color: #6d7a87;
      margin-bottom: 24px;
    }
    .excuse-box {
      background: #f7f8fa;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 25px;
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      line-height: 1.5;
      color: #1a1a1a;
      transition: background 0.3s, color 0.3s;
    }
    .btn {
      background: #4a76a8;
      color: white;
      border: none;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 14px;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
      outline: none;
      width: 100%;
    }
    .btn:active {
      transform: scale(0.97);
      background: #3d6490;
    }
    /* Тёмная тема */
    body.dark {
      background: #191919;
    }
    body.dark .card {
      background: #222;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    }
    body.dark h1 {
      color: #e1e1e1;
    }
    body.dark .subtitle {
      color: #aaa;
    }
    body.dark .excuse-box {
      background: #2c2c2c;
      color: #f0f0f0;
    }
  `;
  document.head.appendChild(style);

  // ====== HTML-ОСНОВА САЙТА СТРОИТСЯ ЗДЕСЬ ======
  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h1');
  title.textContent = 'Генератор отмазок';

  const subtitle = document.createElement('p');
  subtitle.className = 'subtitle';
  subtitle.textContent = 'Нажми на кнопку, когда нужна гениальная отговорка';

  const excuseBox = document.createElement('div');
  excuseBox.className = 'excuse-box';
  excuseBox.textContent = 'Твоя отмазка появится здесь';

  const button = document.createElement('button');
  button.className = 'btn';
  button.textContent = 'Сгенерировать отмазку ';

  card.appendChild(title);
  card.appendChild(subtitle);
  card.appendChild(excuseBox);
  card.appendChild(button);
  document.body.appendChild(card);

  // ====== СПИСОК ОТМАЗОК ======
  const excuses = [
    'Мой кот сел на клавиатуру и удалил все файлы.',
    'Я думал, сегодня выходной — календарь сломался.',
    'Соседи делали ремонт, и я не слышал будильник.',
    'Меня похитили инопланетяне, но они вернули меня поздно.',
    'Я перепутал время в часовых поясах.',
    'Интернет упал, а вместе с ним и моя продуктивность.',
    'Преподаватель не сказал, что это задание обязательно.',
    'Моя кофеварка взорвалась, пришлось спасать кухню.',
    'Я случайно закрыл вкладку со всей работой.',
    'Мой питомец провёл важную презентацию вместо меня.',
    'Дедлайн был вчера? А я думал, послезавтра.',
    'Я помогал бабушке проходить новую видеоигру.',
    'Солнечная вспышка вызвала помехи в моём мозгу.',
    'Я слишком долго выбирал шрифт для задачи.',
    'Мой диван объявил забастовку и не отпускал меня.',
    'Я пытался научить хомяка программировать.',
    'Случайно включил режим «невидимка» и не смог выйти.',
    'Моя зарядка сломалась, а беспроводное электричество ещё не изобрели.'
  ];

  // ====== ЛОГИКА ГЕНЕРАЦИИ ======
  function getRandomExcuse() {
    const randomIndex = Math.floor(Math.random() * excuses.length);
    return excuses[randomIndex];
  }

  button.addEventListener('click', () => {
    excuseBox.textContent = getRandomExcuse();
  });

  // ====== ПОДДЕРЖКА ТЁМНОЙ ТЕМЫ VK ======
  // Получаем текущую тему при старте
  vkBridge.send('VKWebAppGetConfig')
    .then((data) => {
      if (data.scheme === 'dark') {
        document.body.classList.add('dark');
      }
    })
    .catch(() => {});

  // Слушаем изменения темы в реальном времени
  vkBridge.subscribe((e) => {
    if (e.detail.type === 'VKWebAppUpdateConfig') {
      const scheme = e.detail.data.scheme;
      if (scheme === 'dark') {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  });
});
