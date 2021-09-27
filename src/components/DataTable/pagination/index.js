import React from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Stack, Box, Select, Button, useColorModeValue } from '@chakra-ui/react'

import { range } from '../../../helpers/range'

export default React.memo(
  ({
    pageIndex,
    pageCount,
    canPreviousPage,
    canNextPage,
    gotoPage,
    loading,
    pageSize,
    setPageSize,
    isWideVersion,
  }) => {
    const fetchPageNumbers = (totalPages, currentPage, pageNeighbors) => {
      const totalNumbers = pageNeighbors * 2 + 2
      const totalBlocks = totalNumbers + 2

      if (totalPages <= totalBlocks) return range(1, totalPages)

      const startPage = Math.max(1, currentPage - pageNeighbors)
      const endPage = Math.min(totalPages, currentPage + pageNeighbors)
      let pages = range(startPage, endPage)

      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      if (hasLeftSpill && !hasRightSpill) {
        const extraPages = range(startPage - spillOffset, startPage - 1)
        pages = [...extraPages, ...pages]
      } else if (!hasLeftSpill && hasRightSpill) {
        const extraPages = range(endPage + 1, endPage + spillOffset)
        pages = [...pages, ...extraPages]
      }

      return pages
    }

    const paginationButton = (page, currentPage) => {
      return (
        <Button
          size="sm"
          key={`paginationButton${page}`}
          fontSize="xs"
          width="4"
          bgColor="green.200"
          isLoading={loading && currentPage}
          isDisabled={loading || currentPage}
          _disabled={{
            bgColor: loading ? 'green.200' : 'green.500',
            cursor: 'default',
          }}
          _hover={{
            bgColor: 'primary',
          }}
          onClick={() => {
            const targetPage = Number(page) - 1
            gotoPage(targetPage)
          }}
          color="#ffffff"
        >
          {page}
        </Button>
      )
    }

    const renderPaginationButtons = () => {
      const currentPage = pageIndex + 1
      const pages = fetchPageNumbers(pageCount, currentPage, 2)

      const buttons = pages.map((page) =>
        paginationButton(page, page === currentPage)
      )

      return buttons
    }

    return (
      <Box>
        <Stack
          direction={['column', 'row']}
          mt="8"
          justify="space-between"
          alignItems="center"
          spacing="6"
          marginBottom={30}
        >
          <Box color="green.500">
            Página
            <strong> {pageIndex + 1}</strong> -<strong> {pageCount}</strong>
          </Box>
          <Stack direction="row" spacing="2">
            {isWideVersion && (
              <Select
                bg="green.500"
                size="sm"
                borderColor="primary"
                _hover={{
                  bgColor: 'primaryHover',
                  borderColor: 'primaryHover',
                }}
                borderRadius={5}
                color="white"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 15, 20, 25].map((rowPerPage) => (
                  <option key={rowPerPage} value={rowPerPage}>
                    Mostrar - {rowPerPage}
                  </option>
                ))}
              </Select>
            )}
            <Button
              size="sm"
              fontSize="xs"
              width="4"
              color="#ffffff"
              bgColor="green.500"
              _hover={{ bgColor: 'primary' }}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <ArrowLeftIcon />
            </Button>
            {renderPaginationButtons()}
            <Button
              size="sm"
              color="#ffffff"
              fontSize="xs"
              width="4"
              bgColor="green.500"
              _hover={{ bgColor: 'primary' }}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <ArrowRightIcon />
            </Button>
          </Stack>
        </Stack>
        {!isWideVersion && (
          <Select
            bg="green.500"
            size="sm"
            marginTop="10"
            borderColor="primary"
            borderRadius={5}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 15, 20, 25].map((rowPerPage) => (
              <option key={rowPerPage} value={rowPerPage}>
                Mostrar - {rowPerPage}
              </option>
            ))}
          </Select>
        )}
      </Box>
    )
  }
)
