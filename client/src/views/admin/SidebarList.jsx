import React from "react";

import { usePathname } from "next/navigation";
import { isEmpty } from "lodash";
import Link from "next/link";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    List,
    Collapse,
    ListItemText,
} from "@mui/material";


const SidebarList = ({
    menuList,
    route,
    expandedNodes,
    isDrawerOpen,
    handleMenuClick,
    handleNodeClick,
}) => {
    const path = usePathname();
    return menuList.map((menu) => {
        return (
            <ListItem
                key={menu.id}
                disablePadding
                sx={{
                    display: "block",
                    pb: 0.5,
                }}
            >
                <Link href={menu?.link || ""} passHref style={{ padding: 0 }}>
                    <ListItemButton
                        onClick={() => handleMenuClick(menu.id, !isEmpty(menu.children))}
                        sx={{
                            minHeight: 48,
                            justifyContent: isDrawerOpen ? "initial" : "center",
                            mx: 2,
                            borderRadius: 2,
                            backgroundColor: path === menu.link ? "#F9F5FF" : "",
                            "&:hover": {
                                backgroundColor: "#F9F5FF",
                                "& .MuiListItemIcon-root": {
                                    color: "primary.main",
                                },
                                "& .MuiListItemText-primary": {
                                    color: "primary.main",
                                },
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: isDrawerOpen ? 3 : "auto",
                                justifyContent: "center",
                                color: path === menu.link ? "primary.main" : "",
                                "&:hover": {
                                    color: "inherit",
                                },
                            }}
                        >
                            {menu.icon}
                        </ListItemIcon>
                        {isDrawerOpen && (
                            <>
                                <ListItemText
                                    primary={menu.text}
                                    sx={{
                                        color:
                                            path === menu.link ? "primary.main" : "text.secondary",
                                        "&:hover": {
                                            color: "primary.main",
                                        },
                                    }}
                                />
                                {!isEmpty(menu.children) &&
                                    isDrawerOpen &&
                                    ((expandedNodes || []).includes(menu.id) ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    ))}
                            </>
                        )}
                    </ListItemButton>
                </Link>
                {menu.children && (
                    <Collapse
                        in={
                            isDrawerOpen &&
                            Array.isArray(expandedNodes) &&
                            expandedNodes.includes(menu.id)
                        }
                        timeout="auto"
                        unmountOnExit
                    >
                        <List sx={{ marginLeft: 1 }}>
                            <SidebarList
                                menuList={menu.children}
                                route={[...route, menu.id]}
                                expandedNodes={expandedNodes}
                                isDrawerOpen={isDrawerOpen}
                                handleMenuClick={handleMenuClick}
                                handleNodeClick={handleNodeClick}
                            />
                        </List>
                    </Collapse>
                )}
            </ListItem>
        );
    });
};

export default SidebarList;