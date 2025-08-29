import TestComponent from "@/components/TestComponrnt";

const Page = () => {
  return (
    <div className="">
      <h1 className="text-large">TEST</h1>
      <h1
        style={{
          fontSize: "48px",
        }}
      >
        TEST2
      </h1>
      <div className="rounded-5xl border-primary max-h-[100px]"></div>
      <TestComponent />
    </div>
  );
};

export default Page;
