import { createUserWithEmailAndPassword,  GoogleAuthProvider,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase.init';

export const AuthContext = createContext();

 const Provider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const provider = new GoogleAuthProvider();
 const [email, setEmail] = useState('')
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0)



    // register

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
        
    }

    // sign in

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    
    }

    // sign in with google

    // const googleSignIn = () => {
    //     setLoading(true);
    //     return signInWithPopup(auth, provider)
    // }


    useEffect(() => {


        const unSubscribe =  onAuthStateChanged(auth, curentUser => {
           if(curentUser){
            setUser(curentUser);
            setLoading(false);
           }else{
            console.log('No User LoggedIn')
           }
          
           
        })
  
        return () => {
  
            unSubscribe()
        }
  
    },[auth])





    // signOut

const logOut = () => {
    return signOut(auth)
   
}



  





    const authInfo = {
        register,
        signIn,
        loading,
        setUser,
        user,
        logOut,
        setRatingCount,
        ratingCount,
        setRating,
        email,
        setEmail,
        rating


      
                
    };


   










    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Provider;








// import { createContext, useEffect, useState } from "react";
// import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
// import app from '../Firebase.config.js'




// // Create the AuthContext
// export const AuthContext = createContext();
// const auth = getAuth(app);




// const AuthProvider = ({ children }) => {

   
   
//   const [user, setUser] = useState();
//   const [loading, setLoading] = useState(true);


// //   signUp

// const signUp = (email, password)=>{
//     return createUserWithEmailAndPassword(auth, email, password)
   
// }

// // sign in 

// const signIn = (email, password)=>{
//    return signInWithEmailAndPassword(auth, email, password)
   
// }



// // signOut

// const logOut = () => {
//     return signOut(auth)
//     setLoading(true);
// }






// // observer

// useEffect(() => {

//     const unSubscribe =  onAuthStateChanged(auth, curentUser => {
//           setUser(curentUser);
//           setLoading(false);
        
         
//       })

//       return () => {

//           unSubscribe()
//       }

//   },[auth])


// //   google sign in 















//   const authInfo = {
//     signUp,
//     setUser,
//     user,
//     signIn,
//     logOut,
//     auth,
//     loading,
   
    
  
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;