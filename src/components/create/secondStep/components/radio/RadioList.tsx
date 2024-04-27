'use client'
import { Flex } from '@chakra-ui/react'
import { Field } from 'formik'
import { FC } from 'react'

const RadioList: FC = () => {
	return (
		<>
			<Flex gap={'8px'}>
				<Field type='radio' id={`field-radio-group-option-1`} name={`radio`} value='1' />
				<label htmlFor={`field-radio-group-option-1`}>1</label>
			</Flex>
			<Flex gap={'8px'}>
				<Field type='radio' id={`field-radio-group-option-2`} name={`radio`} value='2' />
				<label htmlFor={`field-radio-group-option-2`}>2</label>
			</Flex>
			<Flex gap={'8px'}>
				<Field type='radio' id={`field-radio-group-option-3`} value='3' name={`radio`} />
				<label htmlFor={`field-radio-group-option-3`}>3</label>
			</Flex>
		</>
	)
}

export default RadioList
