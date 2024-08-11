// src/components/FlashCard.js
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';
import flashcards from './Insidecard';  

const Cards = () => {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false); 
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const currentFlashcard = flashcards.length > 0 ? flashcards[currentIndex] : {};


  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      {currentFlashcard.question ? (
        <CardContainer>
          <CardInner flipped={flipped} onClick={handleFlip}>
            <FrontFace>{currentFlashcard.question}</FrontFace>
            <BackFace>{currentFlashcard.answer}</BackFace>
          </CardInner>
        </CardContainer>
      ) : (
        <div>No flashcard available</div>
      )}
      
      <Box display="flex" justifyContent="space-between" alignItems="center" width="300px" mt={2}>
        <Button variant="contained" onClick={handlePrev} disabled={currentIndex === 0}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

const CardContainer = styled.div`
  width: 550px;
  height: 300px;
  perspective: 1000px;
  cursor: pointer;
  position: relative;
  transition: transform 0.6s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transition: transform 0.6s ease-in-out;
  transform-style: preserve-3d;
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardFace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.6s ease-in-out;
`;

const FrontFace = styled(CardFace)`
  background-color: #f8f8f8;
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const BackFace = styled(CardFace)`
  background-color: #3498db;
  color: #fff;
  transform: ${({ flipped }) => (flipped ? 'rotateY(0)' : 'rotateY(180deg)')};
`;

export default Cards;