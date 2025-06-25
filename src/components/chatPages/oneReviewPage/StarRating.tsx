import { useRef } from "react";
import styled, { css } from "styled-components";

const StarContainer = styled.div`
  width: 50%;
  align-self: center;
  display: flex;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  justify-content: center;
  align-items: center;
  gap: 6%;
`;

const Star = styled.span<{
  $filled: boolean;
  $half: boolean;
}>`
  font-size: clamp(40px, 13vw, 70px);
  color: #eeeeee;
  user-select: none;
  cursor: pointer;
  font-family: DunggeunmisoBold;

  ${({ $filled }) =>
    $filled &&
    css`
      color: #ffe16a;
    `}

  ${({ $half }) =>
    $half &&
    css`
      background: linear-gradient(to right, #ffe16a 50%, #eeeeee 50%);
      -webkit-background-clip: text;
      color: transparent;
    `}
`;

type Props = {
  rating: number;
  onChange: (value: number) => void;
};

const StarRating = ({ rating, onChange }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const full = i <= rating;
    const half = i - 0.5 === rating;

    stars.push(
      <Star
        key={i}
        $filled={full}
        $half={half}
        onClick={(e) => {
          const rect = (e.target as HTMLElement).getBoundingClientRect();
          const isLeft = e.clientX - rect.left < rect.width / 2;
          const selected = isLeft ? i - 0.5 : i;
          onChange(selected);
        }}
        onTouchStart={(e) => {
          const rect = (e.target as HTMLElement).getBoundingClientRect();
          const x = e.touches[0].clientX - rect.left;
          const isLeft = x < rect.width / 2;
          const selected = isLeft ? i - 0.5 : i;
          onChange(selected);
        }}
      >
        ★
      </Star>
    );
  }

  return <StarContainer ref={containerRef}>{stars}</StarContainer>;
};

export default StarRating;
