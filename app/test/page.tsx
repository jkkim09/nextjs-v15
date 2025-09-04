import ApiTest from './_component/ApiTest';

const TestPage = () => {
  return (
    <div>
      <h1>TEST PAGE TEST PAGE</h1>
      <h2>React-Query</h2>
      <ApiTest
        items={[
          {
            id: 1,
            todo: 'Do something nice for someone you care about',
            completed: false,
            userId: 152,
          },
          {
            id: 2,
            todo: 'Memorize a poem',
            completed: true,
            userId: 13,
          },
          {
            id: 3,
            todo: 'Watch a classic movie',
            completed: true,
            userId: 68,
          },
        ]}
      />
      <h3>TEST 333333</h3>
    </div>
  );
};

export default TestPage;
