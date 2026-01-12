import { AuthProvider } from "./contexts/AuthContext.jsx";
import Router from "./router/Router.jsx";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
