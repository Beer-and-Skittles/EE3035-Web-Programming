import {useEffect} from 'react';
import styled from 'styled-components';
// import {ChatProvider} from './hooks/useChat';
import {useChat} from './hooks/useChat';
import SignIn from './SignIn';
import ChatRoom from './ChatRoom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const App = () => {
  const {status, signedIn, displayStatus} = useChat();
  
  useEffect(() => {displayStatus(status)}, [status]);

  return(<Wrapper>{signedIn? <ChatRoom/>:<SignIn/>}</Wrapper>);
}

export default App
