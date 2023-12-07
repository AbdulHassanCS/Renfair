import { GET_ERRORS, GET_REVIEWS, GET_USER_DETAILS } from "../../types/types";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const register = (data, setLoading) => async (dispatch) => {
  const auth = getAuth();
  try {
    createUserWithEmailAndPassword(auth, data?.email, data?.password)
      .then(async (userCredential) => {
        const db = getFirestore();
        const user = userCredential.user;
        await setDoc(doc(db, "users", user?.uid), data)
          .then((res) => {
            alert("Welcome !!");
          })
          .catch((error) => {
            setLoading(false);
            const errorMessage = error.message;
            dispatch({ type: GET_ERRORS, payload: errorMessage });
            console.log("error" + errorMessage);
          });
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        console.log(errorMessage);
        dispatch({ type: GET_ERRORS, payload: errorMessage });
        let err = errorMessage.indexOf("/");
        let fErr = errorMessage.slice(err + 1, errorMessage.length - 2);
        if (fErr == "email-already-in-use") {
          alert("Email already in use");
        }
      });
  } catch (e) {
    setLoading(false);
    dispatch({ type: GET_ERRORS, payload: e.message });
    console.log(e.message);
  }
};
export const login = (data, setLoading) => async (dispatch) => {
  try {
    const auth = getAuth();
    const db = getFirestore();
    signInWithEmailAndPassword(auth, data?.email, data?.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        dispatch({ type: GET_ERRORS, payload: errorMessage });
        alert("Email or password is incorrect !");
      });
  } catch (e) {
    setLoading(false);
    dispatch({ type: GET_ERRORS, payload: e.message });
  }
};

export const SignOut = (data, setLoading) => async (dispatch) => {
  try {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  } catch (e) {
    setLoading(false);
    dispatch({ type: GET_ERRORS, payload: e.message });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    console.log(id);
    const db = getFirestore();
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch({ type: GET_USER_DETAILS, payload: docSnap.data() });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.message });
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    const db = getFirestore();
    const Ref = doc(db, "users", id);
    await updateDoc(Ref, data)
      .then(async (res) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch({ type: GET_USER_DETAILS, payload: docSnap.data() });
        }
      })
      .catch((e) => {
        dispatch({ type: GET_ERRORS, payload: e.message });
      });
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.message });
  }
};

export const getReviews = () => {
  try {
    return new Promise(async (resolve, reject) => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "reviews"));
      let arr = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data["id"] = doc.id;
        arr.push(data);
      });
      resolve(arr);
    });
  } catch (e) {
    reject(e);
  }
};

export const getAllReviews = () => async (dispatch) => {
  try {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "reviews"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data["id"] = doc.id;
      arr.push(data);
    });
    dispatch({ type: GET_REVIEWS, payload: arr });
  } catch (e) {
    console.log(e);
  }
};

export const addReview = (data, setLoading) => async (dispatch) => {
  try {
    const db = getFirestore();
    await addDoc(collection(db, "reviews"), data)
      .then(async (res) => {
        getReviews()
          .then((res) => {
            dispatch({ type: GET_REVIEWS, payload: res });
            alert("Review Submited !!");
            setLoading(false);
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        dispatch({ type: GET_ERRORS, payload: errorMessage });
        console.log("error" + errorMessage);
      });
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.message });
  }
};
