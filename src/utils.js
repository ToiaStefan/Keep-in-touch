import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnbC8Z-0DxU9a5f_gp6kLhUSv7REEmBEI",
  authDomain: "tst-react-keepintouch.firebaseapp.com",
  databaseURL: "https://tst-react-keepintouch-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tst-react-keepintouch",
  storageBucket: "tst-react-keepintouch.appspot.com",
  messagingSenderId: "1029057360512",
  appId: "1:1029057360512:web:836404e60b0484ec3d2c65"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export default app