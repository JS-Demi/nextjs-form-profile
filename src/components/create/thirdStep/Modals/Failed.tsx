'use client'
import { CheckIcon } from '@chakra-ui/icons'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Button,
	Box,
	ModalCloseButton,
	background,
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React, { FC } from 'react'

interface SuccessProps {
	isOpen: boolean
	onClose: () => void
}

const Failed: FC<SuccessProps> = ({ isOpen, onClose }) => {
	const t = useTranslations('modal')
	return (
		<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				display={'flex'}
				gap='12px'
				flexDirection={'column'}
				justifyContent={'space-evenly'}
				w={460}
				h={316}
			>
				<ModalHeader padding='32px' display={'flex'} justifyContent={'space-between'}>
					{t('failed.title')}
					<button onClick={onClose}>
						<svg
							width='28'
							height='28'
							viewBox='0 0 28 28'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<rect width='28' height='28' rx='14' fill='black' fill-opacity='0.04' />
							<path
								d='M9.40385 8.6965C9.59911 8.50123 9.91569 8.50123 10.111 8.6965L14.0002 12.5857L17.8892 8.69665C18.0845 8.50138 18.4011 8.50138 18.5963 8.69665L19.3034 9.40375C19.4987 9.59902 19.4987 9.9156 19.3034 10.1109L15.4144 13.9999L19.3033 17.8889C19.4986 18.0841 19.4986 18.4007 19.3033 18.596L18.5962 19.3031C18.401 19.4984 18.0844 19.4984 17.8891 19.3031L14.0002 15.4141L10.111 19.3032C9.91577 19.4985 9.59919 19.4985 9.40393 19.3032L8.69682 18.5961C8.50156 18.4009 8.50156 18.0843 8.69682 17.889L12.5859 13.9999L8.69674 10.1107C8.50148 9.91545 8.50148 9.59886 8.69674 9.4036L9.40385 8.6965Z'
								fill='#B3B3B3'
							/>
						</svg>
					</button>
				</ModalHeader>
				<ModalBody display={'flex'} alignItems={'center'} alignSelf={'center'}>
					<svg
						width='80'
						height='80'
						viewBox='0 0 80 80'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect width='80' height='80' rx='40' fill='#E84E58' fill-opacity='0.15' />
						<path
							fill-rule='evenodd'
							clip-rule='evenodd'
							d='M39.9998 20.7998C29.4014 20.7998 20.7998 29.4014 20.7998 39.9998C20.7998 50.5982 29.4014 59.1998 39.9998 59.1998C50.5982 59.1998 59.1998 50.5982 59.1998 39.9998C59.1998 29.4014 50.5982 20.7998 39.9998 20.7998ZM32.4095 31.4835C32.7319 31.161 33.2548 31.161 33.5772 31.4835L40 37.9062L46.4225 31.4838C46.745 31.1613 47.2678 31.1613 47.5903 31.4838L48.758 32.6515C49.0805 32.974 49.0805 33.4968 48.758 33.8192L42.3355 40.2417L48.7579 46.6641C49.0804 46.9865 49.0804 47.5094 48.7579 47.8318L47.5902 48.9996C47.2677 49.322 46.7449 49.322 46.4224 48.9996L40 42.5772L33.5773 48.9998C33.2549 49.3223 32.7321 49.3223 32.4096 48.9998L31.2419 47.8321C30.9194 47.5096 30.9194 46.9868 31.2419 46.6643L37.6645 40.2417L31.2417 33.819C30.9193 33.4965 30.9193 32.9737 31.2417 32.6512L32.4095 31.4835Z'
							fill='#E84E58'
						/>
					</svg>
				</ModalBody>
				<ModalFooter>
					<Button
						bgColor={'#5558FA'}
						color='white'
						mr={3}
						fontSize={14}
						border='2px solid #5558FA'
						_hover={{ bgColor: 'white', color: '#5558FA' }}
						onClick={onClose}
					>
						{t('failed.btn')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default Failed
