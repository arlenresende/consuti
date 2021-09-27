import { Box, Stack, Text } from "@chakra-ui/react";


export function NavSection({title, children}){
    return(
        <Box>
            <Text fontWeight="bold" color="white" fontSize="small">{title}</Text>
            <Stack spacing="4" mt="4" align="stretch">
                <Stack spacing="4" mt="4" align="stretch">
                {children}
                
                </Stack>
            </Stack>  
        </Box> 
    )
}