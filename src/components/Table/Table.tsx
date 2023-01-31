import React, { useEffect, useRef, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Flex,
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
  ColumnResizeMode,
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
    size: 200,
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
    columnResizeMode: 'onChange',
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
  const tableContainerRef = useRef<null | HTMLDivElement>(null);

  return (
    <Flex flexDirection="column" alignItems="center" w="full">
      <TableHeader table={table} />
      <Card w="full">
        <TableContainer
          ref={tableContainerRef}
          display="flex"
          w={table.getTotalSize()}
          zIndex={10}
        >
          <Table
            boxShadow="lg"
            left="0"
            position="absolute"
            width={table.getLeftTotalSize()}
            backgroundColor="white"
          >
            <Thead >
              {table.getLeftHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead header={header} table={table} />
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.slice(0, 20).map((row) => (
                <Tr key={row.id}>
                  {row.getLeftVisibleCells().map((cell) => (
                    <Td key={cell.id} w={cell.column.getSize()}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Table
            w={table.getCenterTotalSize()}
            ml={table.getLeftTotalSize()}
            mr={table.getRightTotalSize()}
          >
            <Thead>
              {table.getCenterHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead header={header} table={table} />
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.slice(0, 20).map((row) => (
                <Tr key={row.id}>
                  {row.getCenterVisibleCells().map((cell) => (
                    <Td key={cell.id} w={cell.column.getSize()}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Table
            boxShadow="lg"
            position="absolute"
            right="0"
            backgroundColor="white"
            w={table.getRightTotalSize()}
          >
            <Thead>
              {table.getRightHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead header={header} table={table} />
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.slice(0, 20).map((row) => (
                <Tr key={row.id}>
                  {row.getRightVisibleCells().map((cell) => (
                    <Td key={cell.id} w={cell.column.getSize()}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
      <PaginationBar table={table} />
    </Flex>
  )
}

export default MainTable;