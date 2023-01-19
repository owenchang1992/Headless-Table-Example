import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Card,
} from '@chakra-ui/react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  ColumnOrderState,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table';

import { makeData, Person } from '../../mock/makeData'
import TableHeader from './TableHeader';
import PaginationBar from './PaginationBar';
import TableHead from './TableHead';

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    accessorFn: row => row.lastName,
    id: 'lastName',
    cell: info => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: props => props.column.id,
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    footer: props => props.column.id,
  },
  {
    accessorKey: 'visits',
    header: () => <span>Visits</span>,
    footer: props => props.column.id,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    footer: props => props.column.id,
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    footer: props => props.column.id,
  },
]

const defaultColumnOrder = ['progress', 'firstName', 'lastName', 'age', 'visits', 'status',]

const useMockPersonTable = () => {
  const [data] = React.useState(() => makeData(5000))
  const [columns] = React.useState(() => [...defaultColumns])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(defaultColumnOrder)
  const [columnPinning, setColumnPinning] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      columnPinning,
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  return table;
}

const MainTable = () => {
  const table = useMockPersonTable();

  return (
    <>
      <TableHeader table={table} />
      <Card>
        <TableContainer display="flex">
          <Table flex="0 1 0" boxShadow="lg" >
            <Thead>
              {table.getLeftHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead header={header} />
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.slice(0, 20).map((row) => (
                <Tr key={row.id}>
                  {row.getLeftVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              {table.getLeftFooterGroups().map((footerGroup) => (
                <Tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Tfoot>
          </Table>
          <Table  flex="1 1 0" >
            <Thead>
              {table.getCenterHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead header={header}/>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.slice(0, 20).map((row) => (
                <Tr key={row.id}>
                  {row.getCenterVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              {table.getCenterFooterGroups().map((footerGroup) => (
                <Tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Tfoot>
          </Table>
          <Table flex="0 1 0" boxShadow="lg">
            <Thead>
              {table.getRightHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead header={header} />
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.slice(0, 20).map((row) => (
                <Tr key={row.id}>
                  {row.getRightVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              {table.getRightFooterGroups().map((footerGroup) => (
                <Tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Tfoot>
          </Table>
        </TableContainer>
      </Card>
      <PaginationBar table={table} />
    </>
  )
}

export default MainTable;