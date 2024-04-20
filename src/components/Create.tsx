'use client'
import { Gender, useFormData, type IValues } from '@/stores/first-form-store'
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import * as Yup from 'yup'

const Create: FC = () => {
	const t = useTranslations('data')
	const [nickname, name, surname, sex, setData] = useFormData((state) => [
		state.nickname,
		state.name,
		state.surname,
		state.sex,
		state.setData,
	])

	const validation = Yup.object().shape({
		phone: Yup.string()
			.required(t('errors.required'))
			.min(18, t('errors.phone'))
			.max(18, t('errors.phone')),
		email: Yup.string().required(t('errors.required')).email(t('errors.email')),
	})

	const handleSubmit = (values: IValues) => {
		console.log(values)
	}
	return (
		<div className='wrapper'>
			<Formik
				initialValues={{
					nickname,
					name,
					surname,
					sex,
				}}
				onSubmit={handleSubmit}
				validationSchema={validation}
				// validateOnBlur={false}
				validateOnChange={false}
			>
				{({ values }: FormikProps<IValues>) => {
					return (
						<Form className='form'>
							<div className='form-floating'>
								<label htmlFor='phone'>{t('nickname')}</label>
								<Field
									className='form-input'
									name='nickname'
									type='text'
									placeholder={t('nickname-placeholder')}
								></Field>
								<ErrorMessage className='invalid-tip' component='div' name='phone' />
							</div>
							<div className='form-floating'>
								<label htmlFor='email'>{t('name')}</label>
								<Field
									className='form-input'
									name='name'
									type='text'
									placeholder={t('name-placeholder')}
								></Field>
								<ErrorMessage className='invalid-tip' component='div' name='email' />
							</div>
							<div className='form-floating'>
								<label htmlFor='email'>{t('surname')}</label>
								<Field
									className='form-input'
									name='surname'
									type='text'
									placeholder={t('surname-placeholder')}
								></Field>
								<ErrorMessage className='invalid-tip' component='div' name='email' />
							</div>
							<div className='form-floating'>
								<label htmlFor='email'>{t('sex')}</label>
								<Field className='form-input' as='select' name='sex'>
									<option value='' disabled selected hidden>
										{t('sex-placeholder')}
									</option>
									<option selected={false} value={Gender.Male}>
										{Gender.Male}
									</option>
									<option value={Gender.Female}>{Gender.Female}</option>
								</Field>
								<ErrorMessage className='invalid-tip' component='div' name='email' />
							</div>
							<button id='button-start' type='submit'>
								{t('back')}
							</button>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default Create
