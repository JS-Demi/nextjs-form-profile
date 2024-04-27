import { Flex } from '@chakra-ui/react'
import { ErrorMessage, Field } from 'formik'
import { FC } from 'react'
import { useCheckboxes } from './checkbox-store'

const CheckboxList: FC = () => {
	const checkboxes = useCheckboxes((state) => state.checkboxes)
	return (
		checkboxes &&
		checkboxes.map(({ id }, index) => (
			<Flex key={id} gap={'8px'}>
				<Field
					type='checkbox'
					id={`field-checkbox-group-option-${id}`}
					name={`checkboxes.${index}.completed`}
				/>
				<label htmlFor={`field-checkbox-group-option-${id}`}>{id}</label>
			</Flex>
		))
	)
}

export default CheckboxList
