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
} from '@chakra-ui/react';

import { Header, flexRender } from '@tanstack/react-table';
import { Person } from '../../mock/makeData';

const TableHead = ({ header }: { header: Header<Person, unknown> }) => {
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
        <MenuList>
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
        </MenuList>
      </Menu>
    </Th>
  )
}

export default TableHead;
