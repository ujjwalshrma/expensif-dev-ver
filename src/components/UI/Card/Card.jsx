import styles from './Card.module.css'

const Card = ({ children, color, flex, className }) => {
    const cardClass = `${styles.card} ${color ? styles[color] : styles.b} ${styles[flex]}`

    return (
        <div className={`${cardClass} ${className}`}>
            {children}
        </div>
    )
}

export default Card
