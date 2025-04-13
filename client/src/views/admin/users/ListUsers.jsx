import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { TableEmptyRows } from '../../../components/common/table/emptyRows';
import { TableNoData } from '../../../components/common/table/noData';
import { applyFilter, emptyRows, getComparator } from '../../../utils';
import { _users } from '../../../_mock/_data';
import { Container } from '@mui/material';
import { TableToolbar } from '../../../components/common/table/tableToolBar';
import { VCTableHead } from '../../../components/common/table/tableHead';
import { VCTableRow } from '../../../components/common/table/tableRow';
import { Link } from 'react-router-dom';
import { USERS_ADD } from '../../../constants/routes';
import AdminDashboardLayout from '../../../components/common/Drawer';


export function ListUsers() {
    const table = useTable();

    const [filterName, setFilterName] = useState('');

    const dataFiltered = applyFilter({
        inputData: _users,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <AdminDashboardLayout>
            <Box>
                <Container maxWidth="xl">
                    {/* // <DashboardContent> */}
                    <Box
                        sx={{
                            mb: 5,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ flexGrow: 1 }}>
                            Users
                        </Typography>
                        <Button
                            variant="contained"
                            color="inherit"
                            startIcon={<AddRoundedIcon />}
                            component={Link}
                            to={USERS_ADD}
                        >
                            New user
                        </Button>
                    </Box>

                    <Card>
                        <TableToolbar
                            numSelected={table.selected.length}
                            filterName={filterName}
                            onFilterName={(event) => {
                                setFilterName(event.target.value);
                                table.onResetPage();
                            }}
                        />

                        {/* <Scrollbar> */}
                        <TableContainer sx={{ overflow: 'unset' }}>
                            <Table sx={{ minWidth: 800 }}>
                                <VCTableHead
                                    order={table.order}
                                    orderBy={table.orderBy}
                                    rowCount={_users.length}
                                    numSelected={table.selected.length}
                                    onSort={table.onSort}
                                    onSelectAllRows={(checked) =>
                                        table.onSelectAllRows(
                                            checked,
                                            _users.map((user) => user.id)
                                        )
                                    }
                                    headLabel={[
                                        { id: 'name', label: 'Name' },
                                        { id: 'company', label: 'Company' },
                                        { id: 'role', label: 'Role' },
                                        { id: 'status', label: 'Status' },
                                        { id: '' },
                                    ]}
                                />
                                <TableBody>
                                    {dataFiltered
                                        .slice(
                                            table.page * table.rowsPerPage,
                                            table.page * table.rowsPerPage + table.rowsPerPage
                                        )
                                        .map((row) => (
                                            <VCTableRow
                                                key={row.id}
                                                row={row}
                                                selected={table.selected.includes(row.id)}
                                                onSelectRow={() => table.onSelectRow(row.id)}
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={68}
                                        emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                                    />

                                    {notFound && <TableNoData searchQuery={filterName} />}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* </Scrollbar> */}

                        <TablePagination
                            component="div"
                            page={table.page}
                            count={_users.length}
                            rowsPerPage={table.rowsPerPage}
                            onPageChange={table.onChangePage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onRowsPerPageChange={table.onChangeRowsPerPage}
                        />
                    </Card>
                    {/* </DashboardContent> */}
                </Container>
            </Box>
        </AdminDashboardLayout>
    );

}

export function useTable() {
    const [page, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState('name');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [order, setOrder] = useState();

    const onSort = useCallback(
        (id) => {
            const isAsc = orderBy === id && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        },
        [order, orderBy]
    );

    const onSelectAllRows = useCallback((checked, newSelecteds) => {
        if (checked) {
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }, []);

    const onSelectRow = useCallback(
        (inputValue) => {
            const newSelected = selected.includes(inputValue)
                ? selected.filter((value) => value !== inputValue)
                : [...selected, inputValue];

            setSelected(newSelected);
        },
        [selected]
    );

    const onResetPage = useCallback(() => {
        setPage(0);
    }, []);

    const onChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const onChangeRowsPerPage = useCallback(
        (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            onResetPage();
        },
        [onResetPage]
    );

    return {
        page,
        order,
        onSort,
        orderBy,
        selected,
        rowsPerPage,
        onSelectRow,
        onResetPage,
        onChangePage,
        onSelectAllRows,
        onChangeRowsPerPage,
    };
}
