// Find the handleLogin function
const handleLogin = () => {
  try {
    // TEMPORARY: Allow '000000' to bypass the check so you can setup
    if (otp === '000000' || authenticator.check(otp, db.auth.secret)) {
      setIsAuth(true);
    } else {
      alert("INVALID_HANDSHAKE_CODE");
    }
  } catch (e) { alert("AUTH_ENGINE_ERROR"); }
};
