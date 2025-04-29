import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AgeGroupsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 12px;
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 16px;
  }
`;

const AgeGroupCard = styled(Link)`
  background-color: var(--tg-theme-bg-color);
  border-radius: 12px;
  padding: 16px;
  text-decoration: none;
  color: var(--tg-theme-text-color);
  transition: transform 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;

  &:active {
    transform: scale(0.98);
    background-color: rgba(0, 0, 0, 0.05);
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const AgeGroupTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--tg-theme-text-color);
`;

const Arrow = styled.span`
  color: var(--tg-theme-hint-color);
  font-size: 1.2rem;
`;

const ageGroups = [
  { id: '0-3', title: '0-3 месяца' },
  { id: '3-6', title: '3-6 месяцев' },
  { id: '6-9', title: '6-9 месяцев' },
  { id: '9-12', title: '9-12 месяцев' },
  { id: '1-2', title: '1-2 года' },
  { id: '2-3', title: '2-3 года' },
  { id: '3-5', title: '3-5 лет' },
];

const AgeGroups = () => {
  return (
    <AgeGroupsContainer>
      {ageGroups.map((group) => (
        <AgeGroupCard key={group.id} to={`/age-group/${group.id}`}>
          <AgeGroupTitle>{group.title}</AgeGroupTitle>
          <Arrow>→</Arrow>
        </AgeGroupCard>
      ))}
    </AgeGroupsContainer>
  );
};

export default AgeGroups; 