// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Расширяем приложение на весь экран
tg.expand();

// Обработчик события готовности
tg.ready();

// Настраиваем основную кнопку
tg.MainButton.setParams({
    text: 'Задать вопрос',
    color: '#2481cc',
});

// Данные уроков
const lessons = [
    {
        id: 1,
        title: '0-3 месяца',
        image: 'https://placehold.co/600x400/png?text=0-3+месяца',
        shortDescription: 'Развитие малыша в первые месяцы жизни',
        fullDescription: 'Подробное описание упражнений и методик для развития ребенка от рождения до 3 месяцев. Включает массаж, гимнастику и развивающие игры.',
        link: 'https://example.com/lesson1'
    },
    {
        id: 2,
        title: '3-6 месяцев',
        image: 'https://placehold.co/600x400/png?text=3-6+месяцев',
        shortDescription: 'Активное познание мира',
        fullDescription: 'Комплексная программа развития ребенка от 3 до 6 месяцев. Упражнения на координацию, развитие хватательного рефлекса и первые игры.',
        link: 'https://example.com/lesson2'
    },
    {
        id: 3,
        title: '6-9 месяцев',
        image: 'https://placehold.co/600x400/png?text=6-9+месяцев',
        shortDescription: 'Первые шаги и слова',
        fullDescription: 'Программа для развития навыков ползания, подготовки к ходьбе и развития речи. Включает упражнения на баланс и координацию.',
        link: 'https://example.com/lesson3'
    },
    {
        id: 4,
        title: '9-12 месяцев',
        image: 'https://placehold.co/600x400/png?text=9-12+месяцев',
        shortDescription: 'Уверенные движения и речь',
        fullDescription: 'Комплекс упражнений для развития ходьбы, мелкой моторики и активной речи. Игры на развитие памяти и внимания.',
        link: 'https://example.com/lesson4'
    },
    {
        id: 5,
        title: '1-2 года',
        image: 'https://placehold.co/600x400/png?text=1-2+года',
        shortDescription: 'Активное развитие навыков',
        fullDescription: 'Программа всестороннего развития ребенка от года до двух лет. Развитие речи, моторики, творческих способностей.',
        link: 'https://example.com/lesson5'
    },
    {
        id: 6,
        title: '2-3 года',
        image: 'https://placehold.co/600x400/png?text=2-3+года',
        shortDescription: 'Творчество и самостоятельность',
        fullDescription: 'Комплексная программа развития самостоятельности, творческого мышления и социальных навыков.',
        link: 'https://example.com/lesson6'
    },
    {
        id: 7,
        title: '3-5 лет',
        image: 'https://placehold.co/600x400/png?text=3-5+лет',
        shortDescription: 'Подготовка к школе',
        fullDescription: 'Программа подготовки к школе, развитие логического мышления, памяти, внимания и творческих способностей.',
        link: 'https://example.com/lesson7'
    }
];

// Функция для отображения списка уроков
function renderLessons() {
    const lessonsList = document.getElementById('lessons-list');
    lessonsList.innerHTML = lessons.map(lesson => `
        <div class="lesson-card">
            <img class="lesson-image" src="${lesson.image}" alt="${lesson.title}">
            <div class="lesson-content">
                <h2 class="lesson-title">${lesson.title}</h2>
                <p class="lesson-description">${lesson.shortDescription}</p>
                <button class="button" onclick="showLessonDetails(${lesson.id})">Подробнее</button>
            </div>
        </div>
    `).join('');
}

// Функция для отображения деталей урока
function showLessonDetails(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    const lessonsList = document.getElementById('lessons-list');
    const lessonDetails = document.getElementById('lesson-details');
    const lessonContent = document.getElementById('lesson-full-content');

    lessonsList.style.display = 'none';
    lessonDetails.style.display = 'block';
    
    lessonContent.innerHTML = `
        <h2 class="lesson-title">${lesson.title}</h2>
        <img class="lesson-image" src="${lesson.image}" alt="${lesson.title}">
        <p class="lesson-description">${lesson.fullDescription}</p>
        <button class="button" onclick="window.open('${lesson.link}', '_blank')">Купить урок</button>
    `;

    // Сохраняем ID и название текущего урока для ИИ ассистента
    lessonContent.dataset.currentLesson = lessonId;
    lessonContent.dataset.currentLessonTitle = lesson.title;

    // Показываем кнопку "Задать вопрос"
    tg.MainButton.show();
}

// Функция для возврата к списку уроков
function showLessonsList() {
    const lessonsList = document.getElementById('lessons-list');
    const lessonDetails = document.getElementById('lesson-details');
    
    lessonsList.style.display = 'flex';
    lessonDetails.style.display = 'none';

    // Скрываем кнопку при возврате к списку
    tg.MainButton.hide();
}

// Функция для отправки сообщения ИИ ассистенту через webhook
async function askAI() {
    const lessonContent = document.getElementById('lesson-full-content');
    const lessonId = lessonContent.dataset.currentLesson;
    const lessonTitle = lessonContent.dataset.currentLessonTitle;
    
    // Формируем данные для отправки
    const data = {
        lessonId: lessonId,
        lessonTitle: lessonTitle,
        message: `У меня вопрос по уроку ${lessonId} (${lessonTitle})`,
        userId: tg.initDataUnsafe?.user?.id || 'unknown',
        username: tg.initDataUnsafe?.user?.username || 'unknown'
    };

    try {
        // Отправляем POST запрос на webhook
        const response = await fetch('https://maximov-neuro.ru/webhook-test/ae8633d6-350e-4caa-830f-d96c9b311907', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Если запрос успешен, закрываем приложение
            tg.close();
        } else {
            console.error('Ошибка при отправке запроса');
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Устанавливаем обработчик нажатия на основную кнопку
tg.MainButton.onClick(askAI);

// Отрисовываем уроки при загрузке страницы
renderLessons(); 