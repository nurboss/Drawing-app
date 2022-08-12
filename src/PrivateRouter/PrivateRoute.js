import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../firebase/AuthProvider/UseAuth';
import Preloader from '../loader/Preloader';


const PrivateRoute = ({ children, ...rest }) => {
    const location = useLocation();
    const { user , isLoading} = UseAuth();
    if(isLoading){
        return <Preloader />
      }
    if (user.email) {
        return children
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default PrivateRoute;




// import React from 'react';
// import {  Route } from 'react-router';
// import UseAuth from '../firebase/AuthProvider/UseAuth';
// import Preloader from '../loader/Preloader';
// import Login from '../Login/Login';

// const PrivateRoute = ({ children, ...rest }) => {
//     const {user, isLoading} = UseAuth();
//     if(isLoading){
//       return <Preloader />
//     }
//     return (
//     <Route
//        {...rest}
//        render={({ location }) => user?.email ? children : <Login />
//       //  <Redirect
//       //  to={{
//       //   pathname: "/login",
//       //   state: { from: location }
//       // }}
//       //  ></Redirect>
//       }
//     >

//     </Route>
//     );
// };

// export default PrivateRoute;
