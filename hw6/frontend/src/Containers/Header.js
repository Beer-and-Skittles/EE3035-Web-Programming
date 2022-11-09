import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axios from '../api';
import { ScoreCardProvider, useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

const Header = () => {
  const { addRegularMessage, deleteMessages } = useScoreCard();

  const handleClear = async () => {
    const {
      data: { message },
    } = await axios.delete('/cards');
    deleteMessages(message);
    // addRegularMessage(message);
  };

  return (
    <Wrapper>
      <Typography variant="h2">ScoreCard DB</Typography>
      <Button variant="contained" color="secondary" onClick={handleClear}>
        Clear
      </Button>
    </Wrapper>
  );
};

export default Header;