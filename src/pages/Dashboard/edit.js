import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { Input } from '../../components/Form/Input'
import { TextArea } from '../../components/Form/textarea'
import Sidebar from '../../components/Sidebar'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Flex,
  Heading,
  HStack,
  Stack,
  Button,
  Box,
  useToast,
  Link,
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const sendTableSchema = yup.object().shape({
  Nome: yup.string().required('Campo Nome Obrigatório'),
  Ordem: yup.string().required('Campo Ordem Obrigatório'),
  Descricao: yup.string().required('Campo Descrição Obrigatório'),
})

export default function EditTable() {
  const [dataUser, setDataUser] = useState('')

  const { control, register, handleSubmit, formState } = useForm({
    resolver: yupResolver(sendTableSchema),
  })

  const { errors } = formState

  const toast = useToast()

  const { id, email } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`ObterCategoriaPorCodigo/${id}`).then((response) => {
      setDataUser(response.data.ObterPorCodigoResult)
    })
  }, [])

  const handleSubmitForm = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data = {
      ...values,
      ID: Number(id),
      Email: email,
      Ordem: Number(dataUser.Ordem),
    }

    api.put('AtualizarCategoria', ...[data]).then((response) => {
      if (response.status !== 200) {
        toast({
          title: 'Item não pode ser Editado.',
          description: '',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }

      toast({
        title: 'Item editado com sucesso!',
        description: '',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      navigate(`/dashboard/${email}`)
    })
  }
  return (
    <Flex
      h={[null, null, '100%']}
      flexDir={['column', 'column', 'column', 'row']}
      overflow="hidden"
      background="white"
    >
      {/* Column 1 */}
      <Sidebar />
      {/* Column 2 */}
      <Flex
        w={['100%', '100%', '100%', '100%', '100%']}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
      >
        <Flex justifyContent="space-between" mt={8}>
          <Flex align="justify-content" alignItems="center">
            <Heading color={'blue.800'} as="h2" size="lg" letterSpacing="tight">
              Editar Usuário:
            </Heading>
          </Flex>
        </Flex>
        <Box as="form" onSubmit={handleSubmit(handleSubmitForm)}>
          {dataUser && (
            <Flex flexDir="column" mt={8}>
              <Stack
                direction={['column', 'row']}
                mb={4}
                display="flex"
                spacing={5}
              >
                <Input
                  name="Nome"
                  label="Nome"
                  defaultValue={dataUser.Nome}
                  {...register('Nome')}
                  error={errors.Nome}
                />
                <Input
                  name="Ordem"
                  label="Ordem"
                  defaultValue={dataUser.Ordem}
                  {...register('Ordem')}
                  error={errors.Ordem}
                />
              </Stack>

              <Stack
                direction={['column', 'row']}
                mb={4}
                display="flex"
                spacing={5}
                mt={5}
              >
                <TextArea
                  name="Descricao"
                  label="Descricao"
                  defaultValue={dataUser.Descricao}
                  {...register('Descricao')}
                  error={errors.Descricao}
                />
              </Stack>

              <Flex mt="8" justify="flex-end">
                <HStack spacing="4">
                  <Button
                    background="red.200"
                    color="white"
                    type="submit"
                    _hover={{
                      bgColor: 'gray.200',
                    }}
                    onClick={() => navigate(`/dashboard/${email}`)}
                  >
                    Voltar
                  </Button>

                  <Button
                    background="green.800"
                    color="white"
                    type="submit"
                    _hover={{
                      bgColor: 'gray.200',
                    }}
                  >
                    Editar usuário
                  </Button>
                </HStack>
              </Flex>
            </Flex>
          )}
        </Box>
      </Flex>
      {/* Column 3 */}
    </Flex>
  )
}
