import TestComponent from "@/components/TestComponrnt";
import TestSelect from "@/components/TestSelect";

const Page = () => {
  return (
    <div className="flex flex-col p-[100px]">
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
      <TestSelect />
    </div>
  );
};

export default Page;
