import { myAxios, privateAxios } from "./helper";

// User Signup
export const signup = (user) => {
  return myAxios
    .post("/api/v1/auth/register", user)
    .then((response) => response.data);
};

// User Login
export const loginUser = (loginDetail) => {
  return myAxios
    .post("/api/v1/auth/login", loginDetail)
    .then((response) => response.data);
};

// Load All Categories
export const loadAllCategories = () => {
  return myAxios
    .get("/api/v1/categories/")
    .then((response) => response.data);
};

// Create a Post
export const doCreatePost = (addPost) => {
  return privateAxios
    .post(`/api/v1/user/${addPost.userId}/category/${addPost.categoryId}/posts`, addPost)
    .then((response) => response.data);
};

// Get All Posts with Pagination
export const getAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(`/api/v1/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((response) => response.data);
};

// Load Post by ID
export const loadPost = (postId) => {
  return myAxios
    .get(`/api/v1/posts/${postId}`)
    .then((response) => response.data);
};

// Create Comment on a Post
export const createComment = (content, postId) => {
  return privateAxios
    .post(`/api/v1/posts/${postId}/comments`, content)
    .then((response) => response.data);
};

// Load Posts by Category
export const loadPostCategoryWise = (categoryId) => {
  return myAxios
    .get(`/api/v1/category/${categoryId}/posts`)
    .then((response) => response.data);
};

