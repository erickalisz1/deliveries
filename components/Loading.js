import React from 'react';
import Container from './Container';
import LargeText from './LargeText';

const Loading = () => {
 
    return (
        <Container dark={true}>
            <LargeText>Fetching Data...</LargeText>
        </Container>
    );
};

export default Loading;