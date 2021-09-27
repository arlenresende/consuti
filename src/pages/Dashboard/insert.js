import React, { useState } from 'react'

import { Input } from '../../components/Form/Input'
import { TextArea } from '../../components/Form/textarea'
import Sidebar from '../../components/Sidebar'

import api from '../../services/api'

import {
  Flex,
  Heading,
  HStack,
  Text,
  Button,
  Box,
  useToast,
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const sendTableSchema = yup.object().shape({
  Nome: yup.string().required('Campo Nome Obrigatório'),
  Ordem: yup.string().required('Campo Ordem Obrigatório'),
  Descricao: yup.string().required('Campo Descrição Obrigatório'),
})

export default function InsertUser() {
  const { id, email } = useParams()

  const navigate = useNavigate()
  const toast = useToast()

  const { control, register, handleSubmit, formState } = useForm({
    resolver: yupResolver(sendTableSchema),
  })

  const { errors } = formState

  const handleSubmitForm = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data = {
      Descricao: values.Descricao,
      Nome: values.Nome,
      Ordem: Number(values.Ordem),
      Email: email,
    }

    api
      .post('CadastrarCategoria', ...[data], {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          toast({
            title: 'Item não pode ser Cadastrado.',
            description: '',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })

          return
        }

        toast({
          title: 'Item cadastrado com sucesso!',
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
      flexDir={['column', 'column', 'row']}
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
        minH="100%"
      >
        <Flex justifyContent="space-between" mt={8}>
          <Flex align="justify-content" alignItems="center">
            <Heading color={'blue.800'} as="h2" size="lg" letterSpacing="tight">
              Cadastrar Usuário
            </Heading>
          </Flex>
        </Flex>
        <Box as="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <Flex flexDir="column" mt={8}>
            <HStack display="flex" spacing={5}>
              <Input
                name="Nome"
                label="Nome"
                {...register('Nome')}
                error={errors.Nome}
              />
              <Input
                type="number"
                name="Ordem"
                label="Ordem"
                {...register('Ordem')}
                error={errors.Ordem}
              />
            </HStack>

            <HStack
              direction={['column', 'row']}
              mb={4}
              display="flex"
              spacing={5}
              mt={5}
            >
              <TextArea
                name="Descricao"
                label="Descricao"
                {...register('Descricao')}
                error={errors.Descricao}
              />
            </HStack>

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
                  Cadastrar Usuário
                </Button>
              </HStack>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      {/* Column 3 */}
    </Flex>
  )
}
