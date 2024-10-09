import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authService } from "./appwrite/auth";
import { authSlice } from "./store/authSlice";
import { useState } from "react";
function App() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
