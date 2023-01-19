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
  Input
} from '@chakra-ui/react';

import { Header, flexRender } from '@tanstack/react-table';
import { Person } from '../../mock/makeData';

const TableHead = ({ header }: { header: Header<Person, unknown> }) => {
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
          <MenuGroup title="Filter">
            <Input
              type="text"
              size="md"
              mx="3"
              w="calc(100% - 24px)"
              value={(deferredInputValue ?? '') as string}
              onChange={e => header.column.setFilterValue(e.target.value)}
            />
          </MenuGroup>
        </MenuList>
      </Menu>
    </Th>
  )
}

export default TableHead;
