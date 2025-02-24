import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import { doCreatePost, loadAllCategories } from '../services/userServices';
import { getUserDetail } from '../auth';

const AddPost = () => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);

  const [post, setPost] = useState({
    title: '',
    content: '',
    categoryId: 0
  });

  useEffect(() => {
    setUser(getUserDetail());
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fieldChange = (event) => {
    console.log(event.target.value);
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const createPost = (event) => {
    event.preventDefault();
    console.log(post);
    if (post.title.trim() === '') {
      alert("Title is required");
      return;
    }
    if (post.content.trim() === '') {
      alert("Content is required");
      return;
    }
    console.log(user);
    post['userId'] = user.id;
    doCreatePost(post)
      .then((data) => {
        console.log("Post added successfully");
        alert("Post Created");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='wrapper m-5'>
      <Card>
        <CardBody className='container mt-2'>
          <h1>What's your idea?</h1>
          <Form onSubmit={createPost}>
            <div>
              <Label for="title">Post Title</Label>
              <Input type='text' id="title" placeholder='Enter title' name='title' onChange={fieldChange} />
            </div>

            <div className='mt-2'>
              <Label for="content">Post Content</Label>
              <Input type='textarea' style={{ height: '275px' }} id="content" placeholder='Enter content' name='content' onChange={fieldChange} />
            </div>

            <div className='mt-2'>
              <Label for="category">Post Category</Label>
              <Input type='select' id="category" name='categoryId' onChange={fieldChange}>
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option value={category.categoryId} key={category.categoryId}>{category.categoryTitle}</option>
                ))}
              </Input>
            </div>

            <Container className='text-center mt-3'>
              <Button type='submit' color='primary'>Create Post</Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;

