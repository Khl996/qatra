import { 
    Box, 
    VStack, 
    Button, 
    Icon, 
    Text,
    Divider,
    useColorModeValue
} from '@chakra-ui/react';
import { 
    FiHome,
    FiStar,
    FiTag,
    FiDollarSign,
    FiFileText,
    FiSettings 
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../../config/routes';

interface SidebarItem {
    label: string;
    path: string;
    icon: any;
}

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const menuItems: SidebarItem[] = [
        { label: 'لوحة التحكم', path: routes.merchant.dashboard, icon: FiHome },
        { label: 'النقاط', path: routes.merchant.points, icon: FiStar },
        { label: 'العروض', path: routes.merchant.offers, icon: FiTag },
        { label: 'المبيعات', path: routes.merchant.sales, icon: FiDollarSign },
        { label: 'التقارير', path: routes.merchant.reports, icon: FiFileText },
        { label: 'الإعدادات', path: routes.merchant.settings, icon: FiSettings }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <Box
            as="nav"
            h="100vh"
            w="240px"
            bg={bgColor}
            borderRight="1px"
            borderColor={borderColor}
            py={4}
        >
            <VStack spacing={2} align="stretch">
                {menuItems.map((item) => (
                    <Button
                        key={item.path}
                        variant={isActive(item.path) ? 'solid' : 'ghost'}
                        colorScheme={isActive(item.path) ? 'blue' : 'gray'}
                        justifyContent="start"
                        leftIcon={<Icon as={item.icon} />}
                        onClick={() => navigate(item.path)}
                        w="full"
                        px={4}
                    >
                        <Text>{item.label}</Text>
                    </Button>
                ))}
            </VStack>
        </Box>
    );
};

export default Sidebar;
