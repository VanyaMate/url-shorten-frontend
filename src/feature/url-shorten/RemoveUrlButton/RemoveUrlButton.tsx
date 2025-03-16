import { FC, memo, useCallback, useState } from 'react';
import { Button, ButtonProps } from '../../../shared/buttons/Button/Button.tsx';
import { ButtonStyle } from '../../../shared/buttons/Button/ButtonStyle.ts';
import { removeUrlEffect } from '../../../app/models/url-shorten.model.ts';


export type RemoveUrlButtonProps =
    {
        alias: string;
    }
    & ButtonProps;

export const RemoveUrlButton: FC<RemoveUrlButtonProps> = memo(function RemoveUrlButton (props) {
    const { alias, ...other }     = props;
    const [ process, setProcess ] = useState<boolean>(false);
    const clickHandler            = useCallback(() => {
        setProcess(true);
        removeUrlEffect(alias).finally(() => setProcess(false));
    }, [ alias ]);

    return (
        <Button
            { ...other }
            styleType={ ButtonStyle.DANGER }
            onClick={ clickHandler }
        >
            {
                process ? 'Удаление..' : 'Удалить'
            }
        </Button>
    );
});