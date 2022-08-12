import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const firebaseInitializeApp = () => {
    initializeApp(firebaseConfig)
}
export default firebaseInitializeApp;