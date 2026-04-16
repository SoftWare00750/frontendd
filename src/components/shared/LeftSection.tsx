import background from "/assets/leftsection.png";
export const LeftSection = () => {
return (
  <div className="h-screen fixed w-[50%]">
    <img src={background} className=" w-full h-full object-cover" />
  </div>
);
}