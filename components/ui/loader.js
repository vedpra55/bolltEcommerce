import { Oval } from "react-loader-spinner";

export default function LoaderSpinner({ height }) {
  return (
    <div
      className={`flex ${
        height ? `h-${height}` : "h-96"
      } justify-center items-center`}
    >
      <Oval
        height={height ? height + 5 : 80}
        width={height ? height + 5 : 80}
        color="rgb(0 0 0 / 0.7)"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="black"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}
