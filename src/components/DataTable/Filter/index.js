import React, { useState, useEffect, useCallback } from 'react';

import _debounce from 'lodash/debounce';

import { RiSearchLine } from "react-icons/ri"
import { Flex, InputRightElement, Stack,Input,Button,Icon  } from '@chakra-ui/react';



export default React.memo(({ filter, searchOnKeyUp, loading }) => {
  const [searchWord, setSearchWord] = useState('');
  const [firstRender, setFirstRender] = useState(true);
  

  const onFilter = (e) => {
    if (loading) return;

    if (e) {
      e.preventDefault();
      if (searchOnKeyUp) {
        return;
      }
    }

    filter(searchWord);
  };

  const delayedQuery = useCallback(_debounce(onFilter, 500), [searchWord]);

  useEffect(() => {
    if (!searchOnKeyUp || firstRender) {
      setFirstRender(false);
      return null;
    }
    delayedQuery();

    // Cancel the debounce on useEffect cleanup.
    return delayedQuery.cancel;
  }, [searchWord, delayedQuery]);

  return (

      <Stack spacing="4" flexDirection="row"  justifyContent="flex-end">
        <form onSubmit={(e) => onFilter(e)}>
          <Flex
              as="label"
              flex="1"
              py="2"
              px="4"
              ml="6"
              maxWidth={400}
              alignSelf="center"
              color="gray.200"
              pos="relative"
              bg="gray.100"
              borderRadius="full"
              
          >
             <Input
              type="text"
              placeholder="Search"
              value={searchWord}
              _placeholder={{ color: 'gray.400' }}
              px="2"
              mr="2"
              onChange={(e) => setSearchWord(e.target.value)}
              inputRightElement={
                <InputRightElement>
                  <Button h="100%" w="100%" size="sm" type="submit">
                    <Icon as={RiSearchLine} fontSize="20" color="gray.800" />
                  </Button>
                </InputRightElement>
              }
            />
              
          </Flex>

         
        </form>
      </Stack>
   
  );
});
