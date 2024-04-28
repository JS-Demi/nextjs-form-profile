import { Flex } from '@chakra-ui/react'
import { Field } from 'formik'
import { FC } from 'react'
import { useCheckboxes } from './checkbox-store'

const CheckboxList: FC = () => {
	const { checkboxes, check, checked } = useCheckboxes(({ checkboxes, check, checked }) => ({
		checkboxes,
		check,
		checked,
	}))
	return checkboxes.map(({ id }) => (
		<Flex key={id} gap={'8px'}>
			<Field
				type='checkbox'
				id={`field-checkbox-group-option-${id}`}
				name={`checked`}
				checked={checked.includes(id)}
				value={id}
				onClick={() => check(id)}
			/>
			<label htmlFor={`field-checkbox-group-option-${id}`}>{id}</label>
		</Flex>
	))
}

export default CheckboxList
