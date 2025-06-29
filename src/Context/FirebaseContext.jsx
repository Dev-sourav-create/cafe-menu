import { Children, createContext } from "react";
import { app } from "../firbase";

const FirebaseContext = createContext(null);

const FirebasecontextProvider = ({ props }) => {
  return (
    <FirebaseContext.Provider value={{ app }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebasecontextProvider };
