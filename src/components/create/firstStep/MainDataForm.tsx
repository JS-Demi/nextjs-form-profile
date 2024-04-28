'use client'
import { useRouter } from '@/navigation'
import { Button, Flex, Grid, Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik'
import { useTranslations } from 'next-intl'
import { ChangeEvent, FC } from 'react'
import * as Yup from 'yup'
import Stepper from '../progressLine/Stepper'
import styles from './MainDataForm.module.scss'
import { Gender, useFormData, type IFirstFormFields } from './store'
import { useCommonStore } from '../store/all-data-store'

const MainDataForm: FC = () => {
	const t = useTranslations('firstStep')
	const router = useRouter()
	const [nickname, name, surname, sex] = useFormData((state) => [
		state.nickname,
		state.name,
		state.surname,
		state.sex,
	])
	const setFirstStep = useCommonStore(({ setFirstStep }) => setFirstStep)

	const { setNickname, setName, setSurname, setSex } = useFormData(
		({ setNickname, setName, setSurname, setSex }) => ({
			setNickname,
			setName,
			setSurname,
			setSex,
		})
	)

	const ArrowIcon = (
		<Icon viewBox='0 0 12 8'>
			<path
				d='M0.353553 2.05848C0.158291 1.86321 0.158291 1.54663 0.353553 1.35137L1.05683 0.64809C1.25194 0.452978 1.56823 0.452806 1.76355 0.647705L5.64683 4.52252C5.84201 4.71727 6.15799 4.71727 6.35317 4.52252L10.2364 0.647705C10.4318 0.452806 10.7481 0.452979 10.9432 0.64809L11.6464 1.35137C11.8417 1.54663 11.8417 1.86321 11.6464 2.05848L6.35355 7.35137C6.15829 7.54663 5.84171 7.54663 5.64645 7.35137L0.353553 2.05848Z'
				fill='black'
				fillOpacity='0.24'
			/>
		</Icon>
	)

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

	const handleSubmit = (values: IFirstFormFields) => {
		setFirstStep(values)
		router.push('/create/secondStep')
	}
	return (
		<Grid
			marginTop='24px'
			templateRows='20% 1fr'
			alignItems={'center'}
			justifyContent='center'
			w={900}
			bg={'white'}
			borderRadius={24}
		>
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
				{({ setFieldValue, values }: FormikProps<IFirstFormFields>) => {
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
											onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
												const { value } = target
												setFieldValue('nickname', value)
												setNickname(value)
											}}
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
											onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
												const { value } = target
												setFieldValue('name', value)
												setName(value)
											}}
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
											onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
												const { value } = target
												setFieldValue('surname', value)
												setSurname(value)
											}}
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
														setSex(Gender.Male)
													}}
												>
													{Gender.Male}
												</MenuItem>
												<MenuItem
													onClick={() => {
														setFieldValue('sex', Gender.Female)
														setSex(Gender.Female)
													}}
												>
													{Gender.Female}
												</MenuItem>
											</MenuList>
										</Menu>
										<ErrorMessage className='invalid-tip' component='div' name='sex' />
									</div>
								</div>
								<Flex marginBottom={30} justifyContent={'space-between'} w={680}>
									<button onClick={() => router.back()} id='button-back' type='button'>
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
		</Grid>
	)
}

export default MainDataForm
