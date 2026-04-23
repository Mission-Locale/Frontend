import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Router from "./router/Router.jsx";

const queryClient = new QueryClient();
//window.__TANSTACK_QUERY_CLIENT__ = queryClient // enable devtools

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
