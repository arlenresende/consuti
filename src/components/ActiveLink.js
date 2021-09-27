
import {useLocation, Link} from 'react-router-dom';
import {Link as ChakraLink,useColorModeValue} from '@chakra-ui/react'



export function ActiveLink({children, to,  ...rest} ){

    const colorMenu = useColorModeValue("white", "gray.500");
    const colorMenuActive = useColorModeValue("gray.300", "gray.200");

    let isActive = false; 

    const {pathname} = useLocation();
    
   

    if ( ( pathname?.startsWith(String(to))) || ( pathname?.startsWith(String('/monitoramentos/'+to))) ) {
        isActive = true; 
    }

    return(
        <ChakraLink as={Link} color={isActive ? colorMenu : colorMenuActive } to={to} { ...rest} >
            {
               children
            }
        </ChakraLink>
    )
}