(function() {
    // Массив шаблонов (данные из задания)
    const templates = [
        {
            name: "Деловой минимализм",
            desc: "Строгие линии, приглушённые тона. Идеально для отчётов и советов директоров.",
            file: "https://www.slidesacademy.com/assets/ppt/2026/02/14/3610/office-at-night.pptx",
            image: "images/business_minimal.jpg",
            size: "2.1 MB"
        },
        {
            name: "Креативный портфолио",
            desc: "Яркие акценты, нестандартная вёрстка для творческих проектов.",
            file: "templates/creative_portfolio.pptx",
            image: "images/creative_portfolio.jpg",
            size: "3.4 MB"
        },
        {
            name: "Стартап питч",
            desc: "Динамичные слайды, чтобы привлечь инвесторов с первых секунд.",
            file: "templates/startup_pitch.pptx",
            image: "images/startup_pitch.jpg",
            size: "2.8 MB"
        },
        {
            name: "Образовательный",
            desc: "Чистый дизайн, крупный текст, удобно для лекций и вебинаров.",
            file: "templates/educational.pptx",
            image: "",
            size: "1.9 MB"
        },
        {
            name: "Маркетинговый план",
            desc: "Графики, диаграммы, места под KPI — всё для стратегии.",
            file: "templates/marketing_plan.pptx",
            image: "images/marketing_plan.jpg",
            size: "2.5 MB"
        },
        {
            name: "Техническая документация",
            desc: "Строгая структура, моноширинный стиль для разработчиков.",
            file: "templates/tech_docs.pptx",
            image: "images/tech_docs.jpg",
            size: "2.0 MB"
        },
        {
            name: "Годовой отчёт",
            desc: "Элегантная инфографика и таймлайны для подведения итогов.",
            file: "templates/annual_report.pptx",
            image: "images/annual_report.jpg",
            size: "3.1 MB"
        },
        {
            name: "Вдохновляющая презентация",
            desc: "Мотивирующие цитаты, фотографии на разворот.",
            file: "templates/inspire.pptx",
            image: "images/inspire.jpg",
            size: "2.7 MB"
        },
        {
            name: "Универсальный чистый",
            desc: "Абсолютно белый фон, только самое важное. Основа под любой контент.",
            file: "templates/clean_universal.pptx",
            image: "",
            size: "1.5 MB"
        }
    ];

    // Функция скачивания
    function downloadFile(filePath, fileName) {
        if (!filePath || filePath.trim() === '') {
            alert('Ошибка: путь к файлу не указан. Заполните поле "file" для этого шаблона.');
            return;
        }
        const a = document.createElement('a');
        a.href = filePath;
        a.download = fileName || filePath.split('/').pop() || 'presentation.pptx';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Глобальные функции для модального окна
    window.openModal = function(imageSrc) {
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modal-image');
        if (!imageSrc) {
            alert('Нет изображения для предпросмотра.');
            return;
        }
        modalImg.src = imageSrc;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function(event) {
        if (event.target.classList.contains('modal') || event.target.classList.contains('modal-close') || event.target.closest('.modal-close')) {
            const modal = document.getElementById('modal');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    // Рендеринг карточек
    function renderTemplates() {
        const grid = document.getElementById('templates-grid');
        if (!grid) return;
        grid.innerHTML = '';

        templates.forEach((tpl, idx) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animationDelay = `${0.1 + idx * 0.05}s`;

            // Блок медиа (кликабельный)
            const mediaDiv = document.createElement('div');
            mediaDiv.className = 'media';
            mediaDiv.setAttribute('onclick', `openModal('${tpl.image || ''}')`);

            if (tpl.image && tpl.image.trim() !== '') {
                const img = document.createElement('img');
                img.src = tpl.image;
                img.alt = tpl.name;
                img.onerror = function() {
                    this.style.display = 'none';
                    const icon = document.createElement('i');
                    icon.className = 'fas fa-file-powerpoint icon';
                    mediaDiv.innerHTML = '';
                    mediaDiv.appendChild(icon);
                    mediaDiv.onclick = () => alert('Изображение не найдено');
                };
                mediaDiv.appendChild(img);
            } else {
                const icon = document.createElement('i');
                icon.className = 'fas fa-file-powerpoint icon';
                mediaDiv.appendChild(icon);
                mediaDiv.onclick = () => alert('Нет превью для этого шаблона');
            }

            // Заголовок
            const title = document.createElement('h3');
            title.textContent = tpl.name;

            // Размер
            const sizeSpan = document.createElement('span');
            sizeSpan.className = 'size';
            sizeSpan.innerHTML = `<i class="far fa-file"></i> ${tpl.size || '—'}`;

            // Описание
            const desc = document.createElement('p');
            desc.textContent = tpl.desc || 'Шаблон PowerPoint.';

            // Кнопка скачивания
            const btn = document.createElement('button');
            btn.className = 'btn-download';
            btn.innerHTML = '<i class="fas fa-download"></i> Скачать';
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const fileName = tpl.file.split('/').pop() || `template_${idx+1}.pptx`;
                downloadFile(tpl.file, fileName);
            });

            // Сборка
            card.appendChild(mediaDiv);
            card.appendChild(title);
            card.appendChild(sizeSpan);
            card.appendChild(desc);
            card.appendChild(btn);

            grid.appendChild(card);
        });
    }

    document.addEventListener('DOMContentLoaded', renderTemplates);
})();