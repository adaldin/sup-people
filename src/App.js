import { DashboardRoutes } from "./routes/DashboardRoutes";
import { PaddleTripsProvider } from "./context/PaddleTripsContext.js";

function App() {
  return (
    <>
      <PaddleTripsProvider>
        <DashboardRoutes />
      </PaddleTripsProvider>
    </>
  );
}

export default App;
