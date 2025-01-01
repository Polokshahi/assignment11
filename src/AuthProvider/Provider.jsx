import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase.init';

export const AuthContext = createContext();

 const Provider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    // register

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
        
    }

    // sign in

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    
    }


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
        logOut

      
                
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