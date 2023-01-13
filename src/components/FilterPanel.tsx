import React from 'react';
import { Table, Column } from '@tanstack/react-table';
import { Person } from '../mock/makeData';
import { 
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Checkbox,
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Divider,
  useBreakpointValue,
  DrawerProps,
} from '@chakra-ui/react'
import { Reorder, useMotionValue } from "framer-motion";
import { useRaisedShadow } from '../hooks/useRaisedShadow';
import { SettingsIcon } from '@chakra-ui/icons';

interface Props {
  item: Column<Person, unknown>
}

export const Item = ({ item }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item as="div" value={item.id} id={item.id} style={{ boxShadow, y, padding: '8px 12px', borderRadius: '5px' }}>
      <Checkbox
        isChecked={item.getIsVisible()}
        onChange={item.getToggleVisibilityHandler()}
      >
        {item.id}
      </Checkbox>
    </Reorder.Item>
  );
};

const FilterPanel = ({ table }: { table: Table<Person>, setColumnOrder: (newOrder: any[]) => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const placement = useBreakpointValue<DrawerProps['placement']>({ base: 'bottom', md: 'right' })

  return (
    <Flex justifyContent="space-between" py={2} px={3}>
      <Heading>Title</Heading>
      <IconButton as={SettingsIcon} onClick={onOpen} aria-label={''} p={2}/>
      <Drawer
        isOpen={isOpen}
        placement={placement}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Display Columns</DrawerHeader>
          <Divider />
          <DrawerBody>
            <Box>
              <Checkbox
                py={2}
                isChecked={table.getIsAllColumnsVisible()}
                onChange={table.getToggleAllColumnsVisibilityHandler()}
              >
                Toggle All
              </Checkbox>
              <Reorder.Group axis="y" onReorder={table.setColumnOrder} values={table.getAllLeafColumns().map((column) => column.id)}>
                <Stack pl={2} spacing={[1]} direction={['column']}>
                  {table.getAllLeafColumns().map(column => <Item key={column.id} item={column} />)}
                </Stack>
              </Reorder.Group>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </Flex>
  )
}

export default FilterPanel;
