import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import VClogo from "../../images/logo.png";
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import { useLocation, useNavigate } from 'react-router-dom';

const NAVIGATION = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: "products",
        title: 'Products',
        icon: <ProductionQuantityLimitsRoundedIcon />,
        children: [
            {
                segment: "add",
                title: 'Add product',
                icon: <DescriptionIcon />,
            },
            {
                segment: "list",
                title: 'All products',
                icon: <BarChartIcon />,
            },
        ],
    },
    {
        segment: "users",
        title: 'Users',
        icon: <ProductionQuantityLimitsRoundedIcon />,
        children: [
            {
                segment: "add",
                title: 'Add user',
                icon: <DescriptionIcon />,
            },
            {
                segment: "list",
                title: 'All users',
                icon: <BarChartIcon />,
            },
        ],
    },
    {
        kind: 'divider',
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
];

const demoTheme = createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter() {
    const location = useLocation();
    const navigate = useNavigate();

    return {
        pathname: location.pathname,
        searchParams: new URLSearchParams(location.search),
        navigate: (path) => navigate(path),
    };
}


export default function AdminDashboardLayout({ children }) {
    const router = useDemoRouter();

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            branding={{
                logo: <img src={VClogo} alt="vocal cart logo" />,
                title: 'VC',
                homeUrl: '/',
            }}
        >
            <DashboardLayout>
                <PageContainer>
                    {children}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}
