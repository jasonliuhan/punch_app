import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
const useFB = () => {
  const handleLoginFB = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async result => {
        const user = result.user;
        console.log(user);
        // 在這邊把user資料寫入locaStorage或是進行後端寫入資料庫等等的操作
      })
      .catch(error => {
        console.log(error);
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(credential)
      });
  };
  return { handleLoginFB };
};
export default useFB;