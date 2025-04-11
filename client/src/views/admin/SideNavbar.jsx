import { Box, ListItem, ListItemButton } from "@mui/material";
import { usePathname } from "../../hooks";
import { Link } from "react-router-dom";
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export const navData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <AutoGraphRoundedIcon />,
    },
    {
        title: 'User',
        path: '/user',
        icon: <PersonRoundedIcon />,
    },
    {
        title: 'Product',
        path: '/products',
        icon: <ProductionQuantityLimitsRoundedIcon />,
    },
];

export function SideNavbar({ data, slots, sx }) {
    const pathname = usePathname();

    return (
        <>
            {slots?.topArea}
            <Box
                component="nav"
                sx={[
                    {
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            >
                <Box
                    component="ul"
                    sx={{
                        gap: 0.5,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {navData.map((item) => {
                        const isActived = item.path === pathname;

                        return (
                            <ListItem disableGutters disablePadding key={item.title}>
                                <ListItemButton
                                    disableGutters
                                    component={Link}
                                    to={item.path}
                                    sx={[
                                        (theme) => ({
                                            pl: 2,
                                            py: 1,
                                            gap: 2,
                                            pr: 1.5,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            fontWeight: 'fontWeightMedium',
                                            minHeight: 44,
                                            ...(isActived && {
                                                fontWeight: 'fontWeightSemiBold',
                                                color: theme.vars.palette.primary.main,
                                            }),
                                        }),
                                    ]}
                                >
                                    <Box component="span" sx={{ width: 24, height: 24 }}>
                                        {item.icon}
                                    </Box>

                                    <Box component="span" sx={{ flexGrow: 1 }}>
                                        {item.title}
                                    </Box>

                                    {item.info && item.info}
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </Box>
            </Box>

            {slots?.bottomArea}
        </>
    );
}
