import HomeIcon from '../assets/icons/home.svg'
import EarningsIcon from '../assets/icons/earnings.svg';
import ServicesIcon from '../assets/icons/services.svg'
import AssetsIcon from '../assets/icons/assets.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: HomeIcon,
        path: '/dashboard',
        title: 'Home',
    },
    {
        id: 2,
        icon: EarningsIcon,
        path: '/earnings',
        title: 'My Earnings',
    },
    {
        id: 3,
        icon: ServicesIcon,
        path: '/services',
        title: 'My Services',
    },
    {
        id: 4,
        icon: AssetsIcon,
        path: '/assets',
        title: 'My Assets',
    }
]

export default sidebar_menu;