import {
  Input as ChakraInput,
  Text,
  FormLabel,
  FormControl,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

const InputBase = ({ error, name, label, ...rest }, ref) => {
  //const colorBox = useColorModeValue("#F1F1F1", "gray.900");
  return (
    <FormControl>
      {!!label && (
        <FormLabel fontWeight="bold" color="blue.800" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="green.800"
        bgColor="white"
        variant="filled"
        color="blue.800"
        _hover={{
          bgColor: 'gray.100',
        }}
        ref={ref}
        size="lg"
        {...rest}
        borderColor={error ? 'red.200' : 'gray.100'}
      />
      {error && (
        <Text position="absolute" color="red.200">
          {error.message}
        </Text>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
