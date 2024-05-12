import React from 'react'
import { Link } from 'react-router-dom'

type NavbarProps = {
  isLoggedIn: boolean
}

const routes = [
  { name: 'Budget', link: '/' },
  { name: 'Income', link: '/income' },
  { name: 'Expenses', link: '/expenses' },
  { name: 'Report', link: '/report' }
]

const Navbar: React.FC<NavbarProps> = (props): React.ReactElement => {
  return (
    <div className="navbar bg-base-200 max-w-screen-2xl mx-auto">
      <div className="navbar-start">
        {props.isLoggedIn && (
          <>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {routes.map((route, index) => (
                  <li key={index}>
                    <Link to={route.link}>{route.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        <Link to="/" className="btn btn-ghost text-xl">
          💵{' '}
          <span>
            <span className="text-green-500">Bux</span>Track
          </span>
        </Link>
      </div>
      {props.isLoggedIn && (
        <>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {routes.map((route, index) => (
                <li key={index}>
                  <Link to={route.link}>{route.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className="navbar-end">
        <button className={`btn btn-outline ${props.isLoggedIn ? 'btn-error' : 'btn-success'}`}>
          {props.isLoggedIn ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
          )}
          {props.isLoggedIn ? 'Signout' : 'Signin'}
        </button>
      </div>
    </div>
  )
}
export default Navbar
