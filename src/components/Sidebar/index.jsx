import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SideBarItem from './sidebar-item';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/images/upride-logo.png';
import LogoutIcon from '../../assets/icons/logout.svg';
import CircleIcon from '@mui/icons-material/Circle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Swal from 'sweetalert2';
function SideBar ({ menu }) {
    const location = useLocation();
    const navigate = useNavigate()
    const [active, setActive] = useState(1);

    useEffect(() => {
        menu.forEach(element => {
            
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id) => {
        setActive(id);
    }

    const LogoutHandler = () => {
        navigate('/')
        Swal.fire({
            icon : 'success',
            title : 'successfully logged out!!'
            
        })
    }

    return(
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                   
                    <img
                        src={logo}
                        alt="logo" />
                </div>
                <div className='address-main' >
                    <div className='address-main-inner'>
                        <div  className='address-icons'>
                            <LocationOnIcon sx={{color:'#EB6B9D',fontSize:'15px'}} /> 
                            Rajarajeshwari Nagar
                            <ArrowDropDownIcon sx={{color:'#EB6B9D'}} />
                        </div>
                        <div className='address-branch'>
                        Branch 2
                        <CircleIcon sx={{color:'#EB6B9D',fontSize:'15px'}}  />

                        </div>
                        <hr style={{borderTop:' 1px dashed gray' }}/>
                        <div className='address-branch'>
                        Branch 3
                        <RadioButtonUncheckedIcon sx={{color:'#EB6B9D',fontSize:'15px'}}  />

                        </div>
                    </div>
                </div>
                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <SideBarItem
                                    active={item.id === active}
                                    item={item} />
                            </div>
                        ))}
                    </div>

                    <div className='sidebar-footer'
                    onClick={() => LogoutHandler()}>
                        
                        <span className='sidebar-item-label'>Logout</span>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className='sidebar-item-icon'
                            
                            />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;