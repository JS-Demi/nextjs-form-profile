'use client'
import { DeleteIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { ErrorMessage, Field, FormikFormProps, FormikValues } from 'formik'
import { useTranslations } from 'next-intl'
import { ChangeEvent, FC } from 'react'
import { useAdvantages } from './advantages-store'
import { useShallow } from 'zustand/react/shallow'

interface AdvantageListProps {
	remove: (index: number) => void
	invalidClass: string
	setFieldValue: (name: string, value: string) => void
}

const AdvantageList: FC<AdvantageListProps> = ({ remove, invalidClass, setFieldValue }) => {
	const t = useTranslations('secondStep')
	const removeAdvantage = useAdvantages(({ removeAdvantage }) => removeAdvantage)
	const { advantages, setAdvantage } = useAdvantages(
		useShallow((state) => ({
			advantages: state.advantages,
			setAdvantage: state.setAdvantage,
		}))
	)
	console.log('render advantages')
	return (
		advantages &&
		advantages.map(({ id, value }, index) => (
			<>
				<Flex key={id} gap={5}>
					<Field
						type='text'
						placeholder={t('advantagePlaceholder')}
						id={`field-advantages-${id}`}
						name={`advantages.${index}.value`}
						value={value}
						onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
							const { value } = target
							setFieldValue(`advantages.${index}.value`, value)
							setAdvantage(value, id)
						}}
					/>
					<button
						id={`button-remove-${id}`}
						type='button'
						onClick={() => {
							remove(index)
							removeAdvantage(id)
						}}
					>
						<DeleteIcon />
					</button>
				</Flex>
				<ErrorMessage name={`advantages.${index}.value`} component='div' className={invalidClass} />
			</>
		))
	)
}

export default AdvantageList
