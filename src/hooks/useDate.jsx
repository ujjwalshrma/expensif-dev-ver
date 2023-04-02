import { MONTHS } from '../components/lib/date'

const useDate = () => {
	const date = new Date()

	const curDate = `${date.getDate()} ${
		MONTHS[date.getMonth()]
	} ${date.getFullYear()}`

	return curDate
}

export default useDate
