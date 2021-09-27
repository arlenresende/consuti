import { Box, Button, Text } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export function ModalDelete({ onConfirm, isOpenDelete, onClose, itemId }) {
  function confirmDelete() {
    onConfirm(itemId || 0)
    onClose()
  }

  return (
    <Modal isOpen={isOpenDelete} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="white">
        <ModalHeader>
          <Box>
            <Text color="gray.800">Você tem certeza?</Text>
            <Text color="gray.800">Essa ação não pode ser revertida!</Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton color="white" background="red.200" />
        <ModalBody></ModalBody>

        <ModalFooter>
          <Button
            background="red.200"
            color="white"
            mr={3}
            onClick={() => confirmDelete()}
          >
            Sim
          </Button>
          <Button background="green.500" color="white" mr={3} onClick={onClose}>
            Não
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
