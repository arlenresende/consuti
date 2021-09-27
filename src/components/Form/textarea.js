import { Textarea as ChakraTextArea  , Text, FormLabel, FormControl} from '@chakra-ui/react'
import {forwardRef} from 'react'


const TextAreaBase = ({error, name, label, ...rest}, ref ) => {

    //const colorBox = useColorModeValue("#F1F1F1", "gray.900");
    return (
        <FormControl>
            { !! label && <FormLabel fontWeight="bold" color="blue.800"  htmlFor={name}>{label}</FormLabel>}
            <ChakraTextArea 
            id={name}
            name={name}
            focusBorderColor="green.800" 
            bgColor='white'
            variant="filled" 
            color="blue.800"
            _hover={{
                bgColor:'gray.100'
            }}
            borderColor={error ?'red.200' : 'gray.100'}
            size="lg" 
            ref={ref} 
            {...rest}
            
            />
            {
              error && <Text position="absolute" color="red.200">{error.message}</Text>
            }
            
        </FormControl>
    )
}
export const TextArea = forwardRef(TextAreaBase)