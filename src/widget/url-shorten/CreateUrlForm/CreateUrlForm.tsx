import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './CreateUrlForm.module.css';
import { useForm } from 'react-hook-form';
import { DomainUrlCreateData } from '@vanyamate/url-shorten';
import { Input } from '../../../shared/inputs/Input/Input.tsx';
import { Button } from '../../../shared/buttons/Button/Button.tsx';
import { createUrlEffect } from '../../../app/models/url-shorten.model.ts';


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

    return (
        <form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <Input
                type={ 'text' }
                placeholder={ 'Вставьте ссылку' }
                { ...register('originalUrl', { required: true }) }
            />
            <Input
                type={ 'text' }
                placeholder={ 'Алиас' }
                { ...register('alias', { required: false }) }
            />
            <Input
                type={ 'date' }
                placeholder={ 'Срок действия до' }
                { ...register('expiresAt', {
                    required  : false,
                    setValueAs: (value: Date) => {
                        return +new Date(value);
                    },
                }) }
            />
            <Button
                disabled={ !formState.isValid || formState.isSubmitting }
            >
                { formState.isSubmitting ? 'Создание..' : 'Создать' }
            </Button>
        </form>
    );
});