'use client'
import { useProfileData } from './store/profile-store'
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { FC } from 'react'
import * as Yup from 'yup'
import { useRouter } from '../../navigation'
import FolderIcon from '../FolderIcon'
import PhoneMask from '../PhoneMask'
import './profile.scss'

interface IValues {
	phone: string
	email: string
}

const Profile: FC = () => {
	const t = useTranslations('profile')
	const router = useRouter()
	const [phone, email, setData] = useProfileData((state) => [
		state.phone,
		state.email,
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
		setData(values)
		router.push('/create/firstStep')
	}

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
							<Link className='link' href='https://github.com'>
								{t('gitHub')}
							</Link>
						</div>
						<div className='link'>
							<FolderIcon />
							<Link className='link' href='https://cv.hexlet.ru'>
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
				{({ handleChange, values }: FormikProps<IValues>) => {
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
									handleChange={handleChange}
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
