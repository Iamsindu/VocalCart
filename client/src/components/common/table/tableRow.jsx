import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { TableRow, Typography } from '@mui/material';


export function VCTableRow({ row, selected, onSelectRow }) {
    const [openPopover, setOpenPopover] = useState(null);

    const handleOpenPopover = useCallback((event) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
                </TableCell>

                <TableCell component="th" scope="row">
                    <Box
                        sx={{
                            gap: 2,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar alt={row.name} src={row.avatarUrl} />
                        {row.name}
                    </Box>
                </TableCell>

                <TableCell>{row.company}</TableCell>

                <TableCell>{row.role}</TableCell>

                <TableCell>
                    <Typography sx={{
                        color: (row.status === 'banned' && 'error' ? "red" : "green")
                    }}
                    >
                        {row.status}
                    </Typography>
                </TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenPopover}>
                        <MoreVertRoundedIcon />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!openPopover}
                anchorEl={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuList
                    disablePadding
                    sx={{
                        p: 0.5,
                        gap: 0.5,
                        width: 140,
                        display: 'flex',
                        flexDirection: 'column',
                        [`& .${menuItemClasses.root}`]: {
                            px: 1,
                            gap: 2,
                            borderRadius: 0.75,
                            [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
                        },
                    }}
                >
                    <MenuItem onClick={handleClosePopover}>
                        Edit
                    </MenuItem>

                    <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
                        Delete
                    </MenuItem>
                </MenuList>
            </Popover>
        </>
    );
}
