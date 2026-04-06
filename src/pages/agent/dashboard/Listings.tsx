import { useEffect, useState } from "react";
import { listings } from "../../../components/agent/Constants";
import ListingCard from "../../../components/agent/ListingCard";
import SkeletonCard from "../../../components/agent/SkeletonCard";
import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";
const filters = ["All", "Approved", "Pending", "Rented", "Removed"];

export default function Listings() {


  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredListings, setFilteredListings] = useState(listings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {

      if (activeFilter === "All") {
        setFilteredListings(listings);
      } else {
        setFilteredListings(
          listings.filter((item) => item.status === activeFilter)
        );
      }

      setLoading(false);

    }, 800);

  }, [activeFilter]);

  return (
    <div>

      {/* Filters */}
      <div className="flex gap-5 mb-5 flex-col drop-shadow-sm bg-white py-5  rounded-lg">
      <div className="px-5">
        <div className="flex justify-between">
          <h1 className="md:text-[28px] text-[18px] text-green-700 font-medium ">My Listings</h1>
          <Link to="/agent/listings" className="flex items-center gap-2 ">
            <button type="button" className="bg-green-700 text-white p-2 hover:bg-green-800 transition rounded-full cursor-pointer">
             <PlusIcon size={18}/>
            </button>
          </Link>
        </div>
        <p className="text-[16px] pt-1">4 total listings</p>
      </div>

        <div className="border-t border-gray-300 pt-3 px-5 flex gap-5 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 text-sm rounded-full transition cursor-pointer
                ${
                  activeFilter === filter
                    ? "bg-green-700 text-white"
                    : "bg-gray-100"
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>

      {/* Listings */}

      <div className="space-y-3">

        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : filteredListings.map((listing) => (
              <ListingCard key={listing.id} {...listing} />
            ))}

      </div>

    </div>
  );
}