import React from 'react';

import { TriangleDownIcon, TriangleUpIcon, MinusIcon } from '@chakra-ui/icons';
import { Th, Flex ,Text} from '@chakra-ui/react';

function Column({ column, isWideVersion }) {
  const printSortIcon = () => {
    if (column.disableSortBy) return '';
    if (!column.isSorted) return <MinusIcon />;
    if (column.isSortedDesc) return <TriangleDownIcon />;
    return <TriangleUpIcon />;
  };

  if (!isWideVersion && !column.isMobile) return null;
  return (
    <Th paddingY={6} {...column.getHeaderProps(column.getSortByToggleProps())} >
     
        <Text  color="white" >{column.render('header')}</Text>
        {printSortIcon()}
     
    </Th>
  );
}

export default React.memo(Column);
