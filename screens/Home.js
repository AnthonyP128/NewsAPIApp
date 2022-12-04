import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Pressable, Text } from "react-native";
import Article from "../components/Article";
import { SearchBar, ButtonGroup } from "@rneui/themed";
import { API_KEY } from "@env";
import axios from "axios";

export default function Home() {
	const [articles, setArticles] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);

	// Gets the initial articles on app launch
	async function getArticle() {
		try {
			const response = await axios(`https://newsapi.org/v2/everything?q=keyword&apiKey=${API_KEY}`);
			setArticles(response.data.articles);
		} catch (error) {
			console.log(error);
		}
	}

	// Gets the articles on user search
	async function searchArticle() {
		if (selectedIndex === 0) {
			try {
				const response = await axios(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
				setArticles(response.data.articles);
			} catch (error) {
				console.log(error);
			}
		} else if (selectedIndex === 1) {
			try {
				const response = await axios(`https://newsapi.org/v2/everything?sources=${search}&apiKey=${API_KEY}`);
				setArticles(response.data.articles);
			} catch (error) {
				console.log(error);
			}
		}
	}

	useEffect(() => {
		getArticle();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.searchContainer}>
				<SearchBar placeholder="Search Article..." onChangeText={(search) => setSearch(search)} value={search} platform="ios" />
				<ButtonGroup
					buttons={["General", "By Source"]}
					selectedIndex={selectedIndex}
					onPress={(value) => {
						setSelectedIndex(value);
					}}
				/>
				<Pressable
					style={({ pressed }) => [{ backgroundColor: pressed ? "#0b71bd" : "#1C97F3" }, styles.button]}
					title="Search"
					onPress={() => searchArticle()}
				>
					<Text style={styles.buttonText}>Search</Text>
				</Pressable>
			</View>
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
	searchContainer: {
		paddingHorizontal: 24,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
	button: {
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		borderRadius: 4,
		elevation: 3,
		width: "95%",
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
	container: {
		marginTop: 40,
		backgroundColor: "#fff",
	},
});
