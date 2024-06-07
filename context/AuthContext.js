import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useReducer} from 'react';
import {SERVER_URL} from '@env';

export const AuthContext = createContext();
const INITIAL_STATE = {
  userDetails: null,
  userType: '',
  isLoggedIn: false,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'isLoggedIn': {
      return {...state, isLoggedIn: true};
    }
    case 'login': {
      return {
        ...state,
        userDetails: action.payload.userDetails,
        userType: action.payload.userType,
        isLoggedIn: true,
      };
    }
    case 'logout': {
      return {
        ...state,
        userDetails: null,
        userType: '',
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);

  async function getUser() {
    try {
      const getLoginToken = await AsyncStorage.getItem('token');
      if (getLoginToken) {
        const resp = await fetch(`${SERVER_URL}/navbar`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getLoginToken}`,
          },
        });
        const userData = await resp.json();
        let type;
        if (userData.user.companyname) {
          type = 'company';
        } else if (!userData.user.companyname && userData.user.uid) {
          type = 'freelancer';
        } else {
          type = 'user';
        }
        dispatch({
          type: 'login',
          payload: {userDetails: userData.user, userType: type},
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!state.isLoggedIn) {
      return;
    }
    getUser();
  }, [state.isLoggedIn]);

  return (
    <AuthContext.Provider value={{authData: state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
