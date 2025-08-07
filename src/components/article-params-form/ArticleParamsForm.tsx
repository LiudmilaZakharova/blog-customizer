import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useCloseClickOutsideForm } from 'src/components/article-params-form/hooks/useCloseClickOutsideForm'
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ParamsFormProps = {
	applySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({applySettings}: ParamsFormProps) => {

const [isOpen, setIsOpen] = useState(false);
const [formSettings, setFormSettings] = useState<ArticleStateType>(defaultArticleState);
//получаем доступ к форме для слушателя
const refParamsForm = useRef<HTMLFormElement>(null);


//закрыть форму
function toggleParamsForm() {
    setIsOpen(!isOpen);
}

const {fontFamilyOption,
	fontSizeOption,
	fontColor,
	backgroundColor,
	contentWidth
} = formSettings;


//изменяем настройки
const updateFormSettings = (newSettings: Partial<ArticleStateType>) => {
	setFormSettings((prev) => ({...prev, ...newSettings}));
}


//закрываем форму кликом вне
useCloseClickOutsideForm({
	isOpen: isOpen,
	refForm: refParamsForm,
	onClose: () => setIsOpen(false)
})

//сброс полей формы к исходным значениям
const resetParamsFormSettings = () => {
	setFormSettings(defaultArticleState);
  applySettings(defaultArticleState);
}

//применяем значения формы
const handleSubmitSettings = (evt: React.FormEvent) => {
	evt.preventDefault();
	applySettings(formSettings);
}

	return (
		<>
		<ArrowButton isOpen={isOpen} onClick={toggleParamsForm} />
			{(<aside className={clsx(styles.container, {
				[styles.container_open]: isOpen
			})}>
				<form className={styles.form} onSubmit={handleSubmitSettings} ref={refParamsForm} >
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
					title='шрифт'
					selected={fontFamilyOption}
					options={fontFamilyOptions}
					onChange={(newValue: OptionType) =>
    					updateFormSettings({ fontFamilyOption: newValue })}/>

					<RadioGroup 
					name={'radioGroup'}
					options={fontSizeOptions}
					selected={fontSizeOption}
					onChange={(newValue: OptionType) =>
    					updateFormSettings({ fontSizeOption: newValue })}
					title='рАЗМЕР шрифта'/>

					<Select
					title='Цвет шрифта'
					selected={fontColor}
					options={fontColors}
					onChange={(newValue: OptionType) => 
  						updateFormSettings({ fontColor: newValue })}/>

					<Separator />

					<Select
					title='Цвет фона'
					selected={backgroundColor}
					options={backgroundColors}
					onChange={(newValue: OptionType) => 
					    updateFormSettings({ backgroundColor: newValue })}/>

					<Select
					title='Ширина контента'
					selected={contentWidth}
					options={contentWidthArr}
					onChange={(newValue: OptionType) => 
  updateFormSettings({ contentWidth: newValue })}/>

					<div className={styles.bottomContainer}>

						<Button title='Сбросить' htmlType='reset' type='clear' onClick={resetParamsFormSettings}/>
						<Button title='Применить' htmlType='submit' type='apply'/>

					</div>
				</form>
			</aside>
			)}
		</>
	);
};
