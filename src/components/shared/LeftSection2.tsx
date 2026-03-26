
import TestimonialCarousel from "../../components/shared/TestimonialCarousel";
import background from "/assets/leftsection2.png";
export const LeftSection2 = () => {
return(

    <div className="relative min-h-screen hidden md:block">
          <img
            src={background}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Testimonial overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <TestimonialCarousel />
          </div>
        </div>
);
}