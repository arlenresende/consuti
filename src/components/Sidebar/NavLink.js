import { Icon, Text } from '@chakra-ui/react'

import { ActiveLink } from '../ActiveLink'

export function NavLink({ icon, children, data, href, ...rest }) {
  return (
    <ActiveLink to={href} display="flex" {...rest}>
      <>
        <Icon as={icon} fontSize={24} />
        <Text ml="4" fontWeight="bold" color="white" fontSize={18}>
          {children}
        </Text>
      </>
    </ActiveLink>
  )
}
