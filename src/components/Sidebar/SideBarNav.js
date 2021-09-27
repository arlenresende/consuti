import { Stack } from '@chakra-ui/react'
import { NavLink } from './NavLink'
import { NavSection } from './NavSections'

import { AddIcon, LinkIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom'

export function SidebarNav() {
  const { email } = useParams()
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="">
        <NavLink icon={AddIcon} fill="white" href={`/cad_user/${email}`}>
          Cadastrar usuário
        </NavLink>
        <NavLink icon={LinkIcon} fill="white" href={`/`}>
          Inserir novo e-mail
        </NavLink>
      </NavSection>
    </Stack>
  )
}
