// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Расширяем приложение на весь экран
tg.expand();

// Обработчик события готовности
tg.ready();

// Настраиваем основную кнопку
tg.MainButton.setParams({
    text: 'Задать вопрос',
    color: '#FF7F6A',
});

// Добавляем обработчик клика на кнопку
tg.MainButton.onClick(askAI);

// Данные уроков
const lessons = [
    {
        id: 1,
        title: '0-3 месяца',
        image: 'https://placehold.co/600x400/png?text=0-3+месяца',
        shortDescription: `Содержание видеоурока:
- развитие мозга и психики;
- запуск отношений привязанности;
- ведущий тип деятельности;
- как развиваются крупная и мелкая моторика;
- как развивается речь;
...`,
        fullDescription: `Содержание видеоурока:
- развитие мозга и психики;
- запуск отношений привязанности;
- ведущий тип деятельности;
- как развиваются крупная и мелкая моторика;
- как развивается речь;
- развитие навыков по возрасту;
- «красные» флажки, что должно насторожить;
- какие игрушки нужны в этом возрасте;
- памятка «Список базовых книг для малыша до 1 года»;
- сценарий самых развивающих игр с малышом;
- как обустроить комнату малыша;
- как помочь в развитии;
- правила безопасности;
- список девайсов, которые облегчат жизнь;
- памятка «График посещения врачей малышами до 1 года»;`,
        author: {
            name: 'Антипенко Наталия',
            photo: 'placeholder-for-photo.jpg', // Здесь будет путь к фото
            credentials: [
                'Детский психолог с компетенцией в области дефектологии и семейной психологии.',
                'Опыт работы с детьми и родителями с 2008г.',
                'Автор проекта "Расту по возрасту".',
                'Мама троих детей.'
            ]
        },
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

// Функция для отображения списка уроков с анимацией
function renderLessons() {
    const lessonsList = document.getElementById('lessons-list');
    lessonsList.innerHTML = lessons.map((lesson, index) => `
        <div class="lesson-card" style="animation-delay: ${index * 0.1}s">
            <img class="lesson-image" src="${lesson.image}" alt="${lesson.title}">
            <div class="lesson-content">
                <h2 class="lesson-title">${lesson.title}</h2>
                <p class="lesson-description">${lesson.shortDescription}</p>
                <button class="button" onclick="showLessonDetails(${lesson.id})">Подробнее</button>
            </div>
        </div>
    `).join('');

    // Добавляем обработчик скролла для анимации
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.lesson-card').forEach(card => {
        observer.observe(card);
    });
}

// Функция для отображения деталей урока с анимацией
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
        <div class="lesson-description">${lesson.fullDescription.replace(/\n/g, '<br>')}</div>
        
        <div class="author-section">
            <div class="author-header">
                <div class="author-photo-placeholder">
                    <!-- Место для фото автора -->
                    <img src="${lesson.author.photo}" alt="${lesson.author.name}" class="author-photo">
                </div>
                <h3>Кто ведет: ${lesson.author.name}</h3>
            </div>
            <ul class="author-credentials">
                ${lesson.author.credentials.map(cred => `<li>${cred}</li>`).join('')}
            </ul>
        </div>
        
        <button class="button" onclick="window.open('${lesson.link}', '_blank')">Купить урок</button>
    `;

    // Сохраняем ID и название текущего урока для ИИ ассистента
    lessonContent.dataset.currentLesson = lessonId;
    lessonContent.dataset.currentLessonTitle = lesson.title;

    // Показываем кнопку "Задать вопрос"
    tg.MainButton.show();

    // Добавляем анимацию появления
    requestAnimationFrame(() => {
        lessonDetails.style.opacity = '0';
        requestAnimationFrame(() => {
            lessonDetails.style.opacity = '1';
        });
    });
}

// Функция для возврата к списку уроков с анимацией
function showLessonsList() {
    const lessonsList = document.getElementById('lessons-list');
    const lessonDetails = document.getElementById('lesson-details');
    
    // Анимация исчезновения
    lessonDetails.style.opacity = '0';
    
    setTimeout(() => {
        lessonDetails.style.display = 'none';
        lessonsList.style.display = 'grid';
        
        // Анимация появления списка
        requestAnimationFrame(() => {
            document.querySelectorAll('.lesson-card').forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    }, 300);

    // Скрываем кнопку при возврате к списку
    tg.MainButton.hide();
}

// Функция для отправки сообщения в чат
function askAI() {
    const lessonContent = document.getElementById('lesson-full-content');
    const lessonId = lessonContent.dataset.currentLesson;
    const lessonTitle = lessonContent.dataset.currentLessonTitle;
    
    // Отправляем сообщение через Telegram Web App
    tg.sendData(JSON.stringify({
        action: 'ask_question',
        lesson_id: lessonId,
        lesson_title: lessonTitle
    }));

    // Закрываем приложение
    tg.close();
}

// Отрисовываем уроки при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderLessons();
}); 