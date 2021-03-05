export default [
  {
    id: 0,
    pillId: 2,
    done: false,
    title: 'Finish project',
    category: 'Work',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptas quaerat eum provident tenetur sed minus perferendis repudiandae commodi rem.',
    createdAt: new Date(
      new Date(2020, 0, 1).getTime() +
        Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
    ),
  },
  {
    id: 1,
    pillId: 3,
    done: false,
    title: 'Read a book',
    category: 'Personal',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officia!',
    createdAt: new Date(
      new Date(2020, 0, 1).getTime() +
        Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
    ),
  },
  {
    id: 2,
    pillId: 1,
    done: false,
    title: 'Buy milk',
    category: 'Home',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequuntur, sit voluptas dolorem sapiente sunt!',
    createdAt: new Date(
      new Date(2020, 0, 1).getTime() +
        Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
    ),
  },
  {
    id: 3,
    pillId: 3,
    done: false,
    title: 'Meeting with Jane',
    category: 'Personal',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officia!',
    createdAt: new Date(
      new Date(2020, 0, 1).getTime() +
        Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
    ),
  },
  {
    id: 4,
    pillId: 2,
    done: true,
    title: 'Write a blog post',
    category: 'Work',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequuntur, sit voluptas dolorem sapiente sunt!',
    createdAt: new Date(
      new Date(2020, 0, 1).getTime() +
        Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
    ),
  },
];
