import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth/web-extension";
import { getFirestore, setDoc, doc, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtejiOhxdFGOJssbh8BpJg77V16ZEmmRI",
  authDomain: "smalltalk-643ef.firebaseapp.com",
  projectId: "smalltalk-643ef",
  storageBucket: "smalltalk-643ef.appspot.com",
  messagingSenderId: "256251904795",
  appId: "1:256251904795:web:8902e104a8ed8c99d189be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      id:user.uid,
      username: username.toLowerCase(),
      email,
      avatar: '',
      bio: "Hey there, let's make SmallTalk",
      lastSeen: Date.now(),
    })

    await setDoc(doc(db, 'chats', user.uid), {
      chatsData: []
    })

  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))    
  }
}

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const resetPass = async (email) => {
  if (!email) {
    toast.error('Enter your email');
    return null;

  }
  try {
    
    const userRef = collection(db, 'users');
    const q = query(userRef, where('email', "==", email));
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      await sendPasswordResetEmail(auth, email)
      toast.success("Reset Email Sent")
    } else {
      toast.error('Email does not exist')
    }
  } catch (error) {
    console.error(error)
    toast.error(error.message)
  }
}

export { signup, login, logout, auth, db, resetPass }