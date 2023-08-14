import DashboardOperations from "../features/dashboard/DashboardOperations";
import DashboardLayout from "../features/dashboard/DashboardLayout";
// ui
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
      <Heading as="h1">Dashboard</Heading>

      <Row type="horizontal">
        <DashboardOperations />
      </Row>

      <Row>
        <DashboardLayout />
      </Row>
    </>
  );
}

export default Dashboard;
