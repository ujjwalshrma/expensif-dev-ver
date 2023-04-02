import styles from './SortButton.module.css'
import { useState } from 'react'

import { MONTHS } from '../lib/date'

const SortButton = ({ getCurMonth, initialMonth }) => {
	const [month, setMonth] = useState(initialMonth)

	return (
		<div className={styles.sort__wrapper}>
			<p>Sort By - </p>
			<select
				onChange={(e) => {
					setMonth(e.target.value)
					getCurMonth(e.target.value)
				}}
				value={month}
				name='months'
				id='monts'
			>
				{MONTHS.map((month, i) => {
					return (
						<option key={i} value={month}>
							{month}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default SortButton
