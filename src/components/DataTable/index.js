/* eslint-disable no-shadow */
import React from 'react'
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table'

import axios from 'axios'
import _uniqueId from 'lodash/uniqueId'

import {
  Table,
  Thead,
  Tr,
  Tbody,
  Box,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react'

import Cell from './Cell'
import Column from './Column'
import Filter from './Filter'
import Pagination from './pagination'

export default React.memo(
  ({
    columns,
    data,
    fetchData,
    loading,
    searchOnKeyUp,
    pageCount: controlledPageCount,
  }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      setGlobalFilter,
      setPageSize,
      state: { pageIndex, pageSize, sortBy, globalFilter },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 5 },
        manualPagination: true,
        manualSortBy: true,
        manualGlobalFilter: true,
        pageCount: controlledPageCount,
        autoResetPage: true,
        autoResetGlobalFilter: false,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    )

    const isWideVersion = useBreakpointValue({
      base: false,
      lg: true,
    })

    const filter = (filter) => {
      setGlobalFilter(filter)
    }

    React.useEffect(() => {
      const { CancelToken } = axios
      const source = CancelToken.source()
      const cancelToken = source.token

      console.log('teste')

      fetchData({ pageIndex, pageSize, sortBy, globalFilter, cancelToken })

      return () => {
        source.cancel()
      }
    }, [fetchData, pageIndex, pageSize, sortBy, globalFilter])

    const refresh = () => {
      setPageSize(pageSize)
    }

    return (
      <>
        {/* <Filter
          filter={filter}
          loading={loading}
          searchOnKeyUp={searchOnKeyUp}
        /> */}
        <Box
          height="auto"
          width="100%"
          position="relative"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <Spinner color="primary" size="xl" position="absolute" />
          ) : null}
          <Table
            variant="striped"
            colorScheme="whiteAlpha"
            mt={4}
            marginTop={4}
            {...getTableProps()}
            filter={loading ? 'blur(8px)' : ''}
          >
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr
                  {...headerGroup.getHeaderGroupProps()}
                  background={'green.500'}
                >
                  {headerGroup.headers.map((column) => (
                    <Column
                      key={_uniqueId('column-')}
                      column={column}
                      isWideVersion={isWideVersion}
                    />
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row)
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Cell
                          key={_uniqueId('cell-')}
                          cell={cell}
                          row={row}
                          isWideVersion={isWideVersion}
                        />
                      )
                    })}
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
        <Pagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          gotoPage={gotoPage}
          loading={loading}
          pageSize={pageSize}
          setPageSize={setPageSize}
          isWideVersion={isWideVersion}
        />
      </>
    )
  }
)
