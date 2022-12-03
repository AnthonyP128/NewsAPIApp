import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import Article from "../components/Article";
import { API_KEY } from "@env";
import axios from "axios";

export default function Home() {
	const [articles, setArticles] = useState([]);

	async function getArticle() {
		try {
			const response = await axios(`https://newsapi.org/v2/everything?q=keyword&apiKey=${API_KEY}`);
			setArticles(response.data.articles);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getArticle();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={articles}
				renderItem={({ item }) => (
					<Article
						link={item.url}
						image={item.urlToImage}
						title={item.title}
						description={item.description}
						author={item.author}
						publisher={item.source.name}
					/>
				)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
	},
});
