'use client'
import { Flex } from '@chakra-ui/react'
import { Field } from 'formik'
import { ChangeEvent, FC } from 'react'
import { useRadios } from './radio-store'

interface RadioListProps {
	setFieldValue: (name: string, value: string) => void
}

const RadioList: FC<RadioListProps> = ({ setFieldValue }) => {
	console.log('render RadioList')
	const { radios, active, setRadio } = useRadios(({ setRadio, active, radios }) => ({
		radios,
		active,
		setRadio,
	}))
	return radios.map(({ id }) => (
		<Flex key={id} gap={'8px'}>
			<Field
				type='radio'
				id={`field-radio-group-option-${id}`}
				name={`radio`}
				value={id}
				checked={active === id}
				onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
					const { value } = target
					setFieldValue('radio', value)
					setRadio(id)
				}}
			/>
			<label htmlFor={`field-radio-group-option-${id}`}>{id}</label>
		</Flex>
	))
}

export default RadioList
