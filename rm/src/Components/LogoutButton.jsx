import { useFrappeAuth } from 'frappe-react-sdk';

const LogoutButton = () => {
  const { logout, isLoading } = useFrappeAuth();

  const handleLogout = async () => {
    try {
      await logout();
      alert('Logged out successfully');
    } catch (err) {
      alert('Logout failed');
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
