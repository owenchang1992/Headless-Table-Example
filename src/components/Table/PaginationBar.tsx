import { Table } from '@tanstack/react-table';
import { Person } from '../../mock/makeData';
import { ButtonGroup, Button, Flex, Box, Input, Select } from '@chakra-ui/react';

const PaginationBar = ({ table }: { table: Table<Person> }) => (
  <Flex alignItems="center" py="2" justifyContent="space-between" w="full" overflowX="scroll">
    <Flex gap="5">
      <ButtonGroup variant="outline" size="sm">
        <Button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </Button>
        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </Button>
      </ButtonGroup>
      <Flex alignItems="center">
        <Box>Page</Box>
        {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </Flex>
    </Flex>
    <Flex gap="5" alignItems="center">
      <Flex alignItems="center" w="fit-content" gap="3">
        <Box w="95px">
          | Go to page:
        </Box>
        <Input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
          size="sm"
          w={20}
        />
      </Flex>
      <Select
        size="sm"
        w="22"
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Select>
    </Flex>
  </Flex>
)

export default PaginationBar;
