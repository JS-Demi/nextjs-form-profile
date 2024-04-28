import Failed from './Failed'
import Success from './Success'

export default function callModal(status: 'success' | 'failed') {
	const modals = {
		success: Success,
		failed: Failed,
	}
	return modals[status]
}
