'use client'
import { useRouter } from '@/navigation'
import { Flex, Grid } from '@chakra-ui/react'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { FC, useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import * as Yup from 'yup'
import Stepper from '../progressLine/Stepper'
import { type ISecondStep, useCommonStore } from '../store/all-data-store'
import styles from './SecondaryDataForm.module.scss'
import AdvantageList from './components/advantages/AdvantageList'
import { nextId, useAdvantages } from './components/advantages/advantages-store'
import CheckboxList from './components/checkboxes/CheckboxList'
import { useCheckboxes } from './components/checkboxes/checkbox-store'
import RadioList from './components/radio/RadioList'
import { useRadios } from './components/radio/radio-store'

const SecondaryDataForm: FC = () => {
	const t = useTranslations('secondStep')
	const router = useRouter()

	const [count, setCount] = useState(0)

	useEffect(() => {
		scroll.scrollToBottom({ containerId: 'wrapper', duration: 0 })
	}, [count])

	const setSecondStep = useCommonStore(({ setSecondStep }) => setSecondStep)

	const { advantages, addAdvantage } = useAdvantages(({ advantages, addAdvantage }) => ({
		advantages,
		addAdvantage,
	}))

	const validationSchema = Yup.object().shape({
		advantages: Yup.array().of(
			Yup.object().shape({
				value: Yup.string().matches(/^[a-zA-Z]+$/, t('errors.type')),
			})
		),
	})

	const initialState: ISecondStep = {
		advantages,
		radio: useRadios(({ active }) => active),
		checked: useCheckboxes(({ checked }) => checked),
	}

	const handleSubmit = (values: ISecondStep) => {
		setSecondStep(values)
		router.push('/create/thirdStep')
	}

	return (
		<Grid
			id='wrapper'
			marginTop='24px'
			templateRows='20% 1fr'
			alignItems={'center'}
			justifyContent='center'
			w={900}
			bg={'white'}
			borderRadius={24}
			overflow='auto'
		>
			<Stepper progress={50} />
			<Formik
				onSubmit={handleSubmit}
				initialValues={initialState}
				validationSchema={validationSchema}
			>
				{({ setFieldValue }) => (
					<div className={styles.interface}>
						<Form className={styles.form}>
							<div className={styles.advantages}>
								<label htmlFor='advantages'>Advantages</label>
								{!advantages && <div className='invalid'>{t('errors.min')}</div>}
								<FieldArray name='advantages'>
									{({ remove, push }) => (
										<>
											<AdvantageList
												setFieldValue={setFieldValue}
												remove={remove}
												invalidClass={styles.invalid}
											/>
											<button
												type='button'
												onClick={() => {
													push({ id: nextId(), value: '' })
													addAdvantage()
													setCount(count + 1)
												}}
												className={styles.create}
											>
												+
											</button>
										</>
									)}
								</FieldArray>
							</div>
							<div>
								<label htmlFor='checkbox-group'>{t('checkbox')}</label>
								<CheckboxList />
							</div>
							<div>
								<label htmlFor='radio-group'>{t('radio')}</label>
								<RadioList setFieldValue={setFieldValue} />
							</div>

							<Flex margin={'30px 0'} justifyContent={'space-between'} w={680}>
								<button
									type='button'
									onClick={() => {
										router.back()
									}}
									id='button-back'
								>
									{t('back')}
								</button>
								<button type='submit' id='button-next'>
									{t('next')}
								</button>
							</Flex>
						</Form>
					</div>
				)}
			</Formik>
		</Grid>
	)
}

export default SecondaryDataForm
