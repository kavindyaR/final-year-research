import FormInput from "./components/FormInput";

function App() {
  return (
    <>
      <div className="p-4">
        <FormInput
          name={"email"}
          label={"Email Address"}
          type={"email"}
          placeholder={"Type Your Email"}
        />

        <FormInput
          name={"password"}
          label={"Password"}
          type={"password"}
          placeholder={"Type Your Password"}
        />
      </div>
    </>
  );
}

export default App;
