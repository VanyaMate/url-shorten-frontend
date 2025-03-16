import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './CreateUrlForm.module.css';
import { useForm } from 'react-hook-form';
import { DomainUrlCreateData } from '@vanyamate/url-shorten';
import { Input } from '../../../shared/inputs/Input/Input.tsx';
import { Button } from '../../../shared/buttons/Button/Button.tsx';
import {
    createUrlEffect,
    urlCreatingError,
} from '../../../app/models/url-shorten.model.ts';
import { ButtonStyle } from '../../../shared/buttons/Button/ButtonStyle.ts';
import { Alert } from '../../../shared/notification/Alert/Alert.tsx';
import { useStore } from '../../../app/hook/useStore.ts';
import { AlertStyle } from '../../../shared/notification/Alert/AlertStyle.ts';
import { Label } from '../../../shared/label/Label/Label.tsx';


export type CreateUrlFormProps =
    {}
    & ComponentPropsWithoutRef<'form'>;

export const CreateUrlForm: FC<CreateUrlFormProps> = memo(function CreateUrlForm (props) {
    const { className, ...other } = props;
    const {
              handleSubmit,
              formState,
              register,
              reset,
          }                       = useForm<DomainUrlCreateData>({
        values: {
            originalUrl: '',
            alias      : '',
            expiresAt  : 0,
        },
    });

    const onSubmit = useCallback((data: DomainUrlCreateData) => {
        return createUrlEffect(data).then(() => reset());
    }, [ reset ]);

    const error = useStore(urlCreatingError);

    return (
        <form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            onSubmit={ handleSubmit(onSubmit) }
        >
            {
                error ? <Alert header={ 'Ошибка' }
                               styleType={ AlertStyle.ERROR }>{ error }</Alert>
                      : null
            }
            <Label
                header={ 'До куда создать ссылку' }
            >
                <Input
                    key="originalUrl"
                    type={ 'text' }
                    placeholder={ 'Вставьте ссылку' }
                    { ...register('originalUrl', { required: true }) }
                />
            </Label>
            <Label
                header={ 'Свой алиас (не обязательно)' }
            >
                <Input
                    key="alias"
                    type={ 'text' }
                    placeholder={ 'Введите алиас' }
                    { ...register('alias', { required: false }) }
                />
            </Label>
            <Label
                header={ 'Срок действия ссылки (не обязательно)' }
            >
                <Input
                    key="date"
                    type={ 'date' }
                    placeholder={ 'Срок действия до' }
                    { ...register('expiresAt', {
                        required  : false,
                        setValueAs: (value: Date) => {
                            return +new Date(value);
                        },
                    }) }
                />
            </Label>
            <Button
                key="submit"
                disabled={ !formState.isValid || formState.isSubmitting }
                styleType={ ButtonStyle.PRIMARY }
            >
                { formState.isSubmitting ? 'Создание..' : 'Создать' }
            </Button>
        </form>
    );
});