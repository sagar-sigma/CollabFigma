import { useAuth } from "../../store/auth";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold">
        Welcome to your Dashboard 🎨, {user?.email}
      </h1>
      <p className="mt-2 text-gray-600">You’re logged in successfully.</p>
      <p className="mt-2 text-gray-600">User ID: {user?.id}</p>
    </div>
  );
};

export default Dashboard;
