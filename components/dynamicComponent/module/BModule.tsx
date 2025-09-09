'use client';

export interface IBModuleProps {
  data: {
    test: number;
  };
}

const BModule = ({ data }: IBModuleProps) => {
  return (
    <div>
      <h1>MODULE B {data.test}</h1>
    </div>
  );
};

export default BModule;
