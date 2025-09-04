import ApiTest, { ITest } from './_component/ApiTest';

const TestPage = async () => {
  const data: ITest = await fetch('https://dummyjson.com/todos').then((res) =>
    res.json()
  );
  console.log('SSR ---', data);
  return (
    <div>
      <h1>TEST PAGE TEST PAGE</h1>
      <h2>React-Query</h2>
      <ApiTest
        item={{
          ...data,
          ...{
            total: 1000000000,
          },
        }}
      />
      <h3>TEST 333333</h3>
    </div>
  );
};

export default TestPage;
