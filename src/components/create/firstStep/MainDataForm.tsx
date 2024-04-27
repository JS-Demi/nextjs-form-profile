'use client'
import { useRouter } from '@/navigation'
import { Gender, useFormData, type IValues } from './store'
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik'
import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'
import * as Yup from 'yup'
import styles from './MainDataForm.module.scss'
import Stepper from '../progressLine/Stepper'
import {
	Button,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	createIcon,
} from '@chakra-ui/react'

const MainDataForm: FC = () => {
	const t = useTranslations('firstStep')
	const router = useRouter()
	const [nickname, name, surname, sex, setData] = useFormData((state) => [
		state.nickname,
		state.name,
		state.surname,
		state.sex,
		state.setData,
	])

	const ArrowIcon = (
		<Icon viewBox='0 0 12 8'>
			<path
				d='M0.353553 2.05848C0.158291 1.86321 0.158291 1.54663 0.353553 1.35137L1.05683 0.64809C1.25194 0.452978 1.56823 0.452806 1.76355 0.647705L5.64683 4.52252C5.84201 4.71727 6.15799 4.71727 6.35317 4.52252L10.2364 0.647705C10.4318 0.452806 10.7481 0.452979 10.9432 0.64809L11.6464 1.35137C11.8417 1.54663 11.8417 1.86321 11.6464 2.05848L6.35355 7.35137C6.15829 7.54663 5.84171 7.54663 5.64645 7.35137L0.353553 2.05848Z'
				fill='black'
				fillOpacity='0.24'
			/>
		</Icon>
	)

	const [activeDropdown, setActiveDropdown] = useState(false)

	const validation = Yup.object().shape({
		nickname: Yup.string()
			.required(t('errors.required'))
			.max(30, t('errors.long'))
			.matches(/^[a-zA-Z0-9]+$/, t('errors.nickname')),
		name: Yup.string()
			.required(t('errors.required'))
			.max(50, t('errors.long'))
			.matches(/^[a-zA-Z]+$/, t('errors.name')),
		surname: Yup.string()
			.required(t('errors.required'))
			.max(50, t('errors.long'))
			.matches(/^[a-zA-Z]+$/, t('errors.name')),
		sex: Yup.string().required(t('errors.required')),
	})

	const handleBack = () => {
		router.push('/')
	}

	const handleSubmit = (values: IValues) => {
		setData(values)
		router.push('/create/secondStep')
	}
	return (
		<>
			<Stepper progress={1} />
			<Formik
				initialValues={{
					nickname,
					name,
					surname,
					sex,
				}}
				onSubmit={handleSubmit}
				validationSchema={validation}
				validateOnChange={false}
			>
				{({ setFieldValue, values }: FormikProps<IValues>) => {
					return (
						<div className={styles.interface}>
							<Form className={styles.form}>
								<div className={styles.fields}>
									<div className={styles.form_floating}>
										<label htmlFor='nickname'>{t('nickname')}</label>
										<Field
											id='field-nickname'
											className={styles.form_input}
											name='nickname'
											type='text'
											placeholder={t('nickname-placeholder')}
										></Field>
										<ErrorMessage className='invalid-tip' component='div' name='nickname' />
									</div>
									<div className={styles.form_floating}>
										<label htmlFor='name'>{t('name')}</label>
										<Field
											id='field-name'
											className={styles.form_input}
											name='name'
											type='text'
											placeholder={t('name-placeholder')}
										></Field>
										<ErrorMessage className='invalid-tip' component='div' name='name' />
									</div>
									<div className={styles.form_floating}>
										<label htmlFor='surname'>{t('surname')}</label>
										<Field
											id='field-surname'
											className={styles.form_input}
											name='surname'
											type='text'
											placeholder={t('surname-placeholder')}
										></Field>
										<ErrorMessage className='invalid-tip' component='div' name='surname' />
									</div>
									<div className={styles.form_floating}>
										<label htmlFor='sex'>{t('sex')}</label>
										<Menu>
											<MenuButton
												name='sex'
												as={Button}
												bg={'white'}
												border={'1px solid'}
												textAlign={'left'}
												fontWeight={400}
												color={`${values.sex ? 'rgb(51, 51, 51)' : 'rgba(0, 0, 0, 0.16)'}`}
												borderColor={'rgba(0, 0, 0, 0.16)'}
												w={300}
												h={'44px'}
												rightIcon={ArrowIcon}
											>
												{values.sex ? values.sex : t('sex-placeholder')}
											</MenuButton>
											<MenuList w={300}>
												<MenuItem
													onClick={() => {
														setFieldValue('sex', Gender.Male)
													}}
												>
													{Gender.Male}
												</MenuItem>
												<MenuItem
													onClick={() => {
														setFieldValue('sex', Gender.Female)
													}}
												>
													{Gender.Female}
												</MenuItem>
											</MenuList>
										</Menu>
										{/* <Field
											onClick={() => setActiveDropdown(!activeDropdown)}
											id={styles.field_sex}
											className={`${styles.form_input} ${values.sex ? styles.choosen : ''}`}
											as='button'
											name='sex'
											type='button'
										>
											{values.sex ? values.sex : t('sex-placeholder')}
											<svg
												width='12'
												height='8'
												viewBox='0 0 12 8'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M0.353553 2.05848C0.158291 1.86321 0.158291 1.54663 0.353553 1.35137L1.05683 0.64809C1.25194 0.452978 1.56823 0.452806 1.76355 0.647705L5.64683 4.52252C5.84201 4.71727 6.15799 4.71727 6.35317 4.52252L10.2364 0.647705C10.4318 0.452806 10.7481 0.452979 10.9432 0.64809L11.6464 1.35137C11.8417 1.54663 11.8417 1.86321 11.6464 2.05848L6.35355 7.35137C6.15829 7.54663 5.84171 7.54663 5.64645 7.35137L0.353553 2.05848Z'
													fill='black'
													fillOpacity='0.24'
												/>
											</svg>
										</Field>
										{activeDropdown && (
											<div className={styles.select_wrapper}>
												<div>
													<button
														onClick={() => {
															setFieldValue('sex', Gender.Male)
															setActiveDropdown(false)
														}}
														id='field-sex-option-man'
													>
														{Gender.Male}
													</button>
													<button
														onClick={() => {
															setFieldValue('sex', Gender.Female)
															setActiveDropdown(false)
														}}
														id='field-sex-option-woman'
													>
														{Gender.Female}
													</button>
												</div>
											</div>
										)} */}
										<ErrorMessage className='invalid-tip' component='div' name='sex' />
									</div>
								</div>
								<Flex justifyContent={'space-between'} w={680}>
									<button onClick={handleBack} id='button-back' type='button'>
										{t('back')}
									</button>
									<button id='button-next' type='submit'>
										{t('next')}
									</button>
								</Flex>
							</Form>
						</div>
					)
				}}
			</Formik>
		</>
	)
}

export default MainDataForm
