import { Draw } from "./js/draw.js"
import { DrawBoard } from "./js/drawBoard.js"

const canvas = document.getElementById('canvaBoard');

!function () {
	Draw(canvas)
}()



// async function getAllPosts(cb) {
// 	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
// 	if (!response.ok) throw new Error('Network respons is not ok');
// 	const data = await response.json();
// 	if (!data) return;
// 	return cb(data[0].id);
// };

// async function getPostDetails(postId) {
// 	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
// 	if (!response.ok) throw new Error('Network respons is not ok');
// 	const data = await response.json();
// 	return data;
// };

// const postDetails = await getAllPosts(getPostDetails)

console.log(postDetails);


