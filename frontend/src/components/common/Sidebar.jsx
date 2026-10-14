import React from 'react'
import {AuthContext} from '../backend/context/Auth'
import { useContext } from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const {logout} = useContext(AuthContext);
  return (
    <div className='card shadow border-0'>
        <div className='card-body p-4 sidebar'>
            <h4>Company Web</h4>
            <ul>
                <li><Link to='/admin/dashboard'>Dashboard</Link></li>
                <li><Link to='/admin/services'>Services</Link></li>
                <li><Link to='/admin/projects'>Projects</Link></li>
                <li><Link to='/admin/articles'>Articles</Link></li>
                <li>
                    <button className='btn btn-primary mt-4' onClick={logout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
