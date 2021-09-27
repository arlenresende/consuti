import React, { useState, useRef, useEffect } from 'react'

import DataTable from '../../components/DataTable'
import { ModalDelete } from '../../components/ModalDelete'
import _random from 'lodash/random'
import _sample from 'lodash/sample'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/api'
import { Flex, HStack, Button, useDisclosure, useToast } from '@chakra-ui/react'
import Sidebar from '../../components/Sidebar'

function Dashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const dataTableElement = useRef(null)

  const [modalDataDelete, setModalDataDelete] = useState()

  const navigate = useNavigate()

  const { email } = useParams()

  useEffect(() => {
    console.log(pageCount)
  })

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy, globalFilter, cancelToken }) => {
      setLoading(true)
      setTimeout(() => {
        api
          .get(`ObterCategoriasPorEmail/${email}`)
          .then((response) => {
            console.log(response)
            const startRow = pageSize * pageIndex

            const endRow = startRow + pageSize

            if (globalFilter !== undefined) {
              response.data.ObterCategoriasPorEmailResult =
                response.data.ObterCategoriasPorEmailResult.filter((i) =>
                  i.Nome?.toLowerCase()?.includes(globalFilter)
                )
            }

            if (sortBy.length > 0) {
              const { desc } = sortBy[0]
              if (desc)
                response.data.ObterCategoriasPorEmailResult =
                  response.data.ObterCategoriasPorEmailResult.sort((a, b) =>
                    a.id < b.id ? 1 : -1
                  )
              else
                response.data.ObterCategoriasPorEmailResult =
                  response.data.ObterCategoriasPorEmailResult.sort((a, b) =>
                    a.id > b.id ? 1 : -1
                  )
            }

            setPageCount(
              Math.ceil(
                response.data.ObterCategoriasPorEmailResult.length / pageSize
              )
            )
            setData(
              response.data.ObterCategoriasPorEmailResult.slice(
                startRow,
                endRow
              )
            )
            setLoading(false)
          })
          .catch((error) => {
            // TRATAR ERRO
            // if (!error.toString() === 'Cancel') {
            //   console.log(error);
            // }
          })
      }, 1000)
    },
    []
  )

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()

  const toast = useToast()

  const modalOpenDelete = (mData) => {
    setModalDataDelete(mData)
    onOpenDelete()
  }

  function onDelete(notificationId) {
    api.delete(`ExcluirCategoria/${notificationId}`).then((response) => {
      if (response.status !== 200) {
        toast({
          title: 'Item não pode ser deletado',
          description: '',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })

        return
      }

      toast({
        title: 'Item deletado com sucesso!',
        description: '',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      window.location.reload()
    })
  }

  const onRenderAction = ({ cell }) => {
    return (
      <HStack>
        <Button
          onClick={() =>
            navigate(`/edit_user/${email}/${cell.row.original.ID}`)
          }
          _hover={{ opacity: '0.7' }}
          background="yellow.200"
          color="white"
          notification={cell.row.original}
        >
          Editar
        </Button>
        <Button
          onClick={() => modalOpenDelete(cell.row.original)}
          _hover={{ opacity: '0.7' }}
          background="red.200"
          color="white"
        >
          Remover
        </Button>
      </HStack>
    )
  }

  const columns = React.useMemo(
    () => [
      {
        header: 'ID',
        accessor: 'ID',
        disableSortBy: true,
      },

      {
        header: 'Descrição',
        accessor: 'Descricao',
        disableSortBy: true,
        isMobile: true,
      },

      {
        header: 'Nome',
        accessor: 'Nome',
        disableSortBy: true,
      },
      {
        header: 'Ordem',
        accessor: 'Ordem',
        disableSortBy: true,
      },

      {
        header: 'Tipo',
        accessor: 'Tipo',
        disableSortBy: true,
      },

      {
        header: 'Ação',
        accessor: 'actions',
        isSpecial: true,
        onRender: onRenderAction,
        disableSortBy: true,
        isMobile: true,
      },
    ],
    []
  )

  return (
    <Flex
      h={[null, null, '100vh']}
      flexDir={['column', 'column', 'row']}
      overflow="hidden"
    >
      <Sidebar />
      {/* Column 2 */}
      <Flex
        w={['100%', '100%', '100%', '100%', '100%']}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
      >
        <Flex flexDir="column">
          <DataTable
            columns={columns}
            data={data}
            fetchData={fetchData}
            loading={loading}
            pageCount={pageCount}
            searchOnKeyUp
            ref={dataTableElement}
          />
        </Flex>
      </Flex>
      <ModalDelete
        onConfirm={onDelete}
        isOpenDelete={isOpenDelete}
        onClose={onCloseDelete}
        itemId={modalDataDelete?.ID}
      />
    </Flex>
  )
}

export default React.memo(Dashboard)
