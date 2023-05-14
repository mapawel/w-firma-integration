import { MouseEventHandler, FC } from 'react';

interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: string;
}

const Button: FC<Props> = ({ onClick, children }): JSX.Element => (
    <button onClick={onClick}>{children}</button>
);
export default Button;
