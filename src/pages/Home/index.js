import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  HStack,
  useToast,
  Flex,
} from '@chakra-ui/react'

import { Input } from '../../components/Form/Input'

import api from '../../services/api'

import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const sendTableSchema = yup.object().shape({
  Email: yup.string().required('E-mail Obrigatório').email('E-mail Inválido'),
})

export default function Home() {
  const navigate = useNavigate()
  const toast = useToast()

  const { control, register, handleSubmit, formState } = useForm({
    resolver: yupResolver(sendTableSchema),
  })

  const { errors } = formState

  const handleSubmitForm = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    api.get(`ObterCategoriasPorEmail/${values.Email}`).then((response) => {
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
        title: 'Email cadastrado com sucesso!',
        description: '',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      navigate(`/dashboard/${values.Email}`)
    })
  }

  return (
    <Container maxW={'3xl'} height="100vh">
      <Stack
        textAlign={'center'}
        spacing={{ base: 20, md: 14 }}
        flexDirection="column"
        align="center"
        justifyContent="center"
        height="100vh"
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
          color="green.200"
        >
          Desafio Técnico <br />
          <Text as={'span'} color={'green.500'}>
            Consuti
          </Text>
        </Heading>
        <Text color={'green.500'} fontWeight="600" fontSize={25}>
          Para dar início, basta digitar seu email!
        </Text>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}
        >
          <Box as="form" onSubmit={handleSubmit(handleSubmitForm)}>
            <Stack flexDir="column" spacing={8}>
              <Input
                name="Email"
                label="Email"
                {...register('Email')}
                error={errors.Email}
              />

              <Button
                background="green.800"
                color="white"
                type="submit"
                _hover={{
                  bgColor: 'gray.200',
                }}
              >
                Enviar
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Container>
  )
}
