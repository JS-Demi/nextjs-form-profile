import { useField } from 'formik'
import { FC, ForwardedRef, forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

interface PhoneMaskProps {
	handleChange: (value: string) => void
	name: 'phone'
	type: string
	placeholder: string
	value: string
	className?: string
}

export type Ref = ForwardedRef<HTMLInputElement>

const PhoneMask: FC<PhoneMaskProps> = forwardRef((props: PhoneMaskProps, ref: Ref) => {
	const { handleChange, ...rest } = props
	const [field] = useField(props)
	return (
		<IMaskInput
			{...field}
			{...rest}
			mask='+7 (000) 000-00-00'
			onAccept={handleChange}
			inputRef={ref}
		></IMaskInput>
	)
})

export default PhoneMask
