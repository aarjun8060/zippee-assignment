import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store/store';
import { setIsAuthenticated, setUser } from '../../redux/slices/auth';
import Logo from './logo';

/**
 * 
 * @returns Navbar component
 * This component is used to display the navbar
 */
function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { 
    user,
    isAuthenticated 
  } = useSelector((state: RootState) => state.auth);
  const handleLogout = () => {
    dispatch(setIsAuthenticated(false));
    dispatch(setUser(null));
    navigate("/login");
  }
  return (
    <nav className="flex justify-between items-center p-4 w-full mx-auto">
      {/* <div className="text-2xl font-bold">Zippee</div>
       */}
      <Logo />
      <div className="flex">
        <NavLink to="/">
          <Button variant="link">Home</Button>
        </NavLink>
        <NavLink to="/fav">
          <Button variant="link">Favorites</Button>
        </NavLink>
        {
          !isAuthenticated ? (
            <NavLink to="/login">
              <Button variant="default">Login</Button>
            </NavLink>
          ): (
            <Button variant="default" onClick={handleLogout}>{user?.name}</Button>
          )
        }
      </div>
    </nav>
  );
}

export default Navbar