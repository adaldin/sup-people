import { DashboardRoutes } from "./routes/DashboardRoutes";
import { SupTripProvider } from "./context/SupTripsContext.js";

function App() {
  return (
    <>
      <SupTripProvider>
        <DashboardRoutes />
      </SupTripProvider>
    </>
  );
}

export default App;
