import { DashboardRoutes } from "./routes/DashboardRoutes";
import { SupTripProvider } from "./context/SupTripsContext.js";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <SupTripProvider>
          <DashboardRoutes />
        </SupTripProvider>
      </AuthProvider>
    </>
  );
}

export default App;
