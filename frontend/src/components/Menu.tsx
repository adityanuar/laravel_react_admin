import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to={'/'} className={`nav-link ${(isActive: boolean) => isActive ? 'your-class' : ''}`}>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/users'} className={`nav-link ${(isActive: boolean) => isActive ? 'your-class' : ''}`}>
              Users
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Menu;