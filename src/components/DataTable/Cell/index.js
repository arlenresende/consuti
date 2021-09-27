import React from 'react';

import { Td ,Text} from '@chakra-ui/react';

function Cell({ row, cell, isWideVersion }) {
  if (!isWideVersion && !cell.column.isMobile) return null;

  let content = null;
  if (cell.column.isSpecial) {
    content = cell.column.onRender({ row, cell });
  } else {
    content = cell.render('Cell');
  }
  return <Td {...cell.getCellProps()}><Text fontWeight="bold" display="inline-table" color="gray">{content}</Text></Td>;
}

export default React.memo(Cell);
