import React, { FC } from 'react'
import callModal from './callModal'
import { UseDisclosureProps, useDisclosure } from '@chakra-ui/react'

export type status = 'success' | 'failed' | null
export interface ModalProps {
	status: status
	isOpen: boolean
	onClose: () => void
}

const Modal: FC<ModalProps> = ({ status, isOpen, onClose }) => {
	if (!status) {
		return null
	}
	const ModalComponent = callModal(status)
	return <ModalComponent isOpen={isOpen} onClose={onClose} />
}

export default Modal
