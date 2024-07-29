import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMV9PraVGUGWfDCOCw26bHa7RWGSAz_c0",
  authDomain: "nwitter-reloaded-9ba56.firebaseapp.com",
  projectId: "nwitter-reloaded-9ba56",
  storageBucket: "nwitter-reloaded-9ba56.appspot.com",
  messagingSenderId: "455891292705",
  appId: "1:455891292705:web:3f837ed37754b343c3c960"
};

//get an application 
const app = initializeApp(firebaseConfig);

//saying get the authentication Service for ours 
export const auth = getAuth(app);
