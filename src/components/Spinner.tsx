import spinner from "../assets/svg/spinner.svg";

const Spinner = () => {
  return (
    <div
      className="bg-gray-400 bg-opacity-50 flex 
    items-center justify-center fixed left-0 right-0 
    bottom-0 top-0 z-40"
    >
      <div>
        <img src={spinner} alt="Loading.." className="h-24" />
      </div>
    </div>
  );
};

export default Spinner;
