import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';

export function TableToolbar({ numSelected, filterName, onFilterName }) {
    return (
        <Toolbar
            sx={{
                height: 96,
                display: 'flex',
                justifyContent: 'space-between',
                p: (theme) => theme.spacing(0, 1, 0, 3),
                ...(numSelected > 0 && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter',
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <OutlinedInput
                    fullWidth
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="Search user..."
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchRoundedIcon sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    }
                    sx={{ maxWidth: 320 }}
                />
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteRoundedIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListRoundedIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}
