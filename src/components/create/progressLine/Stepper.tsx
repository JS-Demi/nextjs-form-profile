import React, { FC } from 'react'
import styles from './Stepper.module.scss'
import cn from 'classnames'
import { Progress } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

interface StepperProps {
	progress: number
}

const Stepper: FC<StepperProps> = ({ progress }) => {
	const firstStep = cn(styles.stepper__item, styles.first, styles.active, {
		[styles.completed]: progress > 1,
	})
	const secondStep = cn(styles.stepper__item, styles.second, {
		[styles.active]: progress > 1,
		[styles.completed]: progress > 50,
	})

	const thirdStep = cn(styles.stepper__item, styles.third, {
		[styles.active]: progress > 50,
	})
	return (
		<div className={styles.stepper_container}>
			<div className={styles.stepper}>
				<div className={firstStep}>
					<div className={styles.dot}>
						{progress > 1 ? (
							<svg
								width='10'
								height='9'
								viewBox='0 0 10 9'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M4.66147 7.87365C4.56698 7.99874 4.41929 8.07227 4.26252 8.07227H3.68243C3.54729 8.07227 3.41791 8.01757 3.32376 7.92063L0.504131 5.01762C0.315687 4.8236 0.315686 4.51491 0.504131 4.32089L0.975725 3.83535C1.1721 3.63317 1.49669 3.63317 1.69306 3.83535L3.49489 5.69046C3.70845 5.91034 4.06776 5.88806 4.25251 5.64349L8.15121 0.482651C8.32099 0.2579 8.64283 0.217688 8.86269 0.393752L9.38636 0.813089C9.59761 0.982258 9.63592 1.28881 9.47278 1.50476L4.66147 7.87365Z'
									fill='white'
								/>
							</svg>
						) : (
							<svg
								width='4'
								height='4'
								viewBox='0 0 4 4'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<circle cx='2.00002' cy='1.9999' r='1.6' fill='white' />
							</svg>
						)}
					</div>
					<span className={styles.step}>1</span>
				</div>
				<div className={secondStep}>
					<div className={styles.dot}>
						{progress > 50 && (
							<svg
								width='10'
								height='9'
								viewBox='0 0 10 9'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M4.66147 7.87365C4.56698 7.99874 4.41929 8.07227 4.26252 8.07227H3.68243C3.54729 8.07227 3.41791 8.01757 3.32376 7.92063L0.504131 5.01762C0.315687 4.8236 0.315686 4.51491 0.504131 4.32089L0.975725 3.83535C1.1721 3.63317 1.49669 3.63317 1.69306 3.83535L3.49489 5.69046C3.70845 5.91034 4.06776 5.88806 4.25251 5.64349L8.15121 0.482651C8.32099 0.2579 8.64283 0.217688 8.86269 0.393752L9.38636 0.813089C9.59761 0.982258 9.63592 1.28881 9.47278 1.50476L4.66147 7.87365Z'
									fill='white'
								/>
							</svg>
						)}
						{progress > 1 && (
							<svg
								width='4'
								height='4'
								viewBox='0 0 4 4'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<circle cx='2.00002' cy='1.9999' r='1.6' fill='white' />
							</svg>
						)}
					</div>
					<span className={styles.step}>2</span>
				</div>
				<div className={thirdStep}>
					<div className={styles.dot}></div>
					<span className={styles.step}>3</span>
				</div>
			</div>
			<div style={{ width: `${progress}%` }} className={styles.progress}></div>
		</div>
	)
}

export default Stepper
