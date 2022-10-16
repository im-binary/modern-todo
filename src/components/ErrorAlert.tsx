/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import Button from "./Button";

export default function ErrorAlert({
  isModalOpen,
  errorMessage,
  reset,
}: {
  isModalOpen: boolean;
  errorMessage: string;
  reset: () => void;
}) {
  return (
    <div css={modalContainer(isModalOpen)} className='modal-wrapper' onClick={reset}>
      <section onClick={(e) => e.stopPropagation()} className='modal'>
        <p>{errorMessage}</p>
        <Button onClick={reset} className='error-reset-button'>
          확인
        </Button>
      </section>
    </div>
  );
}

const modalContainer = (isModalOpen: boolean) => css`
  &.modal-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }

  &.modal-wrapper section.modal {
    width: 100%;
    max-width: 500px;
    border-radius: 20px;
    margin-top: 20px;
    padding: 42px;
    background-color: #fff;
    z-index: 1;
  }

  section.modal {
    animation: ${isModalOpen ? fadeIn : fadeOut} 0.4s ease-out;
  }

  p {
    text-align: center;
    font-size: 1.6rem;
    font-weight: bold;
  }

  button.error-reset-button {
    display: block;
    border-radius: 20px;
    background-color: #dc602a;
    padding: 12px;
    margin-top: 30px;
    color: #fff;
    font-weight: 600;
    letter-spacing: 1.2px;
  }
`;

const fadeIn = keyframes`
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0px);
  }
`;

const fadeOut = keyframes`
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-100%);
  }
`;
