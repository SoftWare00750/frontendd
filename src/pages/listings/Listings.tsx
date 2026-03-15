import { useEffect, useState } from "react";
import { listings } from "../../components/Constants";
import ListingCard from "../../components/ListingCard";
import SkeletonCard from "../../components/SkeletonCard";

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
      <div className="flex gap-2 mb-5 flex-wrap">

        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 text-sm rounded-full transition cursor-pointer
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