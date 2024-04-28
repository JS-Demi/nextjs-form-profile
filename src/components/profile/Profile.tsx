'use client'
import { useProfileData } from './store/profile-store'
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ChangeEvent, ChangeEventHandler, FC } from 'react'
import * as Yup from 'yup'
import { useRouter } from '../../navigation'
import FolderIcon from '../FolderIcon'
import PhoneMask from '../PhoneMask'
import './profile.scss'
import { useCommonStore } from '../create/store/all-data-store'

interface IValues {
	phone: string
	email: string
}

const Profile: FC = () => {
	const t = useTranslations('profile')
	const router = useRouter()
	const [phone, email, setPhone, setEmail] = useProfileData((state) => [
		state.phone,
		state.email,
		state.setPhone,
		state.setEmail,
	])

	const setProfile = useCommonStore(({ setProfile }) => setProfile)

	const validation = Yup.object().shape({
		phone: Yup.string()
			.required(t('errors.required'))
			.min(18, t('errors.phone'))
			.max(18, t('errors.phone')),
		email: Yup.string().required(t('errors.required')).email(t('errors.email')),
	})

	const handleSubmit = (values: IValues) => {
		setProfile(values)
		router.push('/create/firstStep')
	}
	console.log('render')
	return (
		<>
			<div className='wrapper__info'>
				<div className='wrapper__info__avatar'>
					<span className='wrapper__info__avatar__logo'>{t('avatar')}</span>
				</div>
				<div className='wrapper__info__about'>
					<div className='wrapper__info__about__name'>{t('name')}</div>
					<div className='wrapper__info__about__links'>
						<div className='link'>
							<FolderIcon />
							<Link className='link' href='https://t.me/Miracle_JS'>
								{t('telegram')}
							</Link>
						</div>
						<div className='link'>
							<FolderIcon />
							<Link className='link' href='https://github.com/JS-Demi/JS-Demi'>
								{t('gitHub')}
							</Link>
						</div>
						<div className='link'>
							<FolderIcon />
							<Link
								className='link'
								href='https://hh.ru/resume/d18ccc4fff0bdb3f550039ed1f304c52537837'
							>
								{t('resume')}
							</Link>
						</div>
					</div>
				</div>
			</div>
			<hr className='divider' />
			<Formik
				initialValues={{
					phone,
					email,
				}}
				onSubmit={handleSubmit}
				validationSchema={validation}
				validateOnBlur={false}
				validateOnChange={false}
			>
				{({ handleChange, values, setFieldValue }: FormikProps<IValues>) => {
					return (
						<Form className='form'>
							<div className='form-floating'>
								<label htmlFor='phone'>{t('phoneLabel')}</label>
								<PhoneMask
									name='phone'
									type='text'
									className='form-input'
									placeholder={t('phonePlaceholder')}
									value={values.phone}
									handleChange={(value: string) => {
										setFieldValue('phone', value)
										setPhone(value)
									}}
								></PhoneMask>
								<ErrorMessage className='invalid-tip' component='div' name='phone' />
							</div>
							<div className='form-floating'>
								<label htmlFor='email'>{t('emailLabel')}</label>
								<Field
									className='form-input'
									name='email'
									type='text'
									placeholder={t('emailPlaceholder')}
									onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
										const { value } = target
										setFieldValue('email', value)
										setEmail(value)
									}}
								></Field>
								<ErrorMessage className='invalid-tip' component='div' name='email' />
							</div>
							<button id='button-start' type='submit'>
								{t('start')}
							</button>
						</Form>
					)
				}}
			</Formik>
		</>
	)
}

export default Profile
