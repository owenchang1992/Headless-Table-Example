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
          <MenuItem>Pin left</MenuItem>
          <MenuItem>Pin right</MenuItem>
          <MenuItem>Sort ascending</MenuItem>
          <MenuItem>Sort ascending</MenuItem>
        </MenuList>
      </Menu>
    </Th>
  )
}

export default TableHead;
