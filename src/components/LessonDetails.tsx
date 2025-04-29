import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import WebApp from '@twa-dev/sdk';

const LessonDetailsContainer = styled.div`
  padding: 12px;
  max-width: 600px;
  margin: 0 auto;
`;

const LessonHeader = styled.div`
  margin-bottom: 20px;
`;

const LessonTitle = styled.h1`
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--tg-theme-text-color);
`;

const LessonDescription = styled.p`
  margin: 0 0 16px 0;
  color: var(--tg-theme-hint-color);
  line-height: 1.5;
  font-size: 0.95rem;
`;

const ContentSection = styled.div`
  margin-bottom: 20px;
  background-color: var(--tg-theme-bg-color);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px 0;
  color: var(--tg-theme-text-color);
  font-size: 1.1rem;
  font-weight: 500;
`;

const ContentList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ContentItem = styled.li`
  margin-bottom: 10px;
  padding-left: 16px;
  position: relative;
  color: var(--tg-theme-text-color);
  font-size: 0.95rem;

  &:last-child {
    margin-bottom: 0;
  }

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--tg-theme-button-color);
  }
`;

const BuyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  width: 100%;
  height: 48px;
  margin-top: 20px;

  &:active {
    opacity: 0.8;
  }
`;

// Временные данные для демонстрации
const lessonDetailsData = {
  '1': {
    title: 'Развитие моторики',
    description: 'Комплекс упражнений для развития мелкой и крупной моторики у малышей от 0 до 3 месяцев.',
    content: [
      'Упражнения для пальчиков',
      'Игры с погремушками',
      'Массаж ручек и ножек',
      'Развитие хватательного рефлекса',
    ],
  },
  // Добавьте данные для других уроков
};

const LessonDetails = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = lessonDetailsData[lessonId as keyof typeof lessonDetailsData];

  const handleBuyClick = () => {
    WebApp.openLink(`https://your-main-website.com/buy/${lessonId}`);
  };

  if (!lesson) {
    return (
      <LessonDetailsContainer>
        <LessonTitle>Урок не найден</LessonTitle>
      </LessonDetailsContainer>
    );
  }

  return (
    <LessonDetailsContainer>
      <LessonHeader>
        <LessonTitle>{lesson.title}</LessonTitle>
        <LessonDescription>{lesson.description}</LessonDescription>
      </LessonHeader>

      <ContentSection>
        <SectionTitle>Содержание урока:</SectionTitle>
        <ContentList>
          {lesson.content.map((item, index) => (
            <ContentItem key={index}>{item}</ContentItem>
          ))}
        </ContentList>
      </ContentSection>

      <BuyButton onClick={handleBuyClick}>
        Купить урок
      </BuyButton>
    </LessonDetailsContainer>
  );
};

export default LessonDetails; 