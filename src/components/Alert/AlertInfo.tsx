import { AlertInfoStyled } from "./AlertInfoStyled"

interface AlertProps {
    children?: React.ReactNode
}

const AlertInfo: React.FC<AlertProps> = ({ children }) => {

    return (
        <AlertInfoStyled>
            {children}
        </AlertInfoStyled>
    )
}

export default AlertInfo