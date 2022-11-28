import AppTitle from '../components/Title';
import LogIn from '../components/LogIn';
// import {ChatProvider} from './hooks/useChat';
import {useChat} from './hooks/useChat';

// const SignIn = ({me}) => {
const SignIn = () => {
    // const {setMe,me, setSignedIn, signedIn, displayStatus} = ChatProvider();
    const {setMe,me, setSignedIn, signedIn, displayStatus} = useChat();
    // const {setMe, setSignedIn, displayStatus} = useChat();

    const handleLogin = (name) => {
        if(!name)
            displayStatus({
                type: "error",
                msg: "Missing user name",
            });
        else setSignedIn(true);
    }

    return (
        <div>
            <AppTitle/>
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </div>
    );
}

export default SignIn;