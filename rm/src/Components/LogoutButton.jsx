import { useFrappeAuth } from 'frappe-react-sdk';

const LogoutButton = () => {
    const { logout, isLoading, error } = useFrappeAuth();

    const handleLogout = async () => {
        try {
            await logout();
            alert('Logged out successfully');
        } catch (err) {
            console.error('Logout error:', err);
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
