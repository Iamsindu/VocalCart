import {
    DASHBOARD,
    PRODUCT_LIST,
    PRODUCT_ADD,
    USERS_LIST,
    USERS_ADD
} from "../constants/routes";
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';


export const links = [
    {
        link: DASHBOARD,
        text: "Dashboard",
        id: "Dashboard",
        icon: <AutoGraphRoundedIcon />,
    },
    {
        text: "Products",
        id: "Products",
        icon: <ProductionQuantityLimitsRoundedIcon />,
        children: [
            {
                link: PRODUCT_LIST,
                text: "List products",
                id: "ProductAll",
                icon: <ProductionQuantityLimitsRoundedIcon />,
            },
            {
                link: PRODUCT_ADD,
                text: "Add products",
                id: "ProductNew",
                icon: <ProductionQuantityLimitsRoundedIcon />,
            },
        ],
    },
    {
        text: "Users",
        id: "Users",
        icon: <PersonRoundedIcon />,
        children: [
            {
                link: USERS_LIST,
                text: "List Users",
                id: "UserAll",
                icon: <PersonRoundedIcon />,
            },
            {
                link: USERS_ADD,
                text: "Add users",
                id: "UserNew",
                icon: <PersonRoundedIcon />,
            },
        ],
    },
];