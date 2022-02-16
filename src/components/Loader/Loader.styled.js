import styled from '@emotion/styled';

export const StyledLoader = styled.div`
  margin: 100px auto 0;
  width: 70px;
  text-align: center;

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }

  & div {
    width: 18px;
    height: 18px;
    background-color: #333;
    border-radius: 100%;
    display: inline-block;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  & .bounce1 {
    animation-delay: -0.32s;
  }

  & .bounce2 {
    animation-delay: -0.16s;
  }
`;
