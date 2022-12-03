import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import * as WebBrowser from "expo-web-browser";

export default function Article(props) {
	function goWebsite() {
		WebBrowser.openBrowserAsync(props.link);
	}

	return (
		<View style={styles.outerContainer}>
			<Pressable style={({ pressed }) => [{ backgroundColor: pressed ? "#E5E5E5" : "white" }, styles.innerContainer]} onPress={goWebsite}>
				<Text style={styles.title}>{props.title}</Text>
				{props.image ? <Image source={{ uri: props.image }} style={styles.image} /> : null}
				<Text style={styles.description}>{props.description}</Text>
				<Text style={styles.author}>{props.author}</Text>
				<Text style={styles.publisher}>{props.publisher}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	outerContainer: {
		marginTop: 40,
	},
	innerContainer: {
		marginTop: 4,
		marginBottom: 4,
		paddingVertical: 10,
		paddingHorizontal: 16,
		width: "85%",
		alignSelf: "center",
		borderRadius: 10,
		elevation: 4,
		shadowColor: "#000",
		shadowOpacity: 0.6,
		shadowOffset: {
			height: 2,
			width: 2,
		},
	},
	title: {
		marginTop: 8,
		fontWeight: "700",
		fontSize: 18,
		marginBottom: 4,
	},
	image: {
		height: 150,
		width: "100%",
	},
	description: {
		marginVertical: 8,
		fontSize: 16,
	},
	author: {
		fontWeight: "700",
	},
	publisher: {
		color: "#938F8F",
		fontWeight: "700",
		fontSize: 18,
	},
});
