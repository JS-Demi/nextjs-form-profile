'use client'
import { useRouter } from '@/navigation'
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
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React, { FC } from 'react'

interface SuccessProps {
	isOpen: boolean
	onClose: () => void
}

const Success: FC<SuccessProps> = ({ isOpen, onClose }) => {
	const t = useTranslations('modal')
	const router = useRouter()
	const handleClose = () => {
		onClose()
		router.push('/')
	}
	return (
		<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				w={400}
				gap='12px'
			>
				<ModalHeader>{t('success.title')}</ModalHeader>
				<ModalBody>
					<svg
						width='80'
						height='80'
						viewBox='0 0 80 80'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect width='80' height='80' rx='40' fill='#05AE71' fill-opacity='0.15' />
						<path
							fill-rule='evenodd'
							clip-rule='evenodd'
							d='M20.8 40C20.8 29.4016 29.4016 20.8 40 20.8C50.5985 20.8 59.2001 29.4016 59.2001 40C59.2001 50.5985 50.5985 59.2001 40 59.2001C29.4016 59.2001 20.8 50.5985 20.8 40ZM47.4093 32.9903C46.9678 32.6817 46.3556 32.7557 46.0058 33.16L37.8957 42.5311L33.715 38.7738C33.3165 38.4157 32.7008 38.4157 32.3023 38.7738L30.7329 40.1842C30.2891 40.5831 30.2891 41.264 30.7329 41.6629L36.5953 46.9314C36.7874 47.1041 37.0396 47.2001 37.3016 47.2001H38.9073C39.2144 47.2001 39.5058 47.0683 39.7033 46.8401L49.3568 35.6856C49.7452 35.2368 49.6585 34.5625 49.1684 34.2199L47.4093 32.9903Z'
							fill='#05AE71'
						/>
					</svg>
				</ModalBody>
				<ModalFooter>
					<Button
						onClick={handleClose}
						borderRadius={'4px'}
						fontSize={14}
						fontWeight={400}
						color={'white'}
						bgColor={'#5558FA'}
						bg={''}
						mr={3}
						border={'2px solid #5558FA'}
						marginRight={0}
						_hover={{ background: 'white', color: '#5558FA', fontWeight: 600 }}
					>
						{t('success.btn')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default Success
