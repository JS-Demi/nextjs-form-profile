'use client'
import { DeleteIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { ErrorMessage, Field } from 'formik'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { useAdvantages } from './advantages-store'

interface AdvantageListProps {
	remove: (index: number) => void
	invalidClass: string
}

const AdvantageList: FC<AdvantageListProps> = ({ remove, invalidClass }) => {
	const t = useTranslations('secondStep')
	const removeAdvantage = useAdvantages(({ removeAdvantage }) => removeAdvantage)
	const advantages = useAdvantages((state) => state.advantages)

	return (
		advantages &&
		advantages.map(({ id }, index) => (
			<>
				<Flex key={id} gap={5}>
					<Field
						type='text'
						placeholder={t('advantagePlaceholder')}
						id={`field-advantages-${id}`}
						name={`advantages.${index}.value`}
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
