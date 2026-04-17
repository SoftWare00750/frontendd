import background from "/assets/leftsection.png";
export const LeftSection = () => {
return(

    <div className="relative min-h-screen hidden md:block">
          <img
            src={background}
            className="absolute inset-0 w-full h-full object-cover"
          />

      
        </div>
);
}