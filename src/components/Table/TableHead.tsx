import { useDeferredValue } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Box,
  Th,
  Input,
  Flex,
} from '@chakra-ui/react';

import { Header, flexRender, Table } from '@tanstack/react-table';
import { Person } from '../../mock/makeData';

const TableHead = ({ header, table }: {
  header: Header<Person, unknown> 
  table: Table<any>
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(header.column.id)

  const deferredInputValue = useDeferredValue(header.column.getFilterValue())

  return (
    <Th key={header.id}>
      <Menu>
        <MenuButton as={Box} >
          {header?.isPlaceholder
            ? null
            : flexRender(
              header.column.columnDef.header,
              header.getContext()
            )}
        </MenuButton>
        <MenuList w="200px">
          <MenuGroup title="Pinning">
            {header.column.getIsPinned() !== 'left' && (
              <MenuItem
                onClick={() => {
                  header.column.pin('left')
                }}
              >
                Pin left
              </MenuItem>
            )}
            {header.column.getIsPinned() && (
              <MenuItem
                onClick={() => {
                  header.column.pin(false)
                }}
              >
                Unpinned
              </MenuItem>
            )}
            {header.column.getIsPinned() !== 'right' && (
              <MenuItem
                onClick={() => {
                  header.column.pin('right')
                }}
              >
                Pin right
              </MenuItem>
            )}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Sort">
            <MenuItem
              onClick={() => header.column.toggleSorting(false)}
            >
              Sort ascending
            </MenuItem>
            <MenuItem
              onClick={() => header.column.toggleSorting(true)}
            >
              Sort descending
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          {/* TODO: need to figure out what happens here */}
          <MenuGroup title="Filter" />
            {
              typeof firstValue === 'number' ? (
                <Flex gap="3">
                  <Input
                    type="number"
                    size="sm"
                    placeholder='min'
                    flex="1 1 50%"
                    marginInlineStart="3"
                    value={(deferredInputValue as [number, number])?.[0] ?? ''}
                    onChange={e => {
                      header.column.setFilterValue(
                        (old: [number, number]) => [e.target.value, old?.[1]]
                      )
                    }}
                  />
                  <Input
                    type="number"
                    size="sm"
                    placeholder='max'
                    marginInlineEnd="3"
                    flex="1 1 50%"
                    value={(deferredInputValue as [number, number])?.[1] ?? ''}
                    onChange={e => {
                      header.column.setFilterValue(
                        (old: [number, number]) => [old?.[0], e.target.value]
                      )
                    }}
                  />
                </Flex>
              ) : (
                <Input
                  type="text"
                  size="md"
                  mx="3"
                  w="calc(100% - 24px)"
                  value={(deferredInputValue ?? '') as string}
                  onChange={e => header.column.setFilterValue(e.target.value)}
                />
              )
            }
        </MenuList>
      </Menu>
    </Th>
  )
}

export default TableHead;
