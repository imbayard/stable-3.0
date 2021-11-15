import {fadeIn} from 'react-animations';
import styled, {keyframes} from 'styled-components';

const fadeAnimation = keyframes`${fadeIn}`;

const Fade = styled.div`
    animation: 3.33s ${fadeAnimation};
    width: 100%;
    height: 100%;
`;

export default Fade;