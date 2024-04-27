'use client'
import { useRouter } from '@/navigation'
import { Flex } from '@chakra-ui/react'
import { ErrorMessage, FieldArray, Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import * as Yup from 'yup'
import Stepper from '../progressLine/Stepper'
import styles from './SecondaryDataForm.module.scss'
import AdvantageList from './components/advantages/AdvantageList'
import { Advantage, nextId, useAdvantages } from './components/advantages/advantages-store'
import CheckboxList from './components/checkboxes/CheckboxList'
import { Checkboxes, useCheckboxes, type keys } from './components/checkboxes/checkbox-store'
import RadioList from './components/radio/RadioList'
import { useRadios } from './components/radio/radio-store'

interface IValues {
	advantages: Advantage[]
	checkboxes: Checkboxes[]
	radio: keys | null
}

const SecondaryDataForm: FC = () => {
	const t = useTranslations('secondStep')
	const router = useRouter()
	const { advantages, addAdvantage, setAdvantages } = useAdvantages(
		({ advantages, addAdvantage, setAdvantages }) => ({
			advantages,
			addAdvantage,
			setAdvantages,
		})
	)
	const { active, setRadio } = useRadios(({ active, setRadio }) => ({ active, setRadio }))
	const { checkboxes, setCheckboxes } = useCheckboxes(({ checkboxes, setCheckboxes }) => ({
		checkboxes,
		setCheckboxes,
	}))

	const validationSchema = Yup.object().shape({
		advantages: Yup.array().of(
			Yup.object().shape({
				value: Yup.string().matches(/^[а-яёА-ЯË]+$/, t('errors.type')),
			})
		),
	})

	const initialState: IValues = {
		advantages,
		radio: active,
		checkboxes,
	}
	const handleBack = ({ advantages, radio, checkboxes }: IValues) => {
		setAdvantages(advantages)
		setRadio(radio)
		setCheckboxes(checkboxes)
		router.push('/create/firstStep')
	}
	const handleSubmit = ({ advantages, radio, checkboxes }: IValues) => {
		setAdvantages(advantages)
		setRadio(radio)
		setCheckboxes(checkboxes)
		router.push('/create/thirdStep')
	}

	return (
		<>
			<Stepper progress={50} />
			<Formik
				onSubmit={handleSubmit}
				initialValues={initialState}
				validationSchema={validationSchema}
			>
				{({ values }) => (
					<div className={styles.interface}>
						<Form className={styles.form}>
							<div className={styles.advantages}>
								<label htmlFor='advantages'>Advantages</label>
								{!advantages && <div className='invalid'>{t('errors.min')}</div>}
								<FieldArray name='advantages'>
									{({ remove, push }) => (
										<>
											<AdvantageList remove={remove} invalidClass={styles.invalid} />
											<button
												type='button'
												onClick={() => {
													push({ id: nextId(), value: '' })
													addAdvantage()
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
								<label htmlFor='checkbox-group'>Checkbox group</label>
								<CheckboxList />
							</div>
							<div>
								<label htmlFor='radio-group'>Radio group</label>
								<RadioList />
							</div>

							<Flex margin={'30px 0'} justifyContent={'space-between'} w={680}>
								<button
									type='button'
									onClick={() => {
										handleBack(values)
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
		</>
	)
}

export default SecondaryDataForm
