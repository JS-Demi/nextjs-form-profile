'use client'
import React, { ChangeEvent, FC, useState } from 'react'
import Stepper from '../progressLine/Stepper'
import { ErrorMessage, Field, Form, Formik, FormikFormProps, FormikProps } from 'formik'
import * as Yup from 'yup'
import styles from './AboutMe.module.scss'
import { Box, Flex, Grid, useDisclosure } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { IAboutMe, useAboutMe } from './aboutMe-store'
import { useRouter } from '@/navigation'
import Modal, { type status } from './Modals/Modal'
import { useCommonStore } from '../store/all-data-store'

const AboutMe: FC = () => {
	const t = useTranslations('finalStep')
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const { about, setText } = useAboutMe(({ about, setText }) => ({ about, setText }))
	const { data, setThirdStep, modal, setActiveModal } = useCommonStore(
		({ data, setThirdStep, modal, setActiveModal }) => ({
			data,
			setThirdStep,
			modal,
			setActiveModal,
		})
	)

	const handleSubmit = (values: IAboutMe) => {
		setThirdStep(values)
		fetch('https://jsonplaceholder.typicode.com/todos/1')
			.then(() => {
				// Здесь отправляем конечный вариант всех данных
				setActiveModal('success')
				console.log(data)
			})
			.catch(() => {
				setActiveModal('failed')
			})
	}

	const initialValues: IAboutMe = {
		about,
	}

	const validationSchema = Yup.object().shape({
		about: Yup.string()
			.trim()
			.transform((value) => value.replaceAll('\n', ' ').replaceAll(' ', ''))
			.max(200, 'long'),
	})
	return (
		<>
			<Grid
				marginTop='24px'
				templateRows='30% 1fr'
				alignItems={'center'}
				justifyContent='center'
				w={900}
				minH={'500px'}
				bg={'white'}
				borderRadius={24}
				overflow='auto'
			>
				<Stepper progress={100} />
				<Formik
					onSubmit={handleSubmit}
					initialValues={initialValues}
					validationSchema={validationSchema}
				>
					{({ values, setFieldValue }) => {
						const count = values.about.replaceAll('\n', ' ').replaceAll(' ', '').length
						return (
							<Flex
								alignSelf='self-start'
								w={680}
								h='80%'
								marginBottom={'30px'}
								flexDirection='column'
							>
								<Form className={styles.form}>
									<Flex flexDirection='column' gap='8px'>
										<label htmlFor='about'>{t('aboutLabel')}</label>
										<Field
											className={styles.form__textarea}
											name='about'
											as='textarea'
											placeholder={t('placeholder')}
											id='field-about'
											value={about}
											onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
												const { value } = target
												setFieldValue('about', value)
												setText(value)
											}}
										></Field>
										<Flex justifyContent='space-between'>
											<ErrorMessage className='invalid-tip' name='about' component='span' />
											<Box as='span'></Box>
											<Box
												fontSize={12}
												fontWeight={600}
												color={'rgba(85, 88, 250, 1)'}
												as='span'
												textAlign='end'
											>
												{count}
											</Box>
										</Flex>
									</Flex>

									<Flex justifyContent='space-between'>
										<button onClick={() => router.back()} type='button' id='button-back'>
											{t('back')}
										</button>
										<button onClick={onOpen} type='submit' id='button-next'>
											{t('send')}
										</button>
									</Flex>
								</Form>
							</Flex>
						)
					}}
				</Formik>
			</Grid>
			<Modal status={modal} isOpen={isOpen} onClose={onClose} />
		</>
	)
}

export default AboutMe
