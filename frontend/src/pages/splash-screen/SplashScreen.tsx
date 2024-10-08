import "./SplashScreen.css"
import logo from "/logo.png"
import GoogleLoginButton from "../../components/google-login-button/GoogleLoginButton"

const SplashScreen = ({ showLoginButton }: any) => {
    return (
        <>
            <div className="splashCont">
                <img src={logo} alt="logo" />
                {showLoginButton ? <GoogleLoginButton /> : null}
            </div>
        </>
    )
}

export default SplashScreen