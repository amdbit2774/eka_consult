import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import WebApp from '@twa-dev/sdk';

const LessonsContainer = styled.div`
  padding: 12px;
  max-width: 600px;
  margin: 0 auto;
`;

const LessonCard = styled(Link)`
  background-color: var(--tg-theme-bg-color);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  text-decoration: none;
  color: var(--tg-theme-text-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: block;

  &:active {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const LessonTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--tg-theme-text-color);
`;

const LessonDescription = styled.p`
  margin: 0;
  color: var(--tg-theme-hint-color);
  font-size: 0.9rem;
  line-height: 1.4;
`;

const BuyButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  margin-top: 12px;
  width: 100%;
  height: 40px;

  &:active {
    opacity: 0.8;
  }
`;

// Временные данные для демонстрации
const lessonsData = {
  '0-3': [
    { id: '1', title: 'Развитие моторики', description: 'Базовые упражнения для развития моторики у малышей' },
    { id: '2', title: 'Сенсорное развитие', description: 'Игры и упражнения для развития чувств' },
  ],
  '3-6': [
    { id: '3', title: 'Первые движения', description: 'Учимся переворачиваться и ползать' },
    { id: '4', title: 'Развитие речи', description: 'Первые звуки и слова' },
  ],
  // Добавьте данные для других возрастных групп
};

const Lessons = () => {
  const { ageGroup } = useParams<{ ageGroup: string }>();
  const lessons = lessonsData[ageGroup as keyof typeof lessonsData] || [];

  const handleBuyClick = (e: React.MouseEvent, lessonId: string) => {
    e.preventDefault();
    WebApp.openLink(`https://your-main-website.com/buy/${lessonId}`);
  };

  return (
    <LessonsContainer>
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} to={`/lesson/${lesson.id}`}>
          <LessonTitle>{lesson.title}</LessonTitle>
          <LessonDescription>{lesson.description}</LessonDescription>
          <BuyButton onClick={(e) => handleBuyClick(e, lesson.id)}>
            Купить урок
          </BuyButton>
        </LessonCard>
      ))}
    </LessonsContainer>
  );
};

export default Lessons; 