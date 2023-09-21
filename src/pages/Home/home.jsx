import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Pagination from '@mui/material/Pagination';
import './home.css';
import { sliceData } from '../../utils/table-pagination';
import CarImage from '../../assets/images/car.avif'
import WaveImage from '../../assets/icons/wave.png'
import PhoneHand from '../../assets/icons/PhonewithHand.svg'
import AddBookingModal from '../../components/popup/popup';
import Swal from 'sweetalert2';
import { TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
function HomePage () {
    
    const [isloading, setIsloading] = useState(true)
    const [bookings, setBookings] = useState([]);
    const [activeBookings, setActiveBookings] = useState([]);
    const [completedBookings, setCompletedBookings] = useState([]);
    const [cancelledBookings, setCancelledBookings] = useState([]);
    const FirebaseURL = 'https://upride-internships-default-rtdb.firebaseio.com/.json';
    const [pageNumber, setPageNumber] = useState(0)
    const array = [activeBookings,completedBookings,cancelledBookings]
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 10;
    const displayedData = sliceData(array[pageNumber], currentPage, itemsPerPage);
    const UserName = localStorage.getItem('data')

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveBooking = async (bookingData) => {
        console.log(bookingData)
        await sessionStorage.setItem('BookingData',JSON.stringify(bookingData))
        Swal.fire({
            icon: 'success',
            title:'Submitted',
            text :'saved to the session storage'
        })
    };
    useEffect(() => {
        axios.get(FirebaseURL)
          .then((response) => {
            if (response.data ) {
               
              setIsloading(false)
              const { online_bookings, offline_bookings } = response.data;
    
              
              const allBookings = [...Object.values(online_bookings), ...Object.values(offline_bookings)];
    
              
              allBookings.sort((a, b) => a.bookingEpochTime - b.bookingEpochTime);
    
              // Separate bookings based on bookingStatus
              const active = allBookings.filter((booking) => booking.bookingStatus === 'SUCCESS');
              const completed = allBookings.filter((booking) => booking.bookingStatus === 'COMPLETED');
              const cancelled = allBookings.filter((booking) => booking.bookingStatus === 'CANCELLED');
    
              setBookings(allBookings);
              setActiveBookings(active);
              setCompletedBookings(completed);
              setCancelledBookings(cancelled);
            } else{
                setIsloading(true)
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
      

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
      };
   
    return(
        <div className='dashboard-content'>
           <div className='home_navtype'>
                <div className='home_navtype_inner'>
                    
                    <div 
                    // className='dashboard-content-search'
                    >
                        {/* <input
                            type='text'
                            value={searchValue}
                            placeholder='Search bookings..'
                            className='dashboard-content-input'
                            onChange={(e) => setSearchValue(e.target.value)}
                        /> */}
                        <TextField
                            className="Search"
                            style={{borderRadius: '100px'}}
                            
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                            label="Search bookings.."
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon  style={{
                                        color: 'white', 
                                        borderRadius:'10px', 
                                        backgroundColor: '#FB8085'}} />
                                        
                                </InputAdornment>
                                ),
                            }}
                            />
 
                    </div>
                     <button className='dashboard-add-btn' onClick={handleOpenModal}>
                        + New Bookings
                    </button>
                    
                     {isModalOpen && (
                        <AddBookingModal onClose={handleCloseModal} onSave={handleSaveBooking} />
                    )}
                </div>
                <div className='home_navtype_inner_end'> 
                    <img className='image1'   src={CarImage} />
                    Hello<div className='username'>{UserName}</div>
                    <img className='image2'   src={WaveImage} />
                </div>
            
            </div>
           
            <div className='view-bookings-main'>
                <div className='view-bookings-text'>View Bookings</div> 
               
                <img 
                    src={PhoneHand}
                    alt={`icon-${PhoneHand}`}
                    className='item-icon'
                     />
            </div>
            <div className='dashboard-content-container'>
                <div className='dashboard-content-titles'>
                    <div onClick={() => {
                        setPageNumber(0)
                        setCurrentPage(1)
                    }}
                      style={{ cursor: 'pointer', fontWeight : 700,
                        textDecoration: pageNumber === 0 ? 'underline' : 'none' ,
                        color : pageNumber === 0 ? '#EB6B9D' : 'black',
                        textDecorationColor : pageNumber === 0 ? '#EB6B9D' : 'none',
                        textUnderlineOffset : pageNumber === 0 ? '10px' : 'none',
                        textDecorationThickness : pageNumber === 0 ? '4px' : 'none',
                        }}>Active
                    </div>
                    <div onClick={() => {
                        setPageNumber(1)
                        setCurrentPage(1)
                    }} 
                    style={{ cursor: 'pointer', fontWeight : 700,
                        textDecoration: pageNumber === 1 ? 'underline' : 'none' ,
                        color : pageNumber === 1 ? '#EB6B9D' : 'black',
                        textDecorationColor : pageNumber === 1 ? '#EB6B9D' : 'none',
                        textDecorationThickness : pageNumber === 1 ? '4px' : 'none',
                        textUnderlineOffset : pageNumber === 1 ? '10px' : 'none'
                    }}>Completed
                    </div>
                    <div onClick={() => {
                        setPageNumber(2)
                        setCurrentPage(1)
                    }} 
                        style={{ cursor: 'pointer', fontWeight : 700,
                        textDecoration: pageNumber === 2 ? 'underline' : 'none' ,
                        color : pageNumber === 2 ? '#EB6B9D' : 'black',
                        textDecorationColor : pageNumber === 2 ? '#EB6B9D' : 'none',
                        textDecorationThickness : pageNumber === 2 ? '4px' : 'none',
                        textUnderlineOffset : pageNumber === 2 ? '10px' : 'none'
                    }} >Cancelled
                    </div>
                    
                </div>
                
                <table>
                    <thead>
                        <th>Name</th>
                        <th>DATE</th>
                        <th>Package Details</th>
                        <th>Payment Mode</th>
                        
                    </thead>
                    
                    {pageNumber === 0? (
                        <ActiveBookingsSlide  data = {displayedData} searchValue={searchValue} />
                    ) :null }
                    
                    {pageNumber === 1 ? (
                        <CompletedBookingsSlide  data = {displayedData} searchValue={searchValue} />  
                    ) : null}

                    {pageNumber === 2 ? (
                        <CancelledBookingsSlide  data = {displayedData} searchValue={searchValue} /> 
                    ) : null}
                  
                   
                </table>

                {array[pageNumber].length !== 0 ?
                    <div className='dashboard-content-footer'>
                       
                       <Pagination
                            count={Math.ceil(array[pageNumber].length / itemsPerPage)} 
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'><h2>Loading,Please wait....</h2></span>
                    </div>
                }
            </div>
        </div>
    )
}

export default HomePage;


export const ActiveBookingsSlide = ({data,searchValue}) => {
    
    return (
        <tbody>
            {data.length !== 0 && data.filter(item => {
                
                if(item){
                    return (item.userName.toLowerCase().includes(searchValue.toLowerCase()))
                }
            })
            ?.map((order, index) => (
                <tr key={index}>
                    <td><span className='username'>{order.userName}</span></td>
                    <td>
                        {new Date(order.bookingEpochTime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </td>
                    <td>
                        {order.packageTitle}
                        
                    </td>
                    <td >
                    <div style={{
                        fontSize :'10px',
                        backgroundColor: order.offlineBooking ? ' rgba(255, 202, 40, 1)' : ' rgba(53, 219, 162, 1)',
                        color: order.offlineBooking ? 'black' : 'white',
                        borderRadius: '10px',
                        padding: '2px',
                        width: order.offlineBooking ? 'fit-content' : 'fit-content',
                        }} >
                        {order.offlineBooking === false ? 'Online Payment' : 'Offline Payment'}
                    </div>
                    
                </td>
                    
                </tr>
            ))}
        </tbody>
    )
}

export const CompletedBookingsSlide = ({data,searchValue}) => {
    
    return (
        <tbody>
            {data.length !== 0 && data.filter(item => { 
                if(item){
                    return (item.userName.toLowerCase().includes(searchValue.toLowerCase()))
                }
            })
            ?.map((order, index) => (
                <tr key={index}>
                <td><span>{order.userName}</span></td>
                <td>
                        {new Date(order.bookingEpochTime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                </td>
                <td>
                    {order.packageTitle}
                    
                </td>
                <td >
                    <div style={{
                        fontSize :'10px',
                        backgroundColor: order.offlineBooking ? ' rgba(255, 202, 40, 1)' : ' rgba(53, 219, 162, 1)',
                        color: order.offlineBooking ? 'black' : 'white',
                        borderRadius: '10px',
                        padding: '2px',
                        width: order.offlineBooking ? 'fit-content' : 'fit-content',
                        }} >
                        {order.offlineBooking === false ? 'Online Payment' : 'Offline Payment'}
                    </div>
                    
                </td>
                
            </tr>
            ))}
        </tbody>
    )
}

export const CancelledBookingsSlide = ({data, searchValue}) => {
    
    return ( 
        <tbody>
            {data.length !== 0 && data.filter(item => {
                if(item){
                    return (item.userName.toLowerCase().includes(searchValue.toLowerCase()))
                }
            })
            ?.map((order, index) => (
                <tr key={index}>
                <td><span>{order.userName}</span></td>
                <td>
                        {new Date(order.bookingEpochTime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                </td>
                <td>
                    {order.packageTitle}
                    
                </td>
                <td >
                    <div style={{
                        fontSize :'10px',
                        backgroundColor: order.offlineBooking ? ' rgba(255, 202, 40, 1)' : ' rgba(53, 219, 162, 1)',
                        color: order.offlineBooking ? 'black' : 'white',
                        borderRadius: '10px',
                        padding: '2px',
                        width: order.offlineBooking ? 'fit-content' : 'fit-content',
                        }} >
                        {order.offlineBooking === false ? 'Online Payment' : 'Offline Payment'}
                    </div>
                    
                </td>
                
            </tr>
            ))}
        </tbody>
    )
}













