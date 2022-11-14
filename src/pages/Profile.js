import Login from "../components/login/Login";
import UserProfile from "../components/userProfile/UserProfile";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  return <>{!user ? <Login /> : <UserProfile />}</>;
}
export default Profile;
