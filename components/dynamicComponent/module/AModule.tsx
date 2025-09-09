'use client';

export interface IAModuleProps {
  data: {
    title: string;
  };
}

const AModule = ({ data }: IAModuleProps) => {
  return (
    <div>
      <h1>MODULE A {data.title}</h1>
    </div>
  );
};

export default AModule;
