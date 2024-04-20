'use client'
import { Field, Form, Formik } from 'formik'
import Link from 'next/link'
import { FC, useRef } from 'react'
import * as Yup from 'yup'
import FolderIcon from './FolderIcon'
import PhoneMask from './PhoneMask'

interface IValues {
	phone: string
	email: string
}

const validation = Yup.object().shape({
	phone: Yup.number().required().min(10).max(10),
	email: Yup.string().required().email(),
})

const handleSubmit = ({ phone, email }: IValues) => {
	console.log(phone, email)
}

const Profile: FC = () => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	return (
		<div className='wrapper'>
			<div className='wrapper__info'>
				<div className='wrapper__info__avatar'>
					<span className='wrapper__info__avatar__logo'>АИ</span>
				</div>
				<div className='wrapper__info__about'>
					<div className='wrapper__info__about__name'>Дмитрий Иванов</div>
					<div className='wrapper__info__about__links'>
						<div className='link'>
							<FolderIcon />
							<Link className='link' href='https://t.me/Miracle_JS'>
								Telegram
							</Link>
						</div>
						<div className='link'>
							<FolderIcon />
							<Link className='link' href='https://github.com'>
								GitHub
							</Link>
						</div>
						<div className='link'>
							<FolderIcon />
							<Link className='link' href='https://cv.hexlet.ru'>
								Resume
							</Link>
						</div>
					</div>
				</div>
			</div>
			<hr className='divider' />
			<Formik
				initialValues={{
					phone: '',
					email: '',
				}}
				onSubmit={handleSubmit}
				validationSchema={validation}
			>
				{({ handleChange, values }) => {
					return (
						<Form>
							<div className='form-floating'>
								<label htmlFor='phone'></label>
								<PhoneMask
									name='phone'
									type='text'
									placeholder='+7 (000) 000-00-00'
									value={values.phone}
									handleChange={handleChange}
								></PhoneMask>
							</div>
							<div className='form-floating'>
								<label htmlFor='email'></label>
								<Field name='email' type='text' placeholder='test'></Field>
							</div>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default Profile
