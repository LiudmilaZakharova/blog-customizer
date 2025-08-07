import { CSSProperties, useState } from "react";
import { ArticleStateType, defaultArticleState } from "src/constants/articleProps";
import styles from '../styles/index.module.scss';
import { ArticleParamsForm } from "src/components/article-params-form";
import { Article } from "src/components/article";

export const App = () => {
const [settings, setSettings] = 
useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--bg-color': settings.backgroundColor.value,
					'--container-width': settings.contentWidth.value,
				} as CSSProperties
			}>
			<ArticleParamsForm applySettings={(newSettings: ArticleStateType) =>
	setSettings(newSettings)}/>
			<Article />
		</main>
	);
};