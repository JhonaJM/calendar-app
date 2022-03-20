import {
    Routes ,
    Route,
  } from "react-router-dom";
import { LoginScreen } from "../Components/auth/loginScreen";
import { CalendarScreen } from "../Components/calendar/calendarScreen";

export const AppRouter = () => {
  return (
      <Routes>
          <Route path="/" element={
            <CalendarScreen/>
          }>
          </Route>
          <Route path="/login" element={
            <LoginScreen/>
          } >
          </Route>
          <Route path="/*" element={
            <LoginScreen/>
          } >
          </Route>
      </Routes>
  );
};

